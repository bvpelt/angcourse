# Step 09

Target: add a map

To add a map
- [add openlayers library](#Add-openlayers-library)
- [add Openlayers style](#Add-Openlayers-style)
- [generate map component](#Generate-map-component)

After all the steps described below 

## Add Openlayers library

To add the openlayers libraries you need the type definitions @types/ol and the openlayers library. This library is needed for the map component.

```bash
$ npm install @types/ol
$ npm install ol
```

## Add Openlayers style

This is the default styling for openlayers controls.
Add the file ol.css in directory assets. The content is:

```css
.ol-box {
    box-sizing: border-box;
    border-radius: 2px;
    border: 2px solid #00f
}

.ol-mouse-position {
    top: 8px;
    right: 8px;
    position: absolute
}

.ol-scale-line {
    background: rgba(0, 60, 136, .3);
    border-radius: 4px;
    bottom: 8px;
    left: 8px;
    padding: 2px;
    position: absolute
}

.ol-scale-line-inner {
    border: 1px solid #eee;
    border-top: none;
    color: #eee;
    font-size: 10px;
    text-align: center;
    margin: 1px;
    will-change: contents, width;
    transition: all .25s
}

.ol-scale-bar {
    position: absolute;
    bottom: 8px;
    left: 8px
}

.ol-scale-step-marker {
    width: 1px;
    height: 15px;
    background-color: #000;
    float: right;
    z-Index: 10
}

.ol-scale-step-text {
    position: absolute;
    bottom: -5px;
    font-size: 12px;
    z-Index: 11;
    color: #000;
    text-shadow: -2px 0 #fff, 0 2px #fff, 2px 0 #fff, 0 -2px #fff
}

.ol-scale-text {
    position: absolute;
    font-size: 14px;
    text-align: center;
    bottom: 25px;
    color: #000;
    text-shadow: -2px 0 #fff, 0 2px #fff, 2px 0 #fff, 0 -2px #fff
}

.ol-scale-singlebar {
    position: relative;
    height: 10px;
    z-Index: 9;
    border: 1px solid #000
}

.ol-unsupported {
    display: none
}

.ol-unselectable, .ol-viewport {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -webkit-tap-highlight-color: transparent
}

.ol-overlaycontainer, .ol-overlaycontainer-stopevent {
    pointer-events: none
}

.ol-overlaycontainer-stopevent>*, .ol-overlaycontainer>* {
    pointer-events: auto
}

.ol-selectable {
    -webkit-touch-callout: default;
    -webkit-user-select: text;
    -moz-user-select: text;
    -ms-user-select: text;
    user-select: text
}

.ol-grabbing {
    cursor: -webkit-grabbing;
    cursor: -moz-grabbing;
    cursor: grabbing
}

.ol-grab {
    cursor: move;
    cursor: -webkit-grab;
    cursor: -moz-grab;
    cursor: grab
}

.ol-control {
    position: absolute;
    background-color: rgba(255, 255, 255, .4);
    border-radius: 4px;
    padding: 2px
}

.ol-control:hover {
    background-color: rgba(255, 255, 255, .6)
}

.ol-zoom {
    top: .5em;
    left: .5em
}

.ol-rotate {
    top: .5em;
    right: .5em;
    transition: opacity .25s linear, visibility 0s linear
}

.ol-rotate.ol-hidden {
    opacity: 0;
    visibility: hidden;
    transition: opacity .25s linear, visibility 0s linear .25s
}

.ol-zoom-extent {
    top: 4.643em;
    left: .5em
}

.ol-full-screen {
    right: .5em;
    top: .5em
}

.ol-control button {
    display: block;
    margin: 1px;
    padding: 0;
    color: #fff;
    font-size: 1.14em;
    font-weight: 700;
    text-decoration: none;
    text-align: center;
    height: 1.375em;
    width: 1.375em;
    line-height: .4em;
    background-color: rgba(0, 60, 136, .5);
    border: none;
    border-radius: 2px
}

.ol-control button::-moz-focus-inner {
    border: none;
    padding: 0
}

.ol-control button span {
    pointer-events: none
}

.ol-zoom-extent button {
    line-height: 1.4em
}

.ol-compass {
    display: block;
    font-weight: 400;
    font-size: 1.2em;
    will-change: transform
}

.ol-touch .ol-control button {
    font-size: 1.5em
}

.ol-touch .ol-zoom-extent {
    top: 5.5em
}

.ol-control button:focus, .ol-control button:hover {
    text-decoration: none;
    background-color: rgba(0, 60, 136, .7)
}

.ol-zoom .ol-zoom-in {
    border-radius: 2px 2px 0 0
}

.ol-zoom .ol-zoom-out {
    border-radius: 0 0 2px 2px
}

.ol-attribution {
    text-align: right;
    bottom: .5em;
    right: .5em;
    max-width: calc(100% - 1.3em)
}

.ol-attribution ul {
    margin: 0;
    padding: 0 .5em;
    color: #000;
    text-shadow: 0 0 2px #fff
}

.ol-attribution li {
    display: inline;
    list-style: none
}

.ol-attribution li:not(:last-child):after {
    content: " "
}

.ol-attribution img {
    max-height: 2em;
    max-width: inherit;
    vertical-align: middle
}

.ol-attribution button, .ol-attribution ul {
    display: inline-block
}

.ol-attribution.ol-collapsed ul {
    display: none
}

.ol-attribution:not(.ol-collapsed) {
    background: rgba(255, 255, 255, .8)
}

.ol-attribution.ol-uncollapsible {
    bottom: 0;
    right: 0;
    border-radius: 4px 0 0
}

.ol-attribution.ol-uncollapsible img {
    margin-top: -.2em;
    max-height: 1.6em
}

.ol-attribution.ol-uncollapsible button {
    display: none
}

.ol-zoomslider {
    top: 4.5em;
    left: .5em;
    height: 200px
}

.ol-zoomslider button {
    position: relative;
    height: 10px
}

.ol-touch .ol-zoomslider {
    top: 5.5em
}

.ol-overviewmap {
    left: .5em;
    bottom: .5em
}

.ol-overviewmap.ol-uncollapsible {
    bottom: 0;
    left: 0;
    border-radius: 0 4px 0 0
}

.ol-overviewmap .ol-overviewmap-map, .ol-overviewmap button {
    display: inline-block
}

.ol-overviewmap .ol-overviewmap-map {
    border: 1px solid #7b98bc;
    height: 150px;
    margin: 2px;
    width: 150px
}

.ol-overviewmap:not(.ol-collapsed) button {
    bottom: 1px;
    left: 2px;
    position: absolute
}

.ol-overviewmap.ol-collapsed .ol-overviewmap-map, .ol-overviewmap.ol-uncollapsible button {
    display: none
}

.ol-overviewmap:not(.ol-collapsed) {
    background: rgba(255, 255, 255, .8)
}

.ol-overviewmap-box {
    border: 2px dotted rgba(0, 60, 136, .7)
}

.ol-overviewmap .ol-overviewmap-box:hover {
    cursor: move
}
```

## Generate map component

The map component is the component which visualizes geographic maps.
In this course we use pdok which provides public data on the map (publieke data op de kaart). This is a set of public available data.

```bash
ng generate component map
```

An Openlayer map needs to be configured with
- [one or more layers](#Layers)
- a view
- optional controls

The view and controls are defined in the [map](#Map)

### Layers

In this course you will use the following maps from pdok:
- [bgtachtergrond](#Bgtachtergrond)
- [bgtstandaard](#Bgtstandaard)
- [brtachtergrondkaart](#Brtachtergrondkaart)

Since all mapps have some common properties first we will define a [config](#Config) and a [layerutility](#LayerUtil) class to have all common code in one module.

#### Config

In the src/app map create a map config, since other configuration options also could be placed here, and a file config.ts with content:

```typescript
import Extent from 'ol/interaction/Extent';
import Point from 'ol/geom/Point';

export class Config {
    private static _instance: Config;

    private _pdokwmtsurl: string = 'https://geodata.nationaalgeoregister.nl/tiles/service/wmts?';
    private _pdokwmtsimageformat: string = 'image/png';
    private _projectionName: string = 'EPSG:28992';
    private _units: string = 'm';
    private _projectionExtent: any = [-285401.92, 22598.08, 595401.9199999999, 903401.9199999999];
    private _nlxtent: Extent = new Extent({ extent: [9632, 306708, 278200, 622130] });
    private _center: Point = new Point([156527, 456220]);

    private constructor() {
    }

    public static get instance() {
        return this._instance || (this._instance = new this());
    }

    public get pdokwmtsurl(): string {
        return this._pdokwmtsurl;
    }

    public set pdokwmtsurl(url: string) {
        this._pdokwmtsurl = url;
    }

    public get pdokwmtsimageformatmtsurl(): string {
        return this._pdokwmtsimageformat;
    }

    public set pdokwmtsimageformat(url: string) {
        this._pdokwmtsimageformat = url;
    }

    public get projectionName(): string {
        return this._projectionName;
    }

    public set projectionName(name: string) {
        this._projectionName = name;
    }

    public get units(): string {
        return this._units;
    }

    public set units(units: string) {
        this._units = units;
    }

    public get projectionExtent(): any {
        return this._projectionExtent;
    }

    public set projectionExtent(extent: any) {
        this._projectionExtent = extent;
    }

    public get nlxtent(): Extent {
        return this._nlxtent;
    }

    public set nlxtent(extent: Extent) {
        this._nlxtent = extent;
    }

    public get center(): Point {
        return this._center;
    }

    public set center(point: Point) {
        this._center = point;
    }
}
```

#### LayerUtil

Since the layerutil only has meaning for the map, create a directory layerutil in src/app/mapp and a file layerutil.ts with content:

```typescript
import Extent from 'ol/interaction/Extent';
import Point from 'ol/geom/Point';
import Projection from 'ol/proj/Projection';
import { Config } from 'src/app/config/config';

export class LayerUtil {
  private static _instance: LayerUtil = null;
  private config: Config = Config.instance;

  private _resolutions: number[] = [
    3440.64,
    1720.32,
    860.16,
    430.08,
    215.04,
    107.52,
    53.76,
    26.88,
    13.44,
    6.72,
    3.36,
    1.68,
    0.84,
    0.42,
    0.21
  ];
  private _matrixIds: string[] = new Array<string>(this._resolutions.length);
  private _rdProjection: Projection = new Projection({
    code: this.config.projectionName,
    units: this.config.units,
    extent: this.config.projectionExtent,
    getPointResolution: function (resolution) {
      return resolution;
    },
  });

  private constructor() {
    for (let z = 0; z < this._resolutions.length; ++z) {
      this._matrixIds[z] = this.config.projectionName + ':' + z;
      // console.log('LayerUtil - Generating matrixids[' + z + ']: ' + this._matrixIds[z]);
    }
  }

  public static get instance() {
    return this._instance || (this._instance = new this());
  }

  public get nlxtent(): Extent {
    return this.config.nlxtent;
  }

  public get units(): string {
    return this.config.units;
  }

  public get center(): Point {
    return this.config.center;
  }

  public get projectionName(): string {
    return this.config.projectionName;
  }

  public get rdProjection(): Projection {
    return this._rdProjection;
  }

  public get projectionExtent(): any {
    return this.config.projectionExtent;
  }

  public get resultions(): number[] {
    return this._resolutions;
  }

  public get matrixIds(): string[] {
    return this._matrixIds;
  }
}
```

#### Bgtachtergrond

The configuration of the Bgtachtergrond is created in the directory src/app/map/layerutil in a file bgtachtergrondlayer.ts with content:

```typescript
import WMTS from 'ol/source/WMTS';
import { getTopLeft } from 'ol/extent';
import WMTSTileGrid from 'ol/tilegrid/WMTS';
import { LayerUtil } from './layerutil';
import { Config } from '../../config/config';

export class BgtAchtergrondLayer {

  public static createBgtAchtergrondLayer(): WMTS {
    const config: Config = Config.instance;
    const layerUtil: LayerUtil = LayerUtil.instance;
    const layerName: string = 'bgtachtergrond';

    const bgtAchtergrondLayer: WMTS = new WMTS({
      crossOrigin: 'anonymous',
      format: config.pdokwmtsimageformatmtsurl,
      layer: layerName,
      matrixSet: layerUtil.projectionName, // EPSG:28992
      projection: layerUtil.projectionName,
      style: 'default',
      tileGrid: new WMTSTileGrid({
        origin: getTopLeft(layerUtil.projectionExtent),
        resolutions: layerUtil.resultions,
        matrixIds: layerUtil.matrixIds,
      }),
      url: config.pdokwmtsurl,
      wrapX: true
    });

    return bgtAchtergrondLayer;
  }
}
```

#### Bgtstandaard

The configuration of the Bgtstandaard is created in the directory src/app/map/layerutil in a file bgtstandaardlayer.ts with content:

```typescript
import WMTS from 'ol/source/WMTS';
import { getTopLeft } from 'ol/extent';
import WMTSTileGrid from 'ol/tilegrid/WMTS';
import { LayerUtil } from './layerutil';
import { Config } from '../../config/config';

export class BgtStandaardLayer {

    public static createBgtStandaardLayer(): WMTS {
        const config: Config = Config.instance;
        const layerUtil: LayerUtil = LayerUtil.instance;
        const layerName: string = 'bgtstandaard';

        const bgtStandaardLayer: WMTS = new WMTS({
            crossOrigin: 'anonymous',
            format: config.pdokwmtsimageformatmtsurl,
            layer: layerName,
            matrixSet: layerUtil.projectionName,
            projection: layerUtil.projectionName,
            style: 'default',
            tileGrid: new WMTSTileGrid({
                origin: getTopLeft(layerUtil.projectionExtent),
                resolutions: layerUtil.resultions,
                matrixIds: layerUtil.matrixIds,
            }),
            url: config.pdokwmtsurl,
            wrapX: true,
        });

        console.log('BgtStandaardLayer - layer: ' + bgtStandaardLayer.toString());

        return bgtStandaardLayer;
    }
}
```
#### Brtachtergrondkaart

The configuration of the Bgtstandaard is created in the directory src/app/map/layerutil in a file bgtstandaardlayer.ts with content:

```typescript
import WMTS from 'ol/source/WMTS';
import { getTopLeft } from 'ol/extent';
import WMTSTileGrid from 'ol/tilegrid/WMTS';
import { LayerUtil } from './layerutil';
import { Config } from '../../config/config';

export class BrtAchtergrondLayer {

  public static createBrtAchtergrondLayer(): WMTS {
    const config: Config = Config.instance;
    const layerUtil: LayerUtil = LayerUtil.instance;
    const layerName: string = 'brtachtergrondkaart';

    const brtAchtergrondLayer: WMTS = new WMTS({
      crossOrigin: 'anonymous',
      format: config.pdokwmtsimageformatmtsurl,
      layer: layerName,
      matrixSet: layerUtil.projectionName,
      projection: layerUtil.projectionName,
      style: 'default',
      tileGrid: new WMTSTileGrid({
        origin: getTopLeft(layerUtil.projectionExtent),
        resolutions: layerUtil.resultions,
        matrixIds: layerUtil.matrixIds,
      }),
      url: config.pdokwmtsurl,
      wrapX: true
    });

    return brtAchtergrondLayer;
  }
}
```

### Map

To visualise the map we need to
- [Make an implementation for the map component](#Implementation-Map-Component)
- [Update the main application screen](#Update-main-screen)

#### Implementation Map Component

The map is defined in directory src/app/map in file map.component.ts with content:

```typescript
import { Component, AfterViewInit } from '@angular/core';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import { createStringXY } from 'ol/coordinate';
import { defaults as defaultControls } from 'ol/control';
import MousePosition from 'ol/control/MousePosition';
import { LayerUtil } from './layerutil/layerutil';
import { BrtAchtergrondLayer } from './layerutil/brtachtergrondlayer';
import { BgtAchtergrondLayer } from './layerutil/bgtachtergrondlayer';
import { BgtStandaardLayer } from './layerutil/bgtstandaardlayer';
import Point from 'ol/geom/Point';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {

  public map: Map;
  private layerUtil: LayerUtil = LayerUtil.instance;
  private location: Point = this.layerUtil.center;

  constructor() {
  }

  ngAfterViewInit() {
    const mousePositionControl: MousePosition = this.createMouseTracker();

    this.map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          opacity: 1.0,
          source: BrtAchtergrondLayer.createBrtAchtergrondLayer(),
          zIndex: 0,
          visible: true,
          maxResolution: 3400,
          minResolution: 1.68
        }),
        new TileLayer({
          opacity: 1.0,
          source: BgtAchtergrondLayer.createBgtAchtergrondLayer(),
          zIndex: 1,
          visible: true,
          maxResolution: 1.67,
          minResolution: 0.42
        }),
        new TileLayer({
          opacity: 1.0,
          source: BgtStandaardLayer.createBgtStandaardLayer(),
          zIndex: 2,
          visible: true,
          maxResolution: 0.41,
          minResolution: 0.05
        }),
      ],
      view: new View({
        projection: this.layerUtil.rdProjection,
        center: this.layerUtil.center.getCoordinates(),
        zoom: 11,
        minResolution: 0.05,
        maxResolution: 2000
      }),
      controls: defaultControls().extend([
        mousePositionControl
      ])
    });

    this.map.getView().setMaxZoom(14);
    this.map.getView().setMinZoom(2);

  }

  private createMouseTracker(): MousePosition {
    var mousePosition: MousePosition = new MousePosition({
      coordinateFormat: createStringXY(3), // 3 digits      
      projection: this.layerUtil.projectionName, // 'EPSG:28992',
      // comment the following two lines to have the mouse position
      // be placed within the map.
      className: 'custom-mouse-position',
      target: document.getElementById('mouse-position'),
      undefinedHTML: '&nbsp;'
    });
    return mousePosition;
  }

}
```

In file map.component.html with content:

```html
<div id="map" class="map"></div>
<div id="mouse-position"></div>
<div id="info"></div>
```

In file map.component.css with content:

```css
.map {
    width: 100%;
    height: 97vh;
}

.mouse-position {
    display: inline-block;
}

.info {
    display: inline-block;
}
```

#### Update main screen

To update the main screen change in directory src/app the file app.component.html so it contains:

```html
<div class="content">
    <div class="splitleft regels">
        <app-locations>
        </app-locations>
    </div>
    <div class="splitright kaart">
        <app-map></app-map>
    </div>
</div>
```

Also change app.component.css so it contains:

```css
/* Split the screen in half */

.splitleft {
  height: 100%;
  width: 20%;
  position: fixed;
  z-index: 1;
  top: 0;
  overflow-x: hidden;
}

.splitright {
  height: 100%;
  width: 80%;
  position: fixed;
  z-index: 1;
  top: 0;
  overflow-x: hidden;
}

/* Control the left side */

.regels {
  left: 8px;
}

/* Control the right side */

.kaart {
  right: 0;
}
```