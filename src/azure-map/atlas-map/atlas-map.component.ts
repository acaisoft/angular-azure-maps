/// <reference path="../../../atlas"/>

import {
  AfterContentInit,
  Component,
  ContentChild, ElementRef, EmbeddedViewRef, EventEmitter,
  Input,
  OnChanges,
  OnInit, Output, SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import {AmFeature} from '../interfaces/am-feature';
import {AtlasPopupDirective} from '../directives/atlas-popup.directive';

@Component({
  selector: 'am-map',
  templateUrl: './atlas-map.component.html',
  styleUrls: ['./atlas-map.component.css']
})
export class AtlasMapComponent implements OnInit, AfterContentInit, OnChanges {
  @Input() features: AmFeature[] = [];
  @Input() initialConfig: any;
  @Input() _id: string;

  @Output() onMapClick = new EventEmitter<atlas.data.Position>();

  @ViewChild('popupsContainer', {read: ViewContainerRef}) popupsContainer: ViewContainerRef;
  @ViewChild('mapWrapper', {read: ElementRef}) mapWrapper: ElementRef;
  @ContentChild(AtlasPopupDirective, {read: TemplateRef}) popupTemplate: TemplateRef<any>;

  private popupView: EmbeddedViewRef<any>;
  private popupAtlas: atlas.Popup = new atlas.Popup();

  public map: atlas.Map;

  private customPins: Array<any> = [];

  constructor() {
  }

  ngOnInit(): void {
    this.createMap();
  }

  ngAfterContentInit(): void {
    this.createPoints(); // Create points on map
    this.startMapClickListener(); // Click log position
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.features.firstChange === false) {
      this.updatePoints(changes);
    }
  }

  createMap(): void {
    try {
      this.mapWrapper.nativeElement.setAttribute('id', this._id);
      this.map = new atlas.Map(this._id, this.initialConfig);
    } catch (e) {
      console.log('ADD YOUR CONFIG!', e);
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

  findUniqueLayers(): string[] {
    // Founding all unique layers from your data
    const allLayers = this.features.map(it => it.layer);
    return Array.from(new Set(allLayers));
  }

  startMapClickListener(): void {
    this.map.addEventListener('click', (e) => {
      this.onMapClick.emit(e.position);
      // On click you emit geo position
    });
  }

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

    customHTML = document.createElement('div');
    customHTML.setAttribute('id', idItem);
    customHTML.setAttribute('class', clas);

    this.map.addHtml(customHTML, pos);
  }

  createPoints(): void {
    if (this.features.length === 0) {
      console.log('No data available');
      return;
    }

    for (const item of this.features) {
      this.map.addPins([item.atlasFeature], item.pinConfig);
      if (item.atlasFeature.properties.cssClass) {
        this.addItem(item.atlasFeature.properties.name, item.dataElement.localization, item.atlasFeature.properties.cssClass);
        this.customPins.push(item.atlasFeature.properties.cssClass);
      }
    }
    this.createPopups();
  }

  createPopups(): void {
    for (const item of this.findUniqueLayers()) {

      if (this.popupTemplate) {
        this.map.addEventListener('mouseover', item, (e) => {
          const amFeature = this.features.find(it => it.dataElement.name === e.features[0].properties.name);

          this.createComponent({
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

  updatePoints(changes: SimpleChanges): void {
    if (changes.features.currentValue !== changes.features.previousValue) {

      this.map.removeLayers(this.findUniqueLayers());

      if (this.customPins) {
        for (const item of changes.features.previousValue) {
          for (const cst of this.customPins) {

            const name = cst + item.atlasFeature.properties.name;
            if (document.getElementById(name)) {
              document.getElementById(name).remove();
            }
          }
        }
      }
      this.createPoints();
    }
  }


}



