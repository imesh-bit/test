import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable, startWith, map } from 'rxjs';
import { AttendanceService } from 'src/app/service/attendance-service/attendance.service';
import { EmployeeService } from 'src/app/service/employee/employee.service';
import { SalaryRequestService } from 'src/app/service/salaryRequestService/salaryRequest.service';
import { SalaryMonthService } from 'src/app/service/salarymonth-service/salaryMonth.service';
import Swal from 'sweetalert2';
interface LoadData {
  name: any;
  code: any;
  runpayroll: any;
  stopallowance: any;
  stopattendance: any;
}
interface Employee {
  name: string;
  empCode: string;
  division: string;
  empid: any;
  salary: any;
}

export interface PeriodicElement {
  id?: string;
  name?: string;
  epf?: string;
  division?: string;
  designation?: string;
  amount?: string;
  salary?: string;
  reason?: string;


}

let ELEMENT_DATA: PeriodicElement[] = []
@Component({
  selector: 'app-salaryAllowance',
  templateUrl: './salaryAllowance.component.html',
  styleUrls: ['./salaryAllowance.component.scss']
})
export class SalaryAllowanceComponent implements OnInit {

  isLoading: boolean = false;
  filteredEmployees: Observable<string[]>;
  employeeControl = new FormControl();
  selectedMonth: any;
  months: LoadData[] = [

  ];
  employees: Employee[] = [

  ];
  empId: any;
  specialNote: any;
  amount: any;
  length!: number;
  pageIndex: number = 0;
  pageSize: number = 10;
  displaSalaryAllowance: string[] = ['empId', 'epf', 'name', 'division', 'amount', 'action'];
  loadDataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  salary: any;
  setAction: boolean = true;

