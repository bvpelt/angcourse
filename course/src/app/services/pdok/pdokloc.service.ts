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

  public getLookup(id: string): Observable<Suggest> {
    const url = this.pdokLocUrl + '/lookup?id=' + id;
    return this.http.get<Suggest>(url).pipe(
      catchError(this.handleError<Suggest>('getLookup', null))
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
