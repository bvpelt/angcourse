# Step 04

Target: Edit a location
- [Edit a location](#edit-a-location)
    - [Update locations component](#update-locations-component)
    - [Update app module](#update-app-module)

## Edit a location
### Update locations component
Change the content of src/app/locations/locations.component.html to:
```html
<div class="content">
    <div>
        <div style="display: table-row;">
            <div style="display: table-cell;">id</div>
            <div style="display: table-cell;">{{location.id}}</div>
        </div>
        <div style="display: table-row;">
            <div style="display: table-cell;">street</div>
            <div style="display: table-cell;">{{location.street}}</div>
        </div>
        <div style="display: table-row;">
            <div style="display: table-cell;">housenumber</div>
            <div style="display: table-cell;">{{location.housenumber}}</div>
        </div>
        <div style="display: table-row;">
            <div style="display: table-cell;">postalcode</div>
            <div style="display: table-cell;">{{location.postalcode}}</div>
        </div>
        <div style="display: table-row;">
            <div style="display: table-cell;">city</div>
            <div style="display: table-cell;">{{location.city}}</div>
        </div>
    </div>
    <hr>
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
</div>
```

and add styling to src/app/locations/locations.component.css to:

```css
.content {
    margin: 8px 0 0 8px;
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


### Update app module
In order to restore the working application change app.module.ts to:

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LocationsComponent } from './locations/locations.component';

@NgModule({
  declarations: [
    AppComponent,
    LocationsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```
