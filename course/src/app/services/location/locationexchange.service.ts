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
