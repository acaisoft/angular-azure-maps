import Geometry = atlas.data.Geometry;
import BoundingBox = atlas.data.BoundingBox;

declare namespace atlas {
  import Feature = atlas.data.Feature;
  import Point = atlas.data.Point;
  import LineString = atlas.data.LineString;
  import Polygon = atlas.data.Polygon;
  import MultiPolygon = atlas.data.MultiPolygon;

  function getLanguage();

  function getSessionId();

  function getSubscriptionKey();

  function getUserRegion();

  function getVersion();

  function isSupported(e);

  function setLanguage(e);

  function setSessionId(e);

  function setSubscriptionKey(e: string);

  function setUserRegion(e);

  function _hasSetSubscriptionKey();

  function _hasSetSessionId();

  function _hasSetLanguage();

  function _hasSetUserRegion();

  class Map {
    htmlElements: any;
    accessibleMapDelegate: any;
    events: any;
    imageSprite: any;
    markers: any;
    sources: any;
    layers: any;

    constructor(container: string,
                options: ServiceOptions & CameraOptions & StyleOptions & UserInteractionOptions)

    addCircles(e, t);

    addContror(e, t);

    clear();

    dispote();

    pixelsToPositions(e);

    positionsToPixels(e);

    stop();


    addPins(pins: Feature[],
            options?: PinLayerOptions);


    addEventListener(type: string, layer: string, callback: any);
    addEventListener(type: string, callback: any);

    addLinestrings(line: Array<Feature>,
                   options?: LinestringLayerOptions);


    addIcon(id: string, icon: HTMLImageElement);

    addHtml(element: HTMLElement, position: atlas.data.Position);

    addPolygons(polygons: Array<any>, options?: PolygonLayerOptions)

    addRaster(tileSources: string[], options?: RasterLayerOptions);

    getCamera(); // Returns the camera's current properties.

    getCanvas(); // Returns the HTMLCanvasElement that the map is drawn to.

    getCanvasContainer();

    getLayers(); // Returns a list of the map's layers from bottom to top.

    getMapContainer(); // Returns the HTMLElement that contains the map.

    getServiceOptions(); // Returns the service options with which the map control was initialized.

    getStyle(); // Returns the map control's current style settings.

    getTraffic(); // Return the map control's current traffic settings.

    getUserInteraction() // Return the map control's current user interaction handler settings.

    remove(); // Clean up the map's resources. Map will not function correctly after calling this method.

    removeHtml(elementId: string); // Removes a custom HTMLElement from the map.

    removeEventListener(type: string, callback: any); // Remove an event listener from the map.

    removeEventListener(type: string, layer: string, callback: any); // Remove an event listener from a layer of the map.

    removeLayers(layerNames: string[]); // Removes a collection of layers from the map.

    resize(); // Resize the map according to the dimensions of its container element.

    setCamera(options?: CameraOptions & AnimationOptions);

    setCameraBounds(options?: CameraBoundsOptions) // Set the camera bounds of the map control.

    setStyle(options?: StyleOptions);

    setTraffic(options?: TrafficOptions) // Set the traffic options for the map. Any options not specified will default to their current values.


    setUserInteraction(options?: UserInteractionOptions);
  }

  class HtmlMarker {

    constructor(e?, f?)
    getOptions();

    setOptions(t);

    togglePopup();

    _addToMapt(e);

    _getId();

    _removeFromMap();
  }

  class Shape {

    constructor(t?, o?, r?);
    addProperty(e, t);

    getBounds();

    getCoordinates();

    getId();

    getProperties();

    getType();

    isCircle();

    setCoordinates(e);

    setProperties(t);

    toJson();

    _getCoordinateDimensions(e);

    _handleCircle();

    _setDataSource(e);

    _testCircle(e);

    _toJson();
  }

  class Popup {
    options?: PopupOptions;

    constructor(options?: PopupOptions)

    attach(map: Map);

    close();

