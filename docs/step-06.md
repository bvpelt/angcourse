# Step 06

Target: make it possible to select item from list
- [Select element from list](#select-element-from-list)

## Select element from list
- [Refactor src/app/locations/locations.component.ts](#change-locations.component.ts)
- [Refactor src/app/locations/locations.component.html](#change-locations.component.html)
- [Refactor src/app/locations/locations.component.css](#change-locations.component.css)

### Change locations.component.ts
```typescript
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
```

### Change locations.component.html
```html
<div class="content">
    
    <div *ngIf="selectedLocation">
        <fieldset>
            <label for="fid" >id</label>
            <input id="fid" [(ngModel)]="selectedLocation.id" placeholder="id" disabled /><br>
            <label for="fstreet">street</label>
            <input id="fstreet" [(ngModel)]="selectedLocation.street" placeholder="street" /><br>
            <label for="fhousenumber">housenumber</label>
            <input id="fhousenumber" [(ngModel)]="selectedLocation.housenumber" placeholder="housenumber" /><br>
            <label for="fpostalcode"> postalcode</label>
            <input id="fpostalcode" [(ngModel)]="selectedLocation.postalcode" placeholder="postalcode" /><br>
            <label for="fcity">city</label>
            <input id="fcity" [(ngModel)]="selectedLocation.city" placeholder="city" /><br>
        </fieldset>
    </div>

    <hr *ngIf="selectedLocation">

    <div class="header id">id</div>
    <div class="header street">street</div>
    <div class="header housenumber">housenumber</div>
    <div class="header postalcode">postalcode</div>
    <div class="header city">city</div>

    <ul class="location">
        <li *ngFor="let location of locations" [class.selected]="location === selectedLocation" (click)="onSelect(location)">
            <span class="id">{{location.id}}</span>
            <span class="street">{{location.street}}</span>
            <span class="housenumber">{{location.housenumber}}</span>
            <span class="postalcode">{{location.postalcode}}</span>
            <span class="city">{{location.city}}</span>
        </li>
    </ul>

</div>
```

## Change locations.component.css
```css
.location {
    margin: 0 0 2em 0;
    list-style-type: none;
    padding: 0;       
}

.location li {
    cursor: pointer;
    position: relative;
    left: 0;
    background-color: #EEE;
    margin: .5em;
    border-radius: 4px;
}

.location li:hover {
    color: rgb(0, 0, 0);
    background-color: rgb(230, 179, 179);
    left: .1em;
}

.location li.selected {
    color: rgb(0, 0, 0);
    background-color: rgb(138, 140, 219);
}

.content {
    margin: 8px 8px 0 8px;
}

.header {
    font-weight: bold;
}

.id {
    width: 2em;
    display: inline-block;
}

.street {
    width: 10em;
    display: inline-block;
}

.housenumber {
    width: 6em;
    display: inline-block;
}

.postalcode {
    width: 6em;
    display: inline-block;
}

.city {
    width: 20em;
    display: inline-block;
}

label {
    min-width: 6em;
    padding: 8px 8px 0 0;
    display: inline-block;
}

fieldset input {
    width: 20em;
    padding: 8px 8px 0 0;
}

input {
    width: 20em;
    padding: 8px 8px 0 0;
}
```