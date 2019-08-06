import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../environments/environment'
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Customer } from './interface/customer';

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {

  url = 'http://localhost:50029/api/customer';  

  constructor(private http: HttpClient) { }

  getAllCustomer(): Observable<Customer[]>{
    return this.http.get<Customer[]>(this.url);
  }

  /*public getData = (route: string) => {
    return this.http.get(this.createCompleteRoute(route, environment.urlAddress));
  }

  private createCompleteRoute = (route: string, envAddress: string) => {
    return `${envAddress}/${route}`;
  }

  private generateHeaders = () => {
    return {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
  }*/

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead     

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
