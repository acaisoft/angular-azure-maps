# Angular Azure Maps
Angular Azure Maps is a wrapped MS Azure Map on Angular

## How to use
[AzureMapDocumentation]<br>
First add this two line to your index.html:
```html
  <link rel="stylesheet" href="https://atlas.microsoft.com/sdk/css/atlas.min.css?api-version=1.0" type="text/css" />
  <script src="https://atlas.microsoft.com/sdk/js/atlas.min.js?api-version=1.0"></script>
````
To wrap this module you can add in your template:
```html
<am-map
  [initialConfig]="config"
  [features]="amFeatures">
  </am-map>
```
First input is your config to create map. Look 
[Map Init].
<br>
Second is your data with map's items that you can add on map

Your config should look like:

```ts
public config: AmConfig = {
    'subscription-key': 'your-key',
    'interactive': true,
  };
```
Other config options: [Style Options] | [User Interaction Options] | [Service Options] | [Camera Options]
<br>

Your data element should by AmFeatures type:

```ts
interface AmFeature {
  dataElement: any; // Data element
  atlasFeature: atlas.data.Feature; // Map's features object
  layer: string; // Layer for different object
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
      icon: 'pin-blue',
      type: data.type,
      title: data.name
    });
    return feature;
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
    }as AmFeature;
  }
```


## Components
Our AtlasMapComponent will create your map canvas, and add your Map Elements to map through added pins on it.<br>
Also can added PopUps on pins through atlas-popup directive and ng-template in your parent component html file:
```html
<am-map>
<ng-template amPopup
             let-dataElement="dataElement">
  <!--Item you want to show in popup-->
</ng-template>
</am-map>
```



[Map Init]: https://docs.microsoft.com/pl-pl/javascript/api/azure-maps-javascript/map?view=azure-iot-typescript-latest
[Feature]: https://docs.microsoft.com/pl-pl/javascript/api/azure-maps-javascript/feature?view=azure-iot-typescript-latest
[AzureMapDocumentation]: https://docs.microsoft.com/pl-pl/javascript/api/azure-maps-javascript/?view=azure-iot-typescript-latest
[Options]: https://docs.microsoft.com/pl-pl/javascript/api/azure-maps-javascript/azure-maps-javascript.object%20definitions?view=azure-iot-typescript-latest
[Style Options]: https://docs.microsoft.com/pl-pl/javascript/api/azure-maps-javascript/styleoptions?view=azure-iot-typescript-latest
[User Interaction Options]: https://docs.microsoft.com/pl-pl/javascript/api/azure-maps-javascript/userinteractionoptions?view=azure-iot-typescript-latest
[Service Options]: https://docs.microsoft.com/pl-pl/javascript/api/azure-maps-javascript/serviceoptions?view=azure-iot-typescript-latest
[Camera Options]: https://docs.microsoft.com/pl-pl/javascript/api/azure-maps-javascript/cameraoptions?view=azure-iot-typescript-latest
