export interface AmFeature {
  dataElement: any; // Data element, your raw data
  atlasFeature: atlas.data.Feature; // Items to inject into map
  layer: string; // Layer for different object for separate object
  pinConfig: PinLayerOptions;
  extras?: any;
}
