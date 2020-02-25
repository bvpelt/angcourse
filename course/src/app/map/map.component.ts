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
