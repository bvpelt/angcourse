import { Component, OnInit } from '@angular/core';
import { Location } from '../model/location';
import { LOCATIONS } from '../mock/mock-locations';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent implements OnInit {

  location: Location = {
    id: 1,
    street: 'Kubus veenendaal',
    housenumber: 2,
    postalcode: '3904 AB',
    city: 'Veenendaal'
  };

  locations = LOCATIONS;

  constructor() { }

  ngOnInit() {
  }

}
