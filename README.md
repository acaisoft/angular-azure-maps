# Angular Azure Maps
Angular 6 Azure Maps is a wrapped MS Azure Map on Angular

#### [Samples]
## Getting Started
```node 
npm i @acaisoft/angular-azure-maps --save
```

Add to module:
```ts
@NgModule({
  imports: [AmModule],
  providers: [LoadMapService]
```


[AzureMapDocumentation]<br>
First add this two line to your index.html:
```html
  <link rel="stylesheet" href="https://atlas.microsoft.com/sdk/css/atlas.min.css?api-version=1" type="text/css" />
  <script src="https://atlas.microsoft.com/sdk/js/atlas.min.js?api-version=1"></script>
````
Or use our lazy loading
#### Lazy loading
```ts
// in component:
  key: string = '<YOUR-KEY>'
  
  constructor(public mapService: LoadMapService) {}

  ngOnInit() {
    // that will lazy loaded azure map script and styles
    this.mapService.load().toPromise().then(() => {
      atlas.setSubscriptionKey(this.key); // that inject your azure key
    })
  }
```
<br>

To have control on map you must use <br>
```
@ViewChild('maper') maper: AtlasMapComponent;
```

This `mapService` own `isLoaded` properties so you can simple use it to know when map was loaded in template
```html
<div *ngIf="mapService.isLoaded">
  <am-map #maper
    [_id]="'id'"
    [initialConfig]="config"
  </am-map>
 </div>
```
[_id] - its id to DOMElements, !necessary! <br>
[initialConfig] - initial config to map

[Map Init].
<br>
Your config should look like:
```ts
public config = {
    'zoom': 1.5,
    'center': [20,20]
    'interactive': true,
  };
```
Other config options: [Style Options] | [User Interaction Options] | [Service Options] | [Camera Options]
<br>

Outputs:
```html
 <am-map #maper 
 (onMapClick)="getPos($event)" // Output emiting position
 (loaded)="loadedMap()"
 >
```
(onMapClick) - its emitting position on click <br>
(loaded) - emitting when AmComponent is loaded, after its you can for example add data:
```ts
mapLoaded() {
    // Check if ViewChild is correctly init
    if (this.maper && this.mapService.isLoaded) {
      // use that function to load sprites to map
      this.maper.map.events.add('load', (e) => {
        Promise.all([
          // Add sprite to map as icon
          this.maper.map.imageSprite.add('my-pin', '../../../assets/eye-crossed.svg'),
          this.maper.map.imageSprite.add('git', '../../../assets/github-small.svg')
        ]).then((e) => {
          this.isFirst = false;
          this.initPoint();
        })
      })
    } else {
      setTimeout(() => this.mapLoaded(), 400)
    }

  }
```




*Add points to map*
`this.maper.createPoints(features: AmFeatures)`
<br>
*Refresh points*
`this.maper.updatePoints(features: AmFeatures)`
<br>
*Remove Map*
`this.maper.removeMap() or this.maper.map.remove() <br>

Your data element should by AmFeatures type:

```ts
interface AmFeature {
  dataElement: any; // Data element
  atlasFeature: atlas.data.Feature; // Map's features object
  layer: string; // Layer for different object
  pinConfig: PinLayerOptions;
}
```
<br>


In your parent component you must create your data.
<br>
First create your map feature - [Feature]
Example for simple Point:
```ts
  dataPointsInit(data): atlas.data.Feature {
    const pos = new atlas.data.Position(data.localization.lnt, data.localization.lng);
    const point = new atlas.data.Point(pos);
    const feature = new atlas.data.Feature(point, {
      name: data.name,
      icon: 'none',
      type: data.type,
      title: data.name,
      cssClass: cssName //if you want custom pins !!Remeber to set icon: 'nope',
    });
    return feature;
  }
```

<br>


Example for PinLaterOptions:
```ts
  dataLayerOptions(item): PinLayerOptions {
    const pinOptions: PinLayerOptions = {
      name: item,
      cluster: false, // true if you want join points
      clusterIcon: 'pin-round-blue',
      textFont: 'SegoeUi-Bold',
      textOffset: [0, 17],
    };
    return pinOptions;
  }
```
<br>

And merge it do AmFeature type:
```ts
mergeDataPoint(data) {
    return {
      dataElement: data,
      atlasFeature: this.dataPointsInit(data),
      layer: data.type
      pinConfig: this.dataLayerOptions(data.type)
    }as AmFeature;
  }
```

## Components
Our AtlasMapComponent will create your map canvas, and add your Map Elements to map through added pins on it.<br>
Also can added PopUps on pins through atlas-popup directive and ng-template in your parent component html file:
```html
<div class="container"  *ngIf="mapService.isLoaded">
  <am-map #maper
          [initialConfig]="config"
          [_id]="'id'"
          (onMapClick)="getPos($event)"
  (loaded)="mapLoaded()">


    <ng-template amPopup
                 let-dataElement="dataElement">
      <div [ngSwitch]="dataElement.type">
        <div *ngSwitchCase="'DataCenter'" class="dc_container">
          <div class="name">{{ dataElement.name}}</div>
          <div class="status" [ngStyle]="{'color':dataElement.status === 'Online' ? 'blue' : 'red'}"> {{ dataElement.status }}</div>
        </div>
        <div *ngSwitchCase="'Office'" class="office_container">
          <div class="name">{{ dataElement.name}}</div>
        </div></div>
    </ng-template>

  </am-map>
</div>
```



[Map Init]: https://docs.microsoft.com/pl-pl/javascript/api/azure-maps-javascript/map?view=azure-iot-typescript-latest
[Feature]: https://docs.microsoft.com/pl-pl/javascript/api/azure-maps-javascript/feature?view=azure-iot-typescript-latest
[AzureMapDocumentation]: https://docs.microsoft.com/pl-pl/javascript/api/azure-maps-javascript/?view=azure-iot-typescript-latest
[Options]: https://docs.microsoft.com/pl-pl/javascript/api/azure-maps-javascript/azure-maps-javascript.object%20definitions?view=azure-iot-typescript-latest
[Style Options]: https://docs.microsoft.com/pl-pl/javascript/api/azure-maps-javascript/styleoptions?view=azure-iot-typescript-latest
[User Interaction Options]: https://docs.microsoft.com/pl-pl/javascript/api/azure-maps-javascript/userinteractionoptions?view=azure-iot-typescript-latest
[Service Options]: https://docs.microsoft.com/pl-pl/javascript/api/azure-maps-javascript/serviceoptions?view=azure-iot-typescript-latest
[Camera Options]: https://docs.microsoft.com/pl-pl/javascript/api/azure-maps-javascript/cameraoptions?view=azure-iot-typescript-latest
[Samples]: https://github.com/srednicki95/am_samples/tree/master/src/app/dashboard
