import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";

import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Contact } from './contact';


@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  private apiServer = "http://localhost:3000";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  create(contact): Observable<Contact> {
    return this.httpClient.post<Contact>(this.apiServer + '/contacts/', JSON.stringify(contact), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }  

  getById(id): Observable<Contact> {
    return this.httpClient.get<Contact>(this.apiServer + '/contacts/' + id)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  getAll(): Observable<Contact[]> {
    return this.httpClient.get<Contact[]>(this.apiServer + '/contacts/')
    .pipe(
      catchError(this.errorHandler)
    )
  }

  update(id, contact): Observable<Contact> {
    return this.httpClient.put<Contact>(this.apiServer + '/contacts/' + id, JSON.stringify(contact), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  delete(id){
    return this.httpClient.delete<Contact>(this.apiServer + '/contacts/' + id, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  errorHandler(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
 }

}
