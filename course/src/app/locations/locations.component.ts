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
  private _textadresses: string[];
  private _selectedAdres: string;
  private _searchAdres: string;

  constructor(private pdokservice: PdoklocService) {
    pdokservice.setMaxRows(this.maxRows);
  }

  ngOnInit() {
    this._selectedAdres = '';
  }

  onSelect(location: string, i: number): void {
    this._selectedAdres = this._textadresses[i]; // location;
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
          let suggestions: string[] = Array<string>(this.maxRows);
          let screenadresses: string[] = Array<string>(this.maxRows);
          for (let i = 0; i < len; i++) {
            suggestions[i] = suggestResponse.highlighting[response[i]].suggest;
            screenadresses[i] = suggestResponse.response.docs[i].weergavenaam;
            console.log('suggestion: ' + suggestions[i] + ' screenadres: ' + screenadresses[i]);
          }
          this._adresses = suggestions;
          this._textadresses = screenadresses;
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
