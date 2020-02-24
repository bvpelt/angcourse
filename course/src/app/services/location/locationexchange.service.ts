import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import Point from 'ol/geom/Point';
import { toStringXY } from 'ol/coordinate';
import { LayerUtil } from '../../map/layerutil/layerutil';

@Injectable({
  providedIn: 'root'
})
export class LocationexchangeService {

  private coordinate = [166546.5, 446639.31]; //[5.55537293, 52.00800145];
  //private defaultPoint: Point = new Point(this.coordinate);
  private defaultPoint: Point = LayerUtil.instance.center;

  private location = new BehaviorSubject(this.defaultPoint);
  currentLocation = this.location.asObservable();

  constructor() { }

  changeLocation(point: Point) {
    console.log('LocationExchange - point: ' + toStringXY(point.getCoordinates(), 6));
    this.location.next(point);
  }
}
