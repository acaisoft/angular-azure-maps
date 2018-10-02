/// <reference path="../../../atlas"/>

import {
  AfterViewInit,
  Component,
  ContentChild,
  ElementRef,
  EmbeddedViewRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import {AmFeature} from '../interfaces/am-feature';
import {AtlasPopupDirective} from '../directives/atlas-popup.directive';
import {LoadMapService} from '../utils/load-map.service';

@Component({
  selector: 'am-map',
  templateUrl: './atlas-map.component.html',
  styleUrls: ['./atlas-map.component.css']
})
export class AtlasMapComponent implements OnInit, AfterViewInit {
  @Input() initialConfig: any;
  @Input() _id: string;


  @Output() onMapClick = new EventEmitter<atlas.data.Position>();

  @ViewChild('popupsContainer', {read: ViewContainerRef}) popupsContainer: ViewContainerRef;
  @ViewChild('mapWrapper', {read: ElementRef}) mapWrapper: ElementRef;

  /**
   * For create and control popup
   * To Inject into ng-template in parent
   */
  @ContentChild(AtlasPopupDirective, {read: TemplateRef}) popupTemplate: TemplateRef<any>;

  public popupView: EmbeddedViewRef<any>;
  public popupAtlas: atlas.Popup;

  public map: atlas.Map;
  private customPins: Array<any> = [];
  public features: AmFeature[] = []; // Array of ours points to add on map
  private pointsArray: atlas.data.Feature[] = [];
  private cssArray: string[] = [];

  constructor(private mapService: LoadMapService) {
  }

  ngOnInit(): void {
    this.popupAtlas = new atlas.Popup();
  }

  ngAfterViewInit(): void {
    this.mapService.loadedComponenet.next(true);
    this.createMap(this._id, this.initialConfig); // Initial map
    this.startMapClickListener(); // Start emitter
  }

  public createMap(id: string, config: any): void {
    try {
      this.mapWrapper.nativeElement.setAttribute('id', id);
      this.map = new atlas.Map(id, config); // Init map box
    } catch (e) {
      console.log('CHECK YOUR CONFIG!', e);
    }
  }

  changeMapCamera(options: CameraOptions & AnimationOptions): void {
    this.map.setCamera(options);
  }

  changeMapStyle(options: StyleOptions): void {
    this.map.setStyle(options);
  }

  changeUserInteraction(options: UserInteractionOptions): void {
    this.map.setUserInteraction(options);
  }

  /**
   * Founding all unique layers from features Array
   * @param AmFeature[] features
   * @returns string[]
   */
  findUniqueLayers(features: AmFeature[]): string[] {
    const allLayers = features.map(it => it.layer);
    return Array.from(new Set(allLayers));
  }

  startMapClickListener(): void {
    this.map.addEventListener('click', (e) => {
      this.onMapClick.emit(e.position);
      // On click you emit geo position
    });
  }

  /**
   * Creating popUpContainer and injected to parent Template
   * @param context
   */
  createComponent(context: any): void {
    if (this.popupView) {
      this.popupView.destroy();
    }
    this.popupView = this.popupsContainer.createEmbeddedView(this.popupTemplate, context);
  }

  addItem(id, loc, clas): void {
    let customHTML;
    const idItem = clas + id;
    const pos = new atlas.data.Position(loc.lnt, loc.lng);
    this.cssArray.push(idItem);  // Saving existing HTML elements

    customHTML = document.createElement('div');
    customHTML.setAttribute('id', idItem);
    customHTML.setAttribute('class', clas);

    this.map.addHtml(customHTML, pos); // add to map
  }

  /**
   * Drawin point on the map as pins
   * @Incjet createPopups()
   * @param  features
   */
  createPoints(features: AmFeature[]): void {
    if (features.length === 0) {
      console.log('No data available');
      return;
    }

    for (const item of features) {
      this.map.addPins([item.atlasFeature], item.pinConfig);
      if (item.atlasFeature.properties.cssClass) {
        this.addItem(item.dataElement.id, item.dataElement.localization, item.atlasFeature.properties.cssClass);
        this.customPins.push(item.atlasFeature.properties.cssClass);
      }
      this.pointsArray.push(item.atlasFeature);
    }
    this.createPopups(features);
  }


  /**
   * Created popUps for all features by type of layers
   * Adding event on 'mouseover'
   * @param features
   */
  createPopups(features: AmFeature[]): void {
    for (const item of this.findUniqueLayers(features)) {
      if (this.popupTemplate) {
        this.map.addEventListener('mouseover', item, (e) => {
          const amFeature: AmFeature = features.find(it => it.dataElement.name === e.features[0].properties.name);
          this.createComponent({
            /**
             * sent to template variable
             * raw data from input
             */
            dataElement: amFeature.dataElement
          });
          this.popupAtlas.setPopupOptions({
            position: e.features[0].geometry.coordinates,
            content: document.getElementById(`popupWrapper`),
          });
          this.popupAtlas.open(this.map);
        });
      }
    }
  }

  updatePoints(features: AmFeature[]): void {
    this.map.removeLayers(this.findUniqueLayers(features));
    if (this.cssArray.length) {
      this.cssArray.forEach(value => {
        (document.querySelectorAll(`#${value}`) as any).forEach(it => it.remove());
        this.map.removeHtml(value);
      });
      this.cssArray = [];
    }
    this.createPoints(features);
  }

  removeMap() {
    this.map.remove();
  }
}



