/// <reference path="../../../atlas"/>

import {
  AfterContentInit,
  Component,
  ContentChild, EmbeddedViewRef, EventEmitter,
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
  @Input() features: AmFeature[];
  @Input() initialConfig: ServiceOptions & CameraOptions & StyleOptions & UserInteractionOptions;
  @Input() _id: string;
  @Input() addMode: boolean;

  @Output() adress = new EventEmitter<any>();
  @Output() position = new EventEmitter<atlas.data.Position>();

  @ViewChild('popupsContainer', {read: ViewContainerRef}) popupsContainer: ViewContainerRef;
  @ContentChild(AtlasPopupDirective, {read: TemplateRef}) popupTemplate: TemplateRef<any>;

  private popupView: EmbeddedViewRef<any>;
  private popupAtlas: atlas.Popup = new atlas.Popup();

  private map: atlas.Map;

  // TO EDIT MODE
  private msg: string;
  private address: any;
  private newPos: atlas.data.Position = null;

  // TO CHANGES
  private lineArray: string[] = [];
  private coordsArray: any[] = [];
  private actualLines: string[] = [];
  private end = false;
  private endPointAnimate = false;
  private stop = false;


  private mapCanvas;


  constructor() {
  }

  ngOnInit(): void {
    const element = document.getElementById('map');
    element.setAttribute('id', this._id); // For multiple map

    this.createMap();
  }

  ngAfterContentInit(): void {
    this.createPoints(); // Create points on map
    this.findLocation(); // Click log position
    this.changeCursor(this.findUniqueLayers()[0]); // Change curson when on point
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.features.firstChange === false) {
      this.updatePoints(changes);
    }
  }

  createMap(): void {
    try {
      this.map = new atlas.Map('map', this.initialConfig);
      this.mapCanvas = this.map.getCanvas();
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
    if (this.addMode) {
      // Adding new point on map
      this.map.addEventListener('click', (e) => {
        console.log(e.position);
        const xhttp = new XMLHttpRequest();
        let url = 'https://atlas.microsoft.com/search/address/reverse/json?';
        url += '&api-version=1.0';
        url += '&query=' + e.position[1] + ',' + e.position[0];
        url += '&subscription-key=' + this.initialConfig['subscription-key'];
        xhttp.open('GET', url, true);
        xhttp.send();

        xhttp.onreadystatechange = () => {
          if (xhttp.readyState === 4 && xhttp.status === 200) {
            const response = JSON.parse(xhttp.responseText);
            if (response.addresses.length !== 0) {
              console.log(response.addresses[0]);
              this.address = response.addresses[0].address;
              const coords = e;
              this.newPos = this.splitToCoords(coords);
              this.addNewPoint();

            } else {
              this.msg = 'No address for that location! Try again';
              console.log('No address for that location!');
            }
          }
        };

      });
    } else {
      this.map.addEventListener('click', (e) => {
        console.log(e.position);
        // On click you get geoPosition from map
      });
    }
  }

  addNewPoint(): void {
    if (this.newPos !== null) {
      const point = new atlas.data.Point(this.newPos);

      const feature = new atlas.data.Feature(point, {
        title: this.address.freeformAddress,
        icon: 'pin-round-blue',
        overwrite: true
      });

      this.map.addPins([feature], {
        name: 'newPin',
        textOffset: [0, 25],
        textFont: 'StandardFont-Bold',
        overwrite: true
      });

      this.msg = 'Succes! For confirm click button!';
    } else {
      this.msg = 'Please first select point!';
      console.log('SELECT POINT!');
    }

  }

  confirmPoint(): void {
    this.adress.emit(this.address.freeformAddress);
    this.position.emit(this.newPos);
  }

  splitToCoords(e): atlas.data.Position {
    return new atlas.data.Position(e.position[0], e.position[1]);
  }

  changeCursor(value): void {
    this.map.addEventListener('mouseleave', value, (e) => {
      this.map.getCanvas().style.cursor = '';
    });
    this.map.addEventListener('mouseover', value, (e) => {
      this.map.getCanvas().style.cursor = 'pointer';
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

  layersAndPointsRemover(): void {

    console.log('lineLayer:', this.lineArray);
    if (this.lineArray !== []) {
      this.map.removeLayers(this.lineArray);
    }
    console.log('lineLayer:', this.actualLines);
    if (this.actualLines !== []) {
      this.map.removeLayers(this.actualLines);
    }
    this.lineArray.splice(0, this.lineArray.length);
    this.coordsArray.splice(0, this.coordsArray.length);
    this.stop = true;
  }


}