    getOptions(): PopupOptions;

    isOpen(): Boolean;

    open(map: Map);

    remove();

    setPopupOptions(options?: PopupOptions);
  }

  namespace math {
    function boundingBoxToPolygon(t);

    function convertDistance(t, e, a, n);

    function getCardinalSpline(t, e, a, n);

    function getDestination(t, e, a, n);

    function getDistanceTo(t, e, a);

    function getEarthRadius(t);

    function getGeodesicPath(t, e);

    function getHeading(t, e);

    function getLengthOfPath(t, e);

    function getPositionAlongPath(t, e, a);

    function getRegularPolygonPath(t, e, a, n, s);

    function interpolate(t, e, a);

    function normalizeLatitude(t);

    function normalizeLongitude(t);
  }

  namespace source {
    type t = any;
    type o = any;
    type e = any;

    class DataSource {
      constructor(t?, o?);

      add(e, t?);

      clear();

      constructor(t, o);

      dispose();

      getOptions();

      getShapeById(e);

      remove(e);

      setOptions(e);

      toJson();

      _addNoUpdate(e, t);

      _addToSources(e, t);

      _buildSource();

      _clearNoUpdate();

      _removeFromSources(e);

      _toJson();

      _updateShapesMap(e);

      _updateSource();
    }

    class Source {
      constructor(e?)
    }

    class VectorTileSource {
      constructor(e?, o?);
    }
  }

  namespace layer {

    type e = any;
    type t = any;
    type i = any;
    type o = any;
    type n = any;


    class BubbleLayer {
      constructor(e, o, i)
    }

    class Layer {
      constructor(t);
    }

    class LineLayer {
      constructor(i, o, e);
    }

    class PolygonLayer {
      constructor(t, i, e);
    }

    class SymbolLayer {
      constructor(o, i, n);
    }

    class TileLayer {
      constructor(i, o);
    }

  }

  namespace data {
    class Point {
      coordinates: Position;

      constructor(coordinates: Position);
    }

    class Position {
      longitude: number;
      latitude: number;
      elevation?: number;

      constructor(longitude: number, latitude: number, elevation?: number)
    }

    class LineString {
      coordinates: Position[];
      bbox: BoundingBox;

      constructor(coordinates: Position[], bbox?: BoundingBox)
    }

    class MultiLineString {
      coordinates: Position[][];
      bbox?: BoundingBox;

      constructor(coordinates: Position[][], bbox?: BoundingBox);
    }


    type G = any;
    type P = any;

    class Feature {
      Point: G;
      properties?: P;
      id?: string;
      geometry: any;

      constructor(Point: G, properties?: P, id?: string)
    }

    class BoundingBox {  // An array that defines a shape whose edges follow lines of constant longitude,
      // latitude, and elevation. Array should contain 4 elements. [minLon, minLat, maxLon, maxLat]
      southwestPosition: Position;
      northeastPosition: Position;

      constructor(southwestPosition: Position, northeastPosition: Position);
    }

    class Polygon {
      coordinates: Position[][];
      bbox: BoundingBox;

      constructor(coordinates: Position[][], bbox?: BoundingBox)
    }

    class MultiPolygon {
      coordinates: Position[][][];
      bbox: BoundingBox;

      constructor(coordinates: Position[][][], bbox?: BoundingBox)
    }

    class MultiPoint {
      coordinates: Position[];
      bbox: BoundingBox;

      constructor(coordinates: Position[], bbox?: BoundingBox)
    }

    class Geometry {
      type: 'Point' | 'LineString' | 'MultiPoint' | 'Polygon' | 'MultiLineString' | 'MultiPolygon' | 'GeometryCollection' | string;
      TYPE: string;
    }
  }
}

declare interface ServiceOptions {
  'disable-telemetry'?: boolean; // default: false
  'session-id'?: string; // default: UUID.generate()
  'subscription-key': string; // default: undefined
}


