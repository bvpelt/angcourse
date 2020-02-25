# Step 05

Target: Make it possible to use a list of locations
- [Generate mock data](#generate-mock-data)
- [Display locations](#display-locations)

## Generate mock data
In order to show a list of location there should be a number of locations.
To create a number of locations we use mock data which will be replaced later.

- Create directory src/app/mock
- In src/app/mock create mock-locations.ts
- Add the following code in mock-locations.ts

```typescript
import { Location } from '../model/location';

export const LOCATIONS: Location[] = [
    { id: 11, street: 'Kerkewijk', housenumber: 12, postalcode: '3933AB', city: 'Veenendaal' },
    { id: 12, street: 'Valleistraat', housenumber: 1, postalcode: '3932AX', city: 'Veenendaal' },
    { id: 13, street: 'Everlaan', housenumber: 2, postalcode: '3943BC', city: 'Veenendaal' },
    { id: 14, street: 'Eekhoornlaan', housenumber: 23, postalcode: '3953ZY', city: 'Veenendaal' },
    { id: 15, street: 'Aletta Jacobslaan', housenumber: 17, postalcode: '3923VX', city: 'Veenendaal' },
    { id: 16, street: 'Middellaan', housenumber: 2, postalcode: '3913CD', city: 'Veenendaal' },
    { id: 17, street: 'Boslaan', housenumber: 34, postalcode: '3913RK', city: 'Veenendaal' },
    { id: 18, street: 'Lavendel', housenumber: 43, postalcode: '3932PW', city: 'Veenendaal' },
    { id: 19, street: 'Larikslaan', housenumber: 27, postalcode: '3935LE', city: 'Veenendaal' },
    { id: 20, street: 'Dennenlaan', housenumber: 25, postalcode: '3936KP', city: 'Veenendaal' }
];
```

## Display locations

- Import the locations in the src/app/locations/locations.component.ts
- Assign the imported LOCATIONS to a local variable

The content of locations.component.ts is
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
```

In directory src/app/locations/ change locations.component.css and locations.component.html to show the locations.

location.component.css
```css
.content {
    margin: 8px 8px 0 8px;
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

input {
    width: 20em;
    padding: 8px  8px 0 0;
}
```

location.component.html
```html
<div class="content">
    
    <div>
        <fieldset>
            <label for="fstreet">street</label>
            <input id="fstreet" [(ngModel)]="location.street" placeholder="street" /><br>
            <label for="fhousenumber">housenumber</label>
            <input id="fhousenumber" [(ngModel)]="location.housenumber" placeholder="housenumber" /><br>
            <label for="fpostalcode"> postalcode</label>
            <input id="fpostalcode" [(ngModel)]="location.postalcode" placeholder="postalcode" /><br>
            <label for="fcity">city</label>
            <input id="fcity" [(ngModel)]="location.city" placeholder="city" /><br>
        </fieldset>
    </div>

    <hr>

    <div class="id">id</div>
    <div class="street">street</div>
    <div class="housenumber">housenumber</div>
    <div class="postalcode">postalcode</div>
    <div class="city">city</div>

    <ul>
        <li *ngFor="let location of locations">
            <span class="id">{{location.id}}</span>
            <span class="street">{{location.street}}</span>
            <span class="housenumber">{{location.housenumber}}</span>
            <span class="postalcode">{{location.postalcode}}</span>
            <span class="city">{{location.city}}</span>
        </li>
    </ul>

</div>
```
