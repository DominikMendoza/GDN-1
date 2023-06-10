import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Customer } from '../../models/customer';
import { CustomerService } from '../../services/customer.service';
import * as _ from 'lodash';
import { NgForm } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, AfterViewInit{
  customers: Customer[] = [];
  dataCustomers: MatTableDataSource<any>;
  customerData: Customer;
  isEdit: boolean = false;
  displayedColumns: string[] = ['id', 'name', 'logo', 'arrival_time', 'actions'];

  @ViewChild('customerForm', {static: false})
  customerForm!: NgForm;

  @ViewChild(MatPaginator, {static: true})
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;
  
  constructor(private customerService: CustomerService) {
    this.customerData = {} as Customer;
    this.dataCustomers = new MatTableDataSource<Customer>();

  }
  ngAfterViewInit(): void {
    this.dataCustomers.sort = this.sort;
  }
  ngOnInit(): void {
    this.dataCustomers.paginator = this.paginator;
    this.getCustomersv2();
  }

  cancelEdit(): void {
    this.isEdit = false;
    this.customerForm.resetForm();
  }
  
  getCustomers(): void {
    this.customerService.getCustomers().subscribe(customers => this.customers = customers);
  }
  getCustomersv2(): void {
    this.customerService.getCustomers().subscribe(customers => this.dataCustomers.data = customers);
  }

  updateCustomer(customer: Customer): void {
    this.customerService.updateCustomer(customer).subscribe(() => {
      this.getCustomersv2();
    });
  }

  deleteCustomer(id: number): void {
    this.customerService.deleteCustomer(id).subscribe(() => {
      this.getCustomersv2();
    });
  }

  editCustomer(customer: Customer): void {
    this.isEdit = true;
    this.customerData = _.cloneDeep(customer);
  }

  createCustomer(customer: Customer): void {
    this.customerService.createCustomer(customer).subscribe(() => {
      this.getCustomersv2();
    });
  }

  onSubmit() {
    if(this.customerForm.form.valid) {
      if(this.isEdit) {
        this.updateCustomer(this.customerData);
      } else {
        this.createCustomer(this.customerData);
      }
    } else {
      console.log('Invalid Data');
    }
  }
}
