declare namespace atlas {
  import Feature = atlas.data.Feature;
  import Point = atlas.data.Point;
  import LineString = atlas.data.LineString;

  class Map {
    constructor(container: string,
                options: AmConfig)

    addPins(pins: Feature[],
            options?: PinLayerOptions);


    addEventListener(type: string, layer: string, callback: any);
    addEventListener(type: string, callback: any);


    addLinestrings(line: LineString[],
                   options?: LinestringLayerOptions);

    addIcon(id: string, icon: HTMLImageElement);

    addHtml(element: HTMLElement, position: atlas.data.Position);

    getCanvas();

    getCanvasContainer();


    removeLayers(layerNames: string[]);

    setCamera(options?: CameraOptions & AnimationOptions);

    setStyle(options?: StyleOptions);

    setUserInteraction(options?: UserInteractionOptions);
  }

  class Popup {
    options?: PopupOptions;

    constructor(options?: PopupOptions)

    open(map: Map);

    setPopupOptions(options?: PopupOptions);


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
      coordinates: Position[]
      bbox: any;

      constructor(coordinates: Position[], bbox?: any)
    }


    type G = any;
    type P = any;

    class Feature {
      Point: G;
      properties?: P;
      id?: string;

      constructor(Point: G, properties?: P, id?: string)
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
