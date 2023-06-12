import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class HttpService {

  private base_url = 'https://smartsky.onrender.com/smartsky/api/1.0/'
  private state_url = './../assets/states.json'

  constructor(private http: HttpClient) { }

  private handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
        console.error('Client Side Error :', errorResponse.error.message);
    } else {
        console.error('Server Side Error :', errorResponse);
    }
    return throwError('There is a problem with the service. Please try again later.');
  }

  public post(url:any, data:any): Observable<any>{
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json'})
    }
    return this.http.post<any>(this.base_url + url, data, options).pipe(catchError(this.handleError))
  }

  public get(url:any): Observable<any>{
    return this.http.get<any>(this.base_url+url).pipe(catchError(this.handleError))
  }

  public getToken() {
    return localStorage.getItem('token');
  }

  public getUser() {
    return localStorage.getItem('id');
  }

  public get_states(): Observable<any> {
    return this.http.get<any>(this.state_url).pipe(catchError(this.handleError))
  }

  public removeToken() {
    localStorage.removeItem('token')
  }

}
