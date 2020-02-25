# Step 07

To use PDOK location server there are two services
- suggest, to search for possible matches
- lookup, to find details based on a pdok-id 

In this part you will only use the suggest service, although some code for the lookup service is also introduced.

Background documentation (in dutch) [https://github.com/PDOK/locatieserver/wiki/API-Locatieserver](https://github.com/PDOK/locatieserver/wiki/API-Locatieserver)

In order to be able to use the api we need to examen the input/output parameters of the api
and determine our usecases. For this demonstration we will only use the service to look for
an adres. Other options are also possible see the [API-Locatieserver](https://github.com/PDOK/locatieserver/wiki/API-Locatieserver).

Examples of input/output is shown in:
- [Example suggest query](#example-suggest-query)
- [Example lookup query](#example-lookup-query)

To setup the software to use a service we need to
- [define a service](#define-a-service)
- [define a datastructure to receive the answer](#define-data-structure)

## Define a service
For a service to work we need
- [The http client module](#Add-the-http-client-module)
- [To define the service](#Define-a-service)

### Add the http client module
In src/app/app.module.ts we add the http client module so the content of the file is:
```typescript
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LocationsComponent } from './locations/locations.component';

@NgModule({
  declarations: [
    AppComponent,
    LocationsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```
### Define a service

To define the pdok location service you need to
- [generate the service](#Generate-the-service)
- [add an implementation to the service](#Add-an-implementation-to-the-service)

#### Generate the service
To generate the service type at the command line:

```bash
$ ng generate service services/pdok/pdokloc
```
#### Add an implementation to the service

This offers the possibility:
- to specify the maximum number of rows to retrieve
- to get suggestions from the location service

You also need to define the datastructures
- Suggest, the result of the suggest api call
- Adres, the result of the lookup api call ([see step 08](#../step-08.md#step-08))

To use the service add the following code to src/app/services/pdok/pdokloc.service.ts

```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Suggest } from '../../model/suggest';
import { Adres } from '../../model/adres';

@Injectable({
  providedIn: 'root'
})
export class PdoklocService {

  private pdokLocUrl = 'https://geodata.nationaalgeoregister.nl/locatieserver/v3';  // URL to web api
  private maxRows: number = 10;

  constructor(private http: HttpClient) {
  }

  public getMaxRows(): number {
    return this.maxRows;
  }

  public setMaxRows(maxRows: number): void {
    this.maxRows = maxRows;
  }

  public getSuggest(location: string): Observable<Suggest> {
    const url = this.pdokLocUrl + '/suggest?wt=json&indent=true&rows=' + this.maxRows + '&q=' + location + ' and type:adres';
    return this.http.get<Suggest>(url).pipe(
      catchError(this.handleError<Suggest>('getSuggest', null))
    );
    ;
  }

  public getLookup(id: string): Observable<Adres> {
    const url = this.pdokLocUrl + '/lookup?id=' + id;
    return this.http.get<Adres>(url).pipe(
      catchError(this.handleError<Adres>('getLookup', null))
    );
    ;
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      //this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
```

The following datastructures will be added to src/app/model
- Adres in adres.ts
- Suggest in suggest.ts
- SuggestResponse in suggestresponse.ts

The old locations.ts can be removed as well as the src/app/mock directory with all its files.

These datastructures are derived from: 
- [Example suggest query](#Example-suggest-query)
- [Example lookup query](#Example-lookup-query)

The content of adres.ts is

```typescript
export class Adres {
    public bron: string;
    public woonplaatscode: string;
    public type: string;                /* "adres",*/
    public woonplaatsnaam: string;
    public wijkcode: string;
    public huis_nlt: string;
    public openbareruimtetype: string;
    public buurtnaam: string;
    public gemeentecode: string;
    public rdf_seealso: string;
    public weergavenaam: string;
    public straatnaam_verkort: string;
    public id: string;
    public gekoppeld_perceel: string[];
    public gemeentenaam: string;
    public buurtcode: string;
    public wijknaam: string;
    public identificatie: string;
    public openbareruimte_id: string;
    public waterschapsnaam: string;
    public provinciecode: string;
    public postcode: string;
    public provincienaam: string;
    public centroide_ll: string;
    public nummeraanduiding_id: string;
    public waterschapscode: string;
    public adresseerbaarobject_id: string;
    public huisnummer: number;
    public provincieafkorting: string;
    public centroide_rd: string;
    public straatnaam: string;
}
```

The content of suggest.ts is

```typescript
import { SuggestResponse } from './suggestresponse';

export class Suggest {
    public response: SuggestResponse;
    public highlighting: any;
    public spellcheck: any;
}
```

The content of suggestresponse.ts is

```typescript
import { Adres } from './adres';

export class SuggestResponse {
    public numFound: number;
    public start: number;
    public maxScore: number;
    public docs: Adres[];
}
```

To use the code you need the inject the PdoklocService in the locations component so you can program the interaction between the client and the server. This requires refactoring of some files in src/app/locations.

The locations.component.ts is responsible for:
- showing the maximum defined number of result when using the PdoklocService to search for the given adres
- when selecting an adres, show which adres is selected

The content of locations.component.ts is

```typescript
import { Component, OnInit } from '@angular/core';
import { PdoklocService } from '../services/pdok/pdokloc.service';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent implements OnInit {

  private maxRows = 10;  // Default value
  private _adresses: string[];
  private _selectedAdres: string;
  private _searchAdres: string;

  constructor(private pdokservice: PdoklocService) {
    pdokservice.setMaxRows(this.maxRows);
  }

  ngOnInit() {
    this._selectedAdres = '';
  }

  onSelect(location: string): void {
    this._selectedAdres = location;
    this._adresses = null;
    this._searchAdres = '';
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
          let suggestions: string[] = Array(this.maxRows);
          for (let i = 0; i < len; i++) {
            suggestions[i] = suggestResponse.highlighting[response[i]].suggest;
            console.log('suggestion: ' + suggestions[i]);
          }
          this._adresses = suggestions;
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

The locations.component.html is used for the interaction with the service by eventhandlers:
- onKeyUp
- onSelect

The contents of locations.component.html is

```typescript
<div class="content">
    <div>
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

To visualise the html the locations.component.css contains

```css
.content {
    margin: 8px 8px 0 8px;
}

.adres {
    min-width: 6em;
    padding: 8px 8px 0 0;
    display: inline-block;
}

label {
    min-width: 6em;
    padding: 8px 8px 0 0;
    display: inline-block;
}

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
```

## Define data structure
We need to define a structure to receive the results of the api query and we will be using the highlighting part from the [suggest query](#example-suggest-query).


## Example suggest query

query: [https://geodata.nationaalgeoregister.nl/locatieserver/v3/suggest?q="Spanjaardsgoed" and type:adres](https://geodata.nationaalgeoregister.nl/locatieserver/v3/suggest?q="Spanjaardsgoed"%20and%20type:adres)

This query gives:
- possible matches
- the number of matches found
- the id of a match which can be used in the lookup service
- an highlighted suggestion string in html

response:
```json
{
    response: {
        numFound: 6,
        start: 0,
        maxScore: 14.348922,
        docs: [
            {
                type: "adres",
                weergavenaam: "Spanjaardsgoed 1, 3901HC Veenendaal",
                id: "adr-dca8583d276d04e7d5c016de03f47588",
                score: 14.348922
            },
            {
                type: "adres",
                weergavenaam: "Spanjaardsgoed 2, 3901HC Veenendaal",
                id: "adr-49635aa83581bf5c26a70eccdeca8d61",
                score: 14.348922
            },
            {
                type: "adres",
                weergavenaam: "Spanjaardsgoed 3, 3901HC Veenendaal",
                id: "adr-d1e96ff634e9bdd70e7a6c7ae29a9924",
                score: 14.348922
            },
            {
                type: "adres",
                weergavenaam: "Spanjaardsgoed 5A, 3901HC Veenendaal",
                id: "adr-6b59eaacfdbf91e30d4486f3c10e6062",
                score: 14.348922
            },
            {
                type: "adres",
                weergavenaam: "Spanjaardsgoed 7, 3901HC Veenendaal",
                id: "adr-f2dce9cd8c69465860598ac4971c76c7",
                score: 14.348922
            },
            {
                type: "adres",
                weergavenaam: "Spanjaardsgoed 14, 3901HC Veenendaal",
                id: "adr-41d032d58936e89a75ada87c9cb440a7",
                score: 14.348922
            }
        ]
    },
    highlighting: {
        adr-dca8583d276d04e7d5c016de03f47588: {
            suggest: [
                "<b>Spanjaardsgoed</b> 1, 3901HC Veenendaal"
            ]
        },
        adr-49635aa83581bf5c26a70eccdeca8d61: {
            suggest: [
                "<b>Spanjaardsgoed</b> 2, 3901HC Veenendaal"
            ]
        },
        adr-d1e96ff634e9bdd70e7a6c7ae29a9924: {
            suggest: [
                "<b>Spanjaardsgoed</b> 3, 3901HC Veenendaal"
            ]
        },
        adr-6b59eaacfdbf91e30d4486f3c10e6062: {
            suggest: [
                "<b>Spanjaardsgoed</b> 5A, 3901HC Veenendaal"
            ]
        },
        adr-f2dce9cd8c69465860598ac4971c76c7: {
            suggest: [
                "<b>Spanjaardsgoed</b> 7, 3901HC Veenendaal"
            ]
        },
        adr-41d032d58936e89a75ada87c9cb440a7: {
            suggest: [
                "<b>Spanjaardsgoed</b> 14, 3901HC Veenendaal"
            ]
        }
    },
    spellcheck: {
       suggestions: [],
        collations: []
    }
}
```

## Example lookup query

query: https://geodata.nationaalgeoregister.nl/locatieserver/v3/lookup?id=adr-d1e96ff634e9bdd70e7a6c7ae29a9924

This query gives:
- the requested object
- the type of object
- the location of the centerpoint of the object

response:
```json
{
    response: {
        numFound: 1,
        start: 0,
        maxScore: 15.732318,
        docs: [
            {
                bron: "BAG",
                woonplaatscode: "2048",
                type: "adres",
                woonplaatsnaam: "Veenendaal",
                wijkcode: "WK034502",
                huis_nlt: "3",
                openbareruimtetype: "Weg",
                buurtnaam: "Engelenburg",
                gemeentecode: "0345",
                rdf_seealso: "http://bag.basisregistraties.overheid.nl/bag/id/nummeraanduiding/0345200002037361",
                weergavenaam: "Spanjaardsgoed 3, 3901HC Veenendaal",
                straatnaam_verkort: "Spanjaardsgoed",
                id: "adr-d1e96ff634e9bdd70e7a6c7ae29a9924",
                gekoppeld_perceel: [
                    "VND00-C-4223"
                ],
                gemeentenaam: "Veenendaal",
                buurtcode: "BU03450200",
                wijknaam: "Wijk 02 Zuidoost",
                identificatie: "0345010002037362-0345200002037361",
                openbareruimte_id: "0345300001989453",
                waterschapsnaam: "Vallei & Veluwe",
                provinciecode: "PV26",
                postcode: "3901HC",
                provincienaam: "Utrecht",
                centroide_ll: "POINT(5.55488748 52.02009336)",
                nummeraanduiding_id: "0345200002037361",
                waterschapscode: "08",
                adresseerbaarobject_id: "0345010002037362",
                huisnummer: 3,
                provincieafkorting: "UT",
                centroide_rd: "POINT(166510.06 447984.55)",
                straatnaam: "Spanjaardsgoed"
            }
        ]
    }
}
```