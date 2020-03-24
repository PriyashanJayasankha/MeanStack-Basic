import { EmployeeDetails } from './../../shared/employee-details.model';
import { EmployeeDetailsService } from './../../shared/employee-details.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

declare var M: any;

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  selectedEmployee: EmployeeDetails = {} as EmployeeDetails;

  allEmployees = [] as EmployeeDetails[];

  constructor( private employeeService: EmployeeDetailsService ) { }

  ngOnInit(): void {
    this.getAllEmployees();
    this.resetForm();
  }

  getAllEmployees() {
    this.employeeService.getAllEmployees().subscribe( res => {
      this.allEmployees = res as EmployeeDetails[];
    });
  }

  onSubmit(formData?: NgForm) {
    if (this.selectedEmployee._id === '') {
      // add new
      this.employeeService.addEmployee(formData.value as EmployeeDetails).subscribe( res => {
        this.resetForm(formData);
        this.getAllEmployees();
        M.toast({ html: 'Added Succesfully', classes: 'rounded'});
      }, err => {
        M.toast({ html: '❌ Error: ' + err.message, classes: 'rounded'});
      });
    } else {
      // update existing
      this.employeeService.updateEmployee(formData.value as EmployeeDetails).subscribe( res => {
        this.resetForm(formData);
        this.getAllEmployees();
        M.toast({ html: 'Updated Succesfully', classes: 'rounded'});
      }, err => {
        M.toast({ html: '❌ Error: ' + err.message, classes: 'rounded'});
      });
    }
  }

  onEdit(employee: EmployeeDetails) {
    this.selectedEmployee = {
      _id: employee._id,
      name: employee.name,
      position: employee.position,
      office: employee.office,
      salary: employee.salary
    };
  }

  onDelete(id: string) {
    this.employeeService.deleteEmployee(id).subscribe( res => {
      this.getAllEmployees();
      M.toast({ html: 'Deleted Succesfully', classes: 'rounded'});
    }, err => {
      M.toast({ html: '❌ Error: ' + err.message, classes: 'rounded'});
    });
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
    }
    this.selectedEmployee = {
      _id: '',
      name: '',
      position: '',
      office: '',
      salary: ''
    };
  }

}
