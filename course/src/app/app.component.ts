import { Component } from '@angular/core';
import Point from 'ol/geom/Point';
import { LocationexchangeService } from './services/location/locationexchange.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'webapp';
  private currentLocation: Point;

  constructor() { }

}
