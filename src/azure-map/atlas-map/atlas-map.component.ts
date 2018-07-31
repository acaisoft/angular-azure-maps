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
  @Input() _id: string = 'maaapp'

  @Output() onMapClick = new EventEmitter<atlas.data.Position>();

  @ViewChild('popupsContainer', {read: ViewContainerRef}) popupsContainer: ViewContainerRef;
  @ViewChild('mapWrapper', {read: ElementRef}) mapWrapper: ElementRef;
  @ContentChild(AtlasPopupDirective, {read: TemplateRef}) popupTemplate: TemplateRef<any>;

  private popupView: EmbeddedViewRef<any>;
  private popupAtlas: atlas.Popup = new atlas.Popup();

  public map: atlas.Map;

  constructor() {
  }

  ngOnInit(): void {
    this.createMap();
  }

  ngAfterContentInit(): void {


    this.createPoints(); // Create points on map
    this.findLocation(); // Click log position
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.features.firstChange === false) {
      this.updatePoints(changes);
    }
  }

  createMap(): void {
    try {
      this.mapWrapper.nativeElement.setAttribute('id', this._id)
      // const element = document.getElementById('map');
      // element.setAttribute('id', this._id);
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

  findLocation(): void {
    this.map.addEventListener('click', (e) => {
      this.onMapClick.emit(e.position);
      // On click you emit positon
    });
  }

  createComponent(context: any): void {
    if (this.popupView) {
      this.popupView.destroy();
    }
    this.popupView = this.popupsContainer.createEmbeddedView(this.popupTemplate, context);
  }

  createPoints(): void {
    if (this.features.length === 0) {
      console.log('No data available');
      return;
    }

    for (const item of this.features) {
      this.map.addPins([item.atlasFeature], item.pinConfig);
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
      this.createPoints();
    }
  }


}