declare interface CameraOptions {
  bearing?: number; // default: 0
  center?: atlas.data.Position; // default: new Position(0,0)
  maxZoom?: number; // default: 20
  minZoom?: number; // default: 1
  pitch?: number; // default: 0
  zoom?: number;  // default: 1
}

declare interface StyleOptions {
  language?: string;  // default: "NGT"
  style?: 'vector';  // default: 'vector'
  view?: 'Unified';  // default: 'Unified'
}

declare interface UserInteractionOptions {
  dblClickZoomInteraction?: boolean; // default: true
  dragPanInteraction?: boolean; // default: true
  dragRotateInteraction?: boolean; // default: true
  interactive?: boolean; // default: true
  keyboardInteraction?: boolean; // default: true
  scrollZoomInteraction?: boolean; // default: true
  touchInteraction?: boolean; // default: true
}

declare interface AnimationOptions {
  duration?: number; // 1000;
  type?: string; // "jump" | "ease" | "fly" = "jump"
}

declare interface PinProperties {
  icon?: 'pin-darkblue' | 'pin-blue' | 'pin-red' | 'pin-round-darkblue' | 'pin-round-blue' | 'pin-round-red' | 'none' | string;
  title?: string;
}

declare interface LayerOptions {
  before?: string; // default: undefined
  defer?: boolean; // default: false
  maxZoom?: number; // default: 20
  minZoom?: number; // default: 1
  name?: string; // default: undefined
  opacity?: number; // default: 1
  overwrite?: boolean; // default: false
}

declare interface LinestringLayerOptions {
  cap?: string; // default: "butt" | "round" | "square" = "butt"
  color?: string;
  join?: string; // "bevel" | "round" | "miter" = "miter"
  name?: string; // default: undefined
  width?: number; // default: 1
  overwrite?: boolean;
}

declare interface PinLayerOptions extends LayerOptions {
  cluster?: boolean; // default: true
  clusterIcon?: string; // default: undefined
  fontColor?: string; // default: '#000'
  fontSize?: number; // default: 14
  icon?: string; // 'pin-darkblue' | 'pin-blue' | 'pin-red'| 'pin-round-darkblue' | 'pin-round-blue' |// 'pin-round-red'| 'none'; default: 'pin-darkblue'
  iconSize?: number; // default: 1
  name?: string; // default: 'default-pins'
  textFont?: string; // 'SegoeUi-Bold' | 'SegoeUi-Regular' | 'StandardFont-Bold' | 'StandardFont-Regular'; default: 'SegoeUi-Regular'
  textOffset?: number[]; // default: [0,0]
  title?: string; // default: ''
}


declare interface PopupOptions {
  content?: HTMLElement; // default: document.createElement("span");
  pixelOffset?: number[]; // default: [0, 0]
  position?: atlas.data.Position; // default: new Position(0, 0)
}

declare interface PolygonProperties {
  color?: string; // The fill color of the polygons for the layer. Is used as the default if a fill color is not specified for a polygon.
  outlineColor?: string; // The outline color of the polygons for the layer. Is used as the default if an outline color is not specified for a polygon.
}

declare interface PolygonLayerOptions {
  color?: string; // The fill color of the polygons for the layer. Is used as the default if a fill color is not specified for a polygon.
  name?: string;
  outlineColor?: string; // The outline color of the polygons for the layer. Is used as the default if an outline color is not specified for a polygon.
}

declare interface RasterLayerOptions {
  name?: string;
}

declare interface CameraBoundsOptions {
  bounds?: BoundingBox; // The bounds of the map control's camera.
  padding?: number | number[]; // Padding in pixels for the given bounds. Either specify a number for the padding of all sides of the map or specify each side as an array of [top, right, bottom, left].
}

declare interface TrafficOptions {
  flow?: 'none' | 'relative' | 'absolute' | 'relative-delay'; // The type of traffic flow to display
  incidents?: boolean; // Whether to display incidents on the map.
}

