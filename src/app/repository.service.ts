import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../environments/environment'
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';



const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}; 

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {

  constructor(private http: HttpClient) { }

  GetAll(method: string): Observable<any> {
    return this.http.get(`${environment.urlAddress}/${method}`)
      .pipe(
        tap(_ => console.log('fetched'))
        //catchError(this.handleError('get request', []))
      );
  }

  GetByUnique(id: string, method: string): Observable<any> {
    const url = `${environment.urlAddress}/${method}/${id}`;
    return this.http.get<any>(url).pipe(
      tap(_ => console.log(`fetched id=${id}`))
      //catchError(this.handleError<any>(`get id=${id}`))
    );
  }

  GetByid(id: number, method: string): Observable<any> {
    const url = `${environment.urlAddress}/${method}/${id}`;
    return this.http.get<any>(url).pipe(
      tap(_ => console.log(`fetched id=${id}`))
      //catchError(this.handleError<any>(`get id=${id}`))
    );
  }

  POST (model: object, method: string): Observable<any> {
    const url = `${environment.urlAddress}/${method}`;
    return this.http.post<any>(url, model, httpOptions).pipe(
      tap((product: object) => console.log(`added model`))
      //catchError(this.handleError<object>('add model'))
    );
  }  

  UPDATE (model: object, method: string): Observable<any> {
    const url = `${environment.urlAddress}/${method}`;
    return this.http.put<any>(url, model, httpOptions).pipe(
      tap((product: object) => console.log(`updated model`))
      //catchError(this.handleError<object>('update model'))
    );
  }

  /*UPDATE (id: number, value: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }*/

  DELETE (id: string): Observable<any> {
    const url = `${environment.urlAddress}/${id}`;  
    return this.http.delete<any>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted id=${id}`))
      //catchError(this.handleError<any>('delete'))
    );
  }

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
      console.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  
}
