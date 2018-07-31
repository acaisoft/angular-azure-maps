/// <reference path="../../../atlas"/>

import {
  AfterContentInit,
  Component,
  ContentChild, EmbeddedViewRef,
  Input,
  OnChanges,
  OnInit, SimpleChanges,
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
  @Input() features: AmFeature[];
  @Input() initialConfig: ServiceOptions & CameraOptions & StyleOptions & UserInteractionOptions;

  @ViewChild('popupsContainer', {read: ViewContainerRef}) popupsContainer: ViewContainerRef;
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
      this.map = new atlas.Map('map', this.initialConfig);
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
      console.log(e.position);
      // On click you get geoPosition from map
    });
  }

  createComponent(context: any): void {
    if (this.popupView) {
      this.popupView.destroy();
    }
    this.popupView = this.popupsContainer.createEmbeddedView(this.popupTemplate, context);
  }

  createPoints(): void {
    try {
      for (const item of this.features) {
        this.map.addPins([item.atlasFeature], item.pinConfig);
      }
      this.createPopups();
    } catch (error) {
      console.log('Please add data!', error);
    }
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



