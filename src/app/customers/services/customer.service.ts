import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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
  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.apiURL);
  }
  getCustomer(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.apiURL}/${id}`);
  }
  createCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.apiURL, customer);
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
