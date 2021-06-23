import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { Letra } from "../models/letra";
import { catchError, retry } from "rxjs/operators";

@Injectable({ providedIn: 'root' })
export class LetrasApiService {
  basePath = 'http://localhost:3000/api/letras'

  constructor(private http: HttpClient) {  }

  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' })};

  handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      console.log('An error occurred: ', error.error.message);
    }
    else {
      console.log(`Backend returned code ${error.status}, body was: ${error.error}`);
    }
    return throwError('Something happened with request, please try again later.');
  }

  getAllLetras(): Observable<Letra> {
    return this.http.get<Letra>(this.basePath)
      .pipe(retry(2), catchError(this.handleError));
  }

  addLetra(item: any): Observable<Letra> {
    return this.http.post<Letra>(this.basePath, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  getLetraById(id: number): Observable<Letra> {
    return this.http.get<Letra>(`${this.basePath}/${id}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  updateLetra(id: number, item: any): Observable<Letra> {
    return this.http.put<Letra>(`${this.basePath}/${id}`, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  deleteLetra(id: number): Observable<any> {
    return this.http.delete<Letra>(`${this.basePath}/${id}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
}
