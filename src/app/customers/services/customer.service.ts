import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { Customer } from '../models/customer';
@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private apiURL = 'http://localhost:3000/api/v1/customers';

  httpOptions = {
    headers: { 'Content-Type': 'application/json' }
  };

  constructor(private http: HttpClient) { }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      //Deelte Error handling
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened, please try again later.');
  }



  getCustomers(): Observable<Customer> {
    return this.http
    .get<Customer>(this.apiURL, this.httpOptions)
    .pipe(retry(2), catchError(this.handleError));
  }
  getCustomer(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.apiURL}/${id}`);
  }
  createCustomer(customer: Customer): Observable<Customer> {
    return this.http
    .post<Customer>(this.apiURL, JSON.stringify(customer), this.httpOptions)
    .pipe(retry(2), catchError(this.handleError));
  }
  updateCustomer(customer: Customer): Observable<Customer> {
    return this.http.put<Customer>(`${this.apiURL}/${customer.id}`, customer);
  }
  deleteCustomer(id: number): Observable<Customer> {
    return this.http.delete<Customer>(`${this.apiURL}/${id}`);
  }
  getCustomerByDate(date: Date): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.apiURL}?arrival_time=${date.toISOString()}`);
  }
}
