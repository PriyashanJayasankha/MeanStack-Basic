import { EmployeeDetails } from './employee-details.model';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeDetailsService {
  readonly baseUrl = 'http://localhost:3000/employees';

  constructor(private http: HttpClient) { }

  addEmployee(employee: EmployeeDetails) {
    return this.http.post(this.baseUrl + '/add', employee);
  }

  updateEmployee(employee: EmployeeDetails) {
    return this.http.put(this.baseUrl + '/update/' + employee._id, employee);
  }

  getAllEmployees() {
    return this.http.get(this.baseUrl + '/all');
  }

  deleteEmployee(id: string) {
    return this.http.delete(this.baseUrl + '/delete/' + id);
  }
}
