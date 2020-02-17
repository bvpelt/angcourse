import { Component, OnInit } from '@angular/core';
import { Location } from '../model/location';
import { LOCATIONS } from '../mock/mock-locations';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent implements OnInit {

  selectedLocation: Location = null;

  locations = LOCATIONS;

  constructor() { }

  ngOnInit() {
  }

  onSelect(location: Location): void {
    this.selectedLocation = location;
  }

}
