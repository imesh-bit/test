import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, map, startWith } from 'rxjs';
import { ControllerService } from 'src/app/service/contorller_serivce/controller.service';
import { EmployeeService } from 'src/app/service/employee/employee.service';
import Swal from 'sweetalert2';
interface Employee {
  name: string;
  empCode: string;
  division: string;
  empid: any;
  salary: any;
}
export interface PeriodicElement {

  empId?: any;
  employeeName?: string;
  UserGroup?: any;
  email?: any;

  userName?: any;
  phoneno: any;
  status: any
}

let ELEMENT_DATA: PeriodicElement[] = [

]
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  contact: any;
  rePassword: any;
  email: any;
  showDeleteConfirmation(_t157: any) {
    throw new Error('Method not implemented.');
  }
  updateData(_t157: any) {
    throw new Error('Method not implemented.');
  }

  cancel() {

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

  displayedUser: string[] = ['id', 'employeeName', 'UserGroup', 'action'];
  userDataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  constructor(private employeeService: EmployeeService, private controllerService: ControllerService) {
    this.filteredEmployees = this.employeeControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterEmployees(value))
    );
  }

  valEmail = new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)]);

  getValidateEmail() {
    // if (this.valEmail.hasError('required')) {
    //   return 'Please enter a valid email.';
    // }
    if (this.valEmail.hasError('pattern')) {
      return true;

    }
    return false;
  }

  teleFormat = /^(?:\+947|07)\d{8}$/;

  // Use Validators.pattern with the regex for validation
  teleFormControl = new FormControl('', [Validators.required, Validators.pattern(this.teleFormat)]);

  // Function to check telephone number validity
  isTeleValid(): boolean {
    if (this.teleFormControl.hasError('pattern')) {
      return true;

    }
    return false;
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
    this.getUserList()
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

  getUserList(): Promise<void> {
    return new Promise<void>((resolve, reject) => {

      this.controllerService.getUserList().subscribe(
        (data: any) => {
          console.log(data);
          data.map((data: any) => {
            ELEMENT_DATA.push({
              empId: data.empid,
              employeeName: data.fullname,
              UserGroup: data.usergroup,
              email: data.email,
              userName: data.username,
              phoneno: data.phoneno,
              status: data.status,
            });

          })
        },
        (error: any) => {
          console.error('Error fetching User Groups:', error);
          reject(error);
        }

      );
    });
  }
  save(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (this.isTeleValid()) {
        this.showAlert("Invalid Tel No Format", 'red')
        return;

      }
      if (this.getValidateEmail()) {
        this.showAlert("Invalid Email Format", 'red')
        return;
      }
      const user = {
        empid: this.empId,
        username: this.userName,
        fullname: 'K M I R B KALALPITIYA',
        usergroup: this.selectedGroup,
        email: this.email,
        mobileno: this.contact,
        status: true
      }
      this.controllerService.saveUser(user).subscribe(
        (data: any) => {
          console.log(data);
          data.map((data: any) => {

            if (data.type === 'sucess') {
              this.showAlert(data.message, 'green')
              this.getUserList();
            } else {
              this.showAlert(data.message, 'red')

            }
          })
        },
        (error: any) => {
          console.error('Error fetching User Groups:', error);
          reject(error);
        }

      );
    });
  }

  showAlert(massage: any, color: any) {
    Swal.fire({

      text: massage,
      position: 'top-right',
      heightAuto: true,
      showCancelButton: false,
      showConfirmButton: false,
      timer: 1500,
      width: 'auto',
      color: color,
      // icon: type,
      // customClass: {
      //   container: 'custom-alert-container',
      //   icon: 'custom-alert-icon',
      // },
      // backdrop:''

    });

  }
}
