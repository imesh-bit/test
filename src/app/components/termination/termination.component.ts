import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, startWith, map } from 'rxjs';
import { ControllerService } from 'src/app/service/contorller_serivce/controller.service';
import { EmployeeService } from 'src/app/service/employee/employee.service';
interface Employee {
  name: string;
  empCode: string;
  division: string;
  empid: any;
  salary: any;
}
export interface PeriodicElement {
  id?: string;
  employeeName?: string;
  UserGroup?: any;
  epf?: any;
  empId?: any;
}

let ELEMENT_DATA: PeriodicElement[] = [

]
@Component({
  selector: 'app-termination',
  templateUrl: './termination.component.html',
  styleUrls: ['./termination.component.scss']
})
export class TerminationComponent implements OnInit {

  contact: any;
  rePassword: any;
  department: any;
  comments: any;
doa: any;
  showDeleteConfirmation(_t157: any) {
    throw new Error('Method not implemented.');
  }
  updateData(_t157: any) {
    throw new Error('Method not implemented.');
  }
  save() {
    throw new Error('Method not implemented.');
  }
  cancel() {
    throw new Error('Method not implemented.');
  }
  selectedGroup: any;
  userGroups: string[] = [

  ];
  empId: any;
  employees: Employee[] = [

  ];
  filteredEmployees: Observable<string[]>;
  employeeControl = new FormControl();
  userName: any;
  password: any;

  displayedReturns: string[] = ['returns'];
  displayedComplete: string[] = ['complete'];
  displayedLoan: string[] = ['loanId','loanType','loanValue','outStanding'];
  userDataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  completeDataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  loanDataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  constructor(private employeeService: EmployeeService, private controllerService: ControllerService) {
    this.filteredEmployees = this.employeeControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterEmployees(value))
    );
  }
  private _filterEmployees(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.employees
      .filter(employee => employee.name.toLowerCase().includes(filterValue))
      .map(employee => employee.name);
  }
  selectedRowIndex: number = -1;
  isRowHovered: number | null = null;

  onRowClick(index: number) {
    this.selectedRowIndex = index;
    // Add any additional logic you want to perform when a row is clicked
  }
  getRowStyle(index: number) {
    return {
      'background-color': this.selectedRowIndex === index ? '#cce5ff' : 'transparent',
      // Add any other styles you want to apply conditionally
    };
  }
  ngOnInit() {
    this.getAllEmployee()
    this.getAllUserGroups()
  }

  onKeyUp() {
    const match = this.employees.find(item => item.name === this.employeeControl.value);
    console.log('match ', match);
    this.empId = match?.empid
    // this.salary = match?.salary
    console.log("emp name : ", match ? match.empid : '');
  }

  getAllEmployee(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      console.log("Getting all employees");

      let resp = this.employeeService.getEmployeeList('ABC');
      resp.subscribe(
        (data: any) => {
          // console.clear()
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

          resolve();
        },
        (error: any) => {
          console.error("Error fetching employees:", error);
          reject();
        }
      );
    });
  }

  getAllUserGroups(): Promise<void> {
    return new Promise<void>((resolve, reject) => {

      this.controllerService.GetGroupList().subscribe(
        (data: any) => {
          console.log(data);
          data.map((data: any) => {
            this.userGroups.push(data.userGroup)

          })
        },
        (error: any) => {
          console.error('Error fetching User Groups:', error);
          reject(error);
        }

      );
    });
  }

}
