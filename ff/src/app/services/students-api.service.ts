import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { Student } from "../models/student";
import { catchError, retry } from "rxjs/operators";

@Injectable({ providedIn: 'root' })
export class StudentsApiService {
  // Students Endpoint
  basePath = 'http://localhost:3000/api/students';
  constructor(private http: HttpClient) { }
  // HTTP Default Options
  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'})};
// API Error Handling
  handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      console.log('An error occurred: ', error.error.message);
    }
    else {
      console.log(`Backend returned code ${error.status}, body was: ${error.error}`);
    }
    return throwError('Something happened with request, please try again later.');
  }
  // Create Student
  addStudent(item: any): Observable<Student> {
    return this.http.post<Student>(this.basePath, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  // Get Student by Id
  getStudentById(id: number): Observable<Student> {
    return this.http.get<Student>(`${this.basePath}/${id}`, this.httpOptions )
      .pipe(retry(2), catchError(this.handleError));
  }
  // Get Student Data
  getAllStudents(): Observable<Student>{
    return this.http.get<Student>(this.basePath)
      .pipe(retry(2), catchError(this.handleError));
  }
  // Update Student
  updateStudent(id: number, item: Student): Observable<Student>{
    return this.http.put<Student>(`${this.basePath}/${id}`, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  // Delete Student
  deleteStudent(id: number): Observable<any> {
    return this.http.delete<Student>(`${this.basePath}/${id}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }}
