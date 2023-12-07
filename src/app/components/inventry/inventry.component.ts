import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';  // Import startWith from 'rxjs/operators'
import { EmployeeService } from 'src/app/service/employee/employee.service';
import { PeriodicElement } from '../userGroup/userGroup.component';

interface Employee {
  name: string;
  empCode: string;
  division: string;
  empid: any;
  salary: any;
}
let ELEMENT_DATA: PeriodicElement[] = [

]
@Component({
  selector: 'app-inventry',
  templateUrl: './inventry.component.html',
  styleUrls: ['./inventry.component.scss']
})
export class InventryComponent implements OnInit {
getRowStyle(_t145: any): { [klass: string]: any; }|null|undefined {
throw new Error('Method not implemented.');
}
onRowClick(_t145: any) {
throw new Error('Method not implemented.');
}
showDeleteConfirmation(_t131: any) {
throw new Error('Method not implemented.');
}
updateData(_t131: any) {
throw new Error('Method not implemented.');
}
cancel() {
throw new Error('Method not implemented.');
}
save() {
throw new Error('Method not implemented.');
}
  employees: Employee[] = [];
  empId: any;
  filteredEmployees: Observable<string[]>;
  employeeControl = new FormControl();
  item: any;
  qty: any;
  description: any;
  displayedItem: string[] = [ 'item', 'qty', 'description','action'];
  itemDataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  constructor(private employeeService: EmployeeService) {
    this.filteredEmployees = this.employeeControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterEmployees(value))
    );
  }

  ngOnInit() {
    this.getAllEmployee();
  }

  private _filterEmployees(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.employees
      .filter(employee => employee.name.toLowerCase().includes(filterValue))
      .map(employee => employee.name);
  }

  onKeyUp() {
    const match = this.employees.find(item => item.name === this.employeeControl.value);
    console.log('match ', match);
    this.empId = match?.empid;
    // Uncomment the following line if you want to use the salary property
    // this.salary = match?.salary;
    console.log("emp name : ", match ? match.empid : '');
  }

  getAllEmployee(): void {
    console.log("Getting all employees");

    this.employeeService.getEmployeeList('ABC').subscribe(
      (data: any) => {
        console.log(data);

        // Filter and map the data to Employee objects
        this.employees = data.map((employeeData: any) => ({
          name: employeeData.empinitialname,
          empCode: employeeData.empcode,
          division: employeeData.division,
          empid: employeeData.empid,
          salary: employeeData.salary
        }));

        console.log(this.employees);
      },
      (error: any) => {
        console.error("Error fetching employees:", error);
      }
    );
  }
}