  constructor(private salaryReqService: SalaryRequestService, private router: Router, private salarymonthService: SalaryMonthService, private employeeService: EmployeeService) {
    this.filteredEmployees = this.employeeControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterEmployees(value))
    );
  }
  currentYear?: any;
  currentMonth?: any;
  monthCode?: any;
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

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonthIndex = currentDate.getMonth();
    const monthsN = [
      'January', 'February', 'March', 'April',
      'May', 'June', 'July', 'August',
      'September', 'October', 'November', 'December'
    ];
    const currentMonth = monthsN[currentMonthIndex];
    const monthCode = `${currentMonth}-${currentYear}`;

    console.log(currentMonth);
    console.log(currentYear);
    console.log(monthCode);
    this.selectedMonth = monthCode
    this.getAllEmployee()
    this.getAllSalaryMonths();
    this.getAllSalaryRequestList()
    this.onActionAnable(monthCode)
  }

  onActionAnable(month: any) {
    console.log('month ', month);
    this.getAllSalaryRequestList()

    const filteredMonths = this.months.filter(item => item.code === month);

    if (filteredMonths.length > 0) {
      console.log('Match found:', filteredMonths[0]);
      console.log("month name:", filteredMonths[0].name);
      console.log("month runpayroll:", filteredMonths[0].runpayroll);
      console.log("month stopallowance:", filteredMonths[0].stopallowance);
      if (filteredMonths[0].runpayroll) {
        console.log('action anable');
        this.setAction = false;
      } else {
        console.log('action disable');
        this.setAction = true;
      }
    } else {
      console.log('No match found.');
    }
  }

  private _filterEmployees(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.employees
      .filter(employee => employee.name.toLowerCase().includes(filterValue))
      .map(employee => employee.name);
  }
  getAllSalaryMonths(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.isLoading = true;
      this.salarymonthService.getSalaryMonthList().subscribe(
        (data: any) => {
          console.log('salary months:', data);
          this.months = data.map((item: any) => {
            if (data) {
              this.isLoading = false;
            }
            return {
              name: item.monthcode,
              code: item.monthcode,
              runpayroll: item.runpayroll,
              stopallowance: item.stopallowance,
              stopattendance: item.stopattendance
            };

          });
          console.log(this.months);
          resolve(); // Resolve the Promise when the data is processed
        },
        (error: any) => {
          console.error('Error fetching salary months:', error);
          reject(error); // Reject the Promise if there's an error
        }
      );
    });
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
  onKeyUp() {
    const match = this.employees.find(item => item.name === this.employeeControl.value);
    console.log('match ', match);
    this.empId = match?.empid
    this.salary = match?.salary
    console.log("emp name : ", match ? match.empid : '');
  }

  getServerData($event: PageEvent) {
    throw new Error('Method not implemented.');
  }

  getAllSalaryRequestList(): Promise<void> {
    return new Promise<void>((resolve, reject) => {

      let resp = this.salaryReqService.getAllSalaryReqList(this.selectedMonth);
      resp.subscribe((data: any) => {
        console.log('salary advance list ', data);
        ELEMENT_DATA = new Array();
        data.map((data: any) => {
          ELEMENT_DATA.push({
            id: data.empid,
            epf: data.empcode,
            amount: data.amount,
            division: data.division,
            name: data.empname,
            reason: data.reason,
            salary: data.salary,
            // designation:data.designation
          })
        })
        this.loadDataSource = new MatTableDataSource(ELEMENT_DATA);

        resolve();

      })
    })
  }
  updateAdvance: boolean = true;
  save(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (this.retrieveData('empId', this.employeeControl.value)) {

      } else {
        this.showAlert("Fill Employe Field", 'red')
        return
      }
      if (this.amount) {

      } else {
        this.showAlert("Fill Amount Field", 'red')
        return
      }
      if (this.specialNote) {

      } else {
        this.showAlert("Fill Special Note Field", 'red')
        return
      }

      const salaryReq = {
        empid: this.retrieveData('empId', this.employeeControl.value),
        monthCode: this.selectedMonth,
        reason: this.specialNote,
        amount: this.amount,
        new: this.updateAdvance
      }
      console.log(salaryReq);

      let resp = this.salaryReqService.saveSalaryReq(salaryReq);
      resp.subscribe((data: any) => {
        console.log(data);
        if (data.type === 'error') {
          this.showAlert(data.message, 'red')

        } else {
          this.showAlert(data.message, 'green')
          this.getAllSalaryRequestList()
          this.clearForm()
        }

      })
    })
  }
  clearForm() {
    this.employeeControl.setValue('');
    this.amount = null;
    this.empId = null;
    this.specialNote = null
    this.specialNote = null
    this.salary = null
  }
  deleteData(element: any): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const salaryReq = {
        empid: element.id,
        monthCode: this.selectedMonth,
        reason: element.reason,
        amount: element.amount,
      }
      console.log(salaryReq);

      let resp = this.salaryReqService.deleteSalaryAdvance(salaryReq);
      resp.subscribe((data: any) => {
        console.log(data);
        if (data.type === 'error') {
          this.showAlert(data.message, 'red')

        } else {
          this.showAlert(data.message, 'green')
          this.getAllSalaryRequestList()

        }


      })
    })
  }
  updateData(element: any) {
    this.employeeControl.setValue(this.retrieveData('emp', element.name))
    this.empId = this.retrieveData('empId', this.employeeControl.value)
    this.amount = element.amount;
    this.specialNote = element.reason;
    this.updateAdvance = false,
      this.salary = element.salary
  }

  retrieveData(type: any, code: any): any {

    if (type === 'emp') {


      const match = this.employees.find(item => item.name === code);
      console.log('match ', match);

      console.log("emp name : ", match ? match.name : '');

      return match ? match.name : '';
    }

    if (type === 'empId') {
      const match = this.employees.find(item => item.name === code);
      console.log('match ', match);

      console.log("emp empid : ", match ? match.empid : '');

      return match ? match.empid : '';
    }
  }
  close() {
    this.clearForm()

  }
  showDeleteConfirmation(element: any) {
    Swal.fire({
      title: 'Are you sure that ou want to delete this record ?',
      // text: 'You will not be able to recover this data!',
      icon: 'warning',
      // color: 'red',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.value) {
        // Handle the delete action here
        this.deleteData(element);
      }
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
