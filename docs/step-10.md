# Step-10

Target: connect the searchbox with the map. When searched for an adres and selected the adres, show it on the map.

To make the connection the following changes are needed:
- [pass selected coordiantes](#pass_coordinates)
- [for selected adres find coordinates](#find_coordinates)
- [update map](#Update_map)

## Pass coordinates

To pass the coordinates from one sibling to another we us a service, the locationexchange service. To generate the location exchange service

```bash
ng generate service services/location/locationexchange
```

The files are created in src/app/services/location. Change locationexchangeservice.ts so it contains

```typescript
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import Point from 'ol/geom/Point';
import { toStringXY } from 'ol/coordinate';
import { LayerUtil } from '../../map/layerutil/layerutil';
import { Config } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class LocationexchangeService {

  private config: Config = Config.instance;
  private defaultPoint: Point = this.config.center;

  private location = new BehaviorSubject(this.defaultPoint);
  currentLocation = this.location.asObservable();

  constructor() { }

  changeLocation(point: Point) {
    this.location.next(point);
  }
}
```

## Find coordinates

Change the location.component.ts in src/app/locations to find use the selected adres and find for that adres the location. In order to do so we need:
- change locations component

In src/app/locations change the following files
- locations.component.ts
- locations.component.html

The content of locations.component.ts is:

```typescript
import { Component, OnInit } from '@angular/core';
import { PdoklocService } from '../services/pdok/pdokloc.service';
import { SuggestResponse } from '../model/suggestresponse';
import { Adres } from '../model/adres';
import { LocationexchangeService } from '../services/location/locationexchange.service';
import Point from 'ol/geom/Point';


@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent implements OnInit {

  private maxRows = 10;  // Default value
  private _adresses: string[];
  private _textadresses: string[];
  private _selectedAdres: string;
  private _searchAdres: string;
  private _ids: string[];
  private _selectedId: string;

  constructor(private pdokservice: PdoklocService,
    private locationExchange: LocationexchangeService) {
    pdokservice.setMaxRows(this.maxRows);
  }

  ngOnInit() {
    this._selectedAdres = '';
  }

  onSelect(location: string, i: number): void {
    this._selectedAdres = this._textadresses[i]; // location;
    this._adresses = null;
    this._searchAdres = '';
    this._selectedId = this._ids[i];

    this.pdokservice.getLookup(this._selectedId)
      .subscribe(lookup => {        
        const result: SuggestResponse = lookup.response;        
        if (result.numFound === 1) {
          const adres: Adres = result.docs[0] as Adres;          
          if (adres.centroide_rd != null) {
            const NUMERIC_REGEXP = /[-]{0,1}[\d]*[.]{0,1}[\d]+/g;
            const coords: string[] = adres.centroide_rd.match(NUMERIC_REGEXP);
            if (coords != null) {
              var rd_x: number = parseFloat(coords[0]);
              var rd_y: number = parseFloat(coords[1]);
              const coord: any = [rd_x, rd_y];
              const opt: any = 'XY';
              const point: Point = new Point(coord, opt)
              this.moveToPoint(point);
            }
          }
        }
      })
  }

  moveToPoint(point: Point) {
    this.locationExchange.changeLocation(point);
  }

  public onKeyup(value: string) {
    if (!value || (value.length < 1)) {
      this._selectedAdres = '';
      this._adresses = null;
    } else {
      this.pdokservice.getSuggest(value)
        .subscribe(suggestResponse => {
          let response: string[] = Object.keys(suggestResponse.highlighting);
          let len = response.length;
          let suggestions: string[] = Array<string>(this.maxRows);
          let screenadresses: string[] = Array<string>(this.maxRows);
          let ids: string[] = Array<string>(this.maxRows);
          for (let i = 0; i < len; i++) {
            suggestions[i] = suggestResponse.highlighting[response[i]].suggest;
            screenadresses[i] = suggestResponse.response.docs[i].weergavenaam;
            ids[i] = response[i];            
          }
          this._adresses = suggestions;
          this._textadresses = screenadresses;
          this._ids = ids;
        });
    }
  }

  public get selectedAdres(): string {
    return this._selectedAdres
  }

  public set selectedAdres(selectedadres: string) {
    this._selectedAdres = selectedadres;
  }

  public get searchAdres(): string {
    return this._searchAdres;
  }

  public set searchAdres(adres: string) {
    this._searchAdres = adres;
  }

  public get adresses(): string[] {
    return this._adresses;
  }

  public set adresses(adresses: string[]) {
    this._adresses = adresses;
  }
}
```

The content of locations.component.html is:

```html
<div class="content">
    <div *ngIf="selectedAdres">
        <div class="adres">selected adres: </div>{{selectedAdres}}
    </div>
    <fieldset>
        <label for="fselectadres">adres</label>
        <input id="fselectadres" [(ngModel)]="searchAdres" placeholder="search adres"
            (keyup)="onKeyup($event.target.value);" />
    </fieldset>
    <div *ngIf="adresses">
        <ul class="location">
            <li *ngFor="let adres of adresses; index as i" (click)="onSelect(adres,i)"
                [class.selected]="adres === selectedAdres">
                <div [innerHTML]="adres"></div>
            </li>
        </ul>
    </div>
</div>
```

## Update map

The map component in src/app/map has to be updated to use the location service. At the same time we add controls to zoom to the extent of the map and to use the map fullscreen and add anoather layer to show pictures.

### Adding the airial pictures

To add a layer for airial pictures in directory src/app/map/layerutil add file luchtfotolayer.ts with contents

```typescript
import WMTS from 'ol/source/WMTS';
import { getTopLeft } from 'ol/extent';
import WMTSTileGrid from 'ol/tilegrid/WMTS';
import { LayerUtil } from './layerutil';
import { Config } from '../../config/config';

export class LuchtFotoLayer {

  public static createLuchtFotoLayer(): WMTS {
    const config: Config = Config.instance;
    const layerUtil: LayerUtil = LayerUtil.instance;
    const layerName: string = 'Actueel_ortho25';

    const luchtFotoLayer: WMTS = new WMTS({
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
      url: config.pdokwmtsluchtfoto,
      wrapX: true
    });

    return luchtFotoLayer;
  }
}
```

### Update map component

To update the map component in directory src/app/map change the content of map.component.ts with contents

```typescript
import { Component, AfterViewInit } from '@angular/core';
import { Map, View } from 'ol';
import sync from 'ol-hashed';
import Feature from 'ol/Feature';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import ZoomToExtent from 'ol/control/ZoomToExtent';
import { createStringXY, toStringXY } from 'ol/coordinate';
import { defaults as defaultControls, FullScreen } from 'ol/control';
import MousePosition from 'ol/control/MousePosition';
import { defaults as defaultInteractions, DragPan, DragRotateAndZoom, MouseWheelZoom, DragZoom, Interaction } from 'ol/interaction';
import { LayerUtil } from './layerutil/layerutil';
import { BrtAchtergrondLayer } from './layerutil/brtachtergrondlayer';
import { BgtAchtergrondLayer } from './layerutil/bgtachtergrondlayer';
import { BgtStandaardLayer } from './layerutil/bgtstandaardlayer';
import { LuchtFotoLayer } from './layerutil/luchtfotolayer';
import { LocationexchangeService } from '../services/location/locationexchange.service';
import Point from 'ol/geom/Point';
import { Icon, Style } from 'ol/style';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {

  public map: Map;
  private layerUtil: LayerUtil = LayerUtil.instance;
  private location: Point = this.layerUtil.center;
  private iconLayer: VectorLayer = null;

  constructor(private locationExchange: LocationexchangeService) {
  }

  ngAfterViewInit() {
    const mousePositionControl: MousePosition = this.createMouseTracker();

    this.map = new Map({
      target: 'map',
      interactions: defaultInteractions({
        altShiftDragRotate: true,
        onFocusOnly: false,
        doubleClickZoom: true,
        keyboard: true,
        mouseWheelZoom: true,
        shiftDragZoom: true,
        dragPan: true,
        pinchRotate: true,
        pinchZoom: true,
        zoomDelta: 1,
        zoomDuration: 10
      }).extend([
        new DragRotateAndZoom(),
        new DragPan(),
        new MouseWheelZoom(),
        new DragZoom()
      ]),
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
          minResolution: 0.22
        }),
        new TileLayer({
          opacity: 1.0,
          source: BgtStandaardLayer.createBgtStandaardLayer(),
          zIndex: 2,
          visible: false,
          maxResolution: 0.21,
          minResolution: 0.05
        }),
        new TileLayer({
          opacity: 1.0,
          source: LuchtFotoLayer.createLuchtFotoLayer(),
          zIndex: 2,
          visible: true,
          maxResolution: 0.21,
          minResolution: 0.05
        })
      ],
      view: new View({
        projection: this.layerUtil.rdProjection,
        center: this.layerUtil.center.getCoordinates(),
        zoom: 11,
        minResolution: 0.05,
        maxResolution: 2000
      }),
      controls: defaultControls().extend([
        new ZoomToExtent({
          extent: this.layerUtil.nlxtent.getExtentInternal()
        }),
        new FullScreen(),
        mousePositionControl
      ])
    });

    this.map.getView().setMaxZoom(14);
    this.map.getView().setMinZoom(2);

    this.locationExchange.currentLocation.subscribe(point => {
      this.moveTo(point);
    });

    sync(this.map);
  }

  private moveTo(point: Point, duration: number = 2000, zoomLevel: number = 11) {
    var view: View = this.map.getView();
    view.animate(
      { zoom: zoomLevel },
      {
        center: point.getCoordinates(),
        duration: duration
      });

    this.setIcon(point);
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

  private removeIcon() {
    if (this.iconLayer) {
      this.map.removeLayer(this.iconLayer);
    }
  }

  private setIcon(point: Point) {
    this.removeIcon();

    const iconFeature = new Feature({
      geometry: point,
    });

    const iconStyle = new Style({
      image: new Icon(
        {
          anchor: [0.5, 1.0],
          scale: 1.0,
          src: 'assets/icon.png'
        }
      ),
    });

    iconFeature.setStyle(iconStyle);

    const vectorSource = new VectorSource({
      features: [iconFeature],
    });

    this.iconLayer = new VectorLayer({
      source: vectorSource,
      zIndex: 99999
    });

    this.map.addLayer(this.iconLayer);
  }

}
```