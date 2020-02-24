import { Component, OnInit } from '@angular/core';
import { PdoklocService } from '../services/pdok/pdokloc.service';
import { SuggestResponse } from '../model/suggestresponse';
import { Adres } from '../model/adres';
import { LocationexchangeService } from '../services/location/locationexchange.service';
import Point from 'ol/geom/Point';


@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent implements OnInit {

  private maxRows = 10;  // Default value
  private _adresses: string[];
  private _textadresses: string[];
  private _selectedAdres: string;
  private _searchAdres: string;
  private _ids: string[];
  private _selectedId: string;

  constructor(private pdokservice: PdoklocService,
    private locationExchange: LocationexchangeService) {
    pdokservice.setMaxRows(this.maxRows);
  }

  ngOnInit() {
    this._selectedAdres = '';
  }

  onSelect(location: string, i: number): void {
    this._selectedAdres = this._textadresses[i]; // location;
    this._adresses = null;
    this._searchAdres = '';
    this._selectedId = this._ids[i];

    this.pdokservice.getLookup(this._selectedId)
      .subscribe(lookup => {
        console.log('Received: ' + lookup);
        const result: SuggestResponse = lookup.response;
        console.log('Received response: ' + result);
        if (result.numFound === 1) {
          const adres: Adres = result.docs[0] as Adres;
          console.log('Received adres: ' + adres.adresseerbaarobject_id + ' ' + adres.bron + ' ' + adres.centroide_rd);
          if (adres.centroide_rd != null) {
            const NUMERIC_REGEXP = /[-]{0,1}[\d]*[.]{0,1}[\d]+/g;
            const coords: string[] = adres.centroide_rd.match(NUMERIC_REGEXP);
            if (coords != null) {
              console.log('coords: ' + coords);
              var rd_x: number = parseFloat(coords[0]);
              var rd_y: number = parseFloat(coords[1]);
              console.log('x: ' + rd_x + ' y: ' + rd_y);
              const coord: any = [rd_x, rd_y];
              const opt: any = 'XY';
              const point: Point = new Point(coord, opt)
              this.moveToPoint(point);
            }
          }
        }
      })
  }

  moveToPoint(point: Point) {
    console.log('move to: ' + point.getCoordinates);
    this.locationExchange.changeLocation(point);
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
          let suggestions: string[] = Array<string>(this.maxRows);
          let screenadresses: string[] = Array<string>(this.maxRows);
          let ids: string[] = Array<string>(this.maxRows);
          for (let i = 0; i < len; i++) {
            suggestions[i] = suggestResponse.highlighting[response[i]].suggest;
            screenadresses[i] = suggestResponse.response.docs[i].weergavenaam;
            ids[i] = response[i];
            console.log('suggestion: ' + suggestions[i] + ' screenadres: ' + screenadresses[i] + ' id: ' + ids[i]);
          }
          this._adresses = suggestions;
          this._textadresses = screenadresses;
          this._ids = ids;
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
