import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable, startWith, map } from 'rxjs';
import { AttendanceService } from 'src/app/service/attendance-service/attendance.service';
import { EmployeeService } from 'src/app/service/employee/employee.service';
import { SalaryMonthService } from 'src/app/service/salarymonth-service/salaryMonth.service';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
interface LoadData {
  name: any;
  code: any;
  runpayroll: any;
  stopallowance: any;
  stopattendance: any;
}
export interface PeriodicElement {
  id?: string;
  employeeName?: string;
  noOfDays?: any;
  epf?: any;
  empId?: any;
  division?: any;
}

let ELEMENT_DATA: PeriodicElement[] = [

]
interface Employee {
  name: string;
  empCode: string;
  division: string;
  empid: any;
}
@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements OnInit {


  categoryid: any;
  selectedMonth: any;
  months: LoadData[] = [

  ];
  employees: Employee[] = [

  ];
  length!: number;
  pageIndex: number = 0;
  pageSize: number = 10;
  displayedAttendance: string[] = ['id', 'epf', 'employeeName', 'division', 'noOfDays', 'action'];
  attendanceDataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  empid: any

  id: any = 0;
  isLoading: boolean = true;
  filteredEmployees: Observable<string[]>;
  employeeControl = new FormControl();
  data!: any[];
  employeeName!: any
  noOfDays!: any
  setAction: boolean = true;
 
  constructor(private router: Router, private salarymonthService: SalaryMonthService, private attendanceService: AttendanceService, private employeeService: EmployeeService) {
    this.filteredEmployees = this.employeeControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterEmployees(value))
    );
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
  private _filterEmployees(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.employees
      .filter(employee => employee.name.toLowerCase().includes(filterValue))
      .map(employee => employee.name);
  }
  // private _filterEmployees(value: string): string[] {
  //   const filterValue = value.toLowerCase();
  //   return this.employees
  //     .filter(employee => 
  //       employee.name.toLowerCase().includes(filterValue) 

  //     )
  //     .map(employee => employee.name + ' (' + employee.empCode + ')'); // Modify the mapping as needed
  // }

  currentYear?: any;
  currentMonth?: any;
  monthCode?: any;

  async ngOnInit() {

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
    // Call your getAttendanceList function with monthCode
    this.getAttendanceList(monthCode);
    await this.getAllSalaryMonths();
    this.getAllEmployee();
    this.onActionAnable(this.selectedMonth)

  }

  onActionAnable(month: any) {
    // console.log('month ', month);
    // this.getAttendanceList(month)

    // const filteredMonths = this.months.filter(item => item.code === month);

    // if (filteredMonths.length > 0) {
    //   console.log('Match found:', filteredMonths[0]);
    //   console.log("emp name:", filteredMonths[0].name);
    //   if (filteredMonths[0].runpayroll && filteredMonths[0].stopattendance) {
    //     console.log('action anable');
    //     this.setAction = false;
    //   } else {
    //     console.log('action disable');
    //     this.setAction = true;

    //   }
    // } else {
    //   console.log('No match found.');
    // }
    this.getAttendanceList(this.selectedMonth)

  }


  getServerData($event: PageEvent) {
    throw new Error('Method not implemented.');
  }


  onFileChange(event: any): void {
    console.log("file ",event);
    if(this.selectedMonth){
      const file = event.target.files[0];
      if (file) {
        this.readExcelFile(file);
      }
    }else{
      this.showAlert('Please Select Salary Month First',"red");
    }
  }

  readExcelFile(file: File): void {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const binaryData = e.target.result;
      const workbook = XLSX.read(binaryData, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      this.data = XLSX.utils.sheet_to_json(worksheet, { raw: true });
      console.log(this.data);
      const list = {
        excelData: this.data,
        monthCode: this.selectedMonth
      }
      console.log(list);

      this.attendanceService.saveAttendanceList(list).subscribe((data: any) => {
        console.log('attendance list :', data);
        this.getAttendanceList(this.selectedMonth)
      })
    };
    reader.readAsBinaryString(file);
  }
  getAllSalaryMonths(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.isLoading = true;

      this.salarymonthService.getSalaryMonthList().subscribe(
        (data: any) => {
          console.log('salary months:', data);
          this.months = data.map((item: any) => {

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
          this.isLoading = false;
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
      this.isLoading = true;

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
            empid: employeeData.empid
          }));
          this.isLoading = false;

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


  getAttendanceList(monthCode: any): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      try {
        this.isLoading = true;
        let reps = this.attendanceService.getAttendanceList(monthCode);
        reps.subscribe((data: any) => {
          console.log("attendance list :", data);
          ELEMENT_DATA = new Array();
          data.map((data: any) => {
            ELEMENT_DATA.push({
              id: data.id,
              empId: data.empid,
              epf: data.empcode,
              employeeName: data.empname,
              division: data.division,
              noOfDays: data.noofdates
            })

          })
          this.attendanceDataSource = new MatTableDataSource(ELEMENT_DATA);
          this.isLoading = false;

        })
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }
  clearForm() {
    this.employeeControl.setValue('');
    this.noOfDays = null;
    this.empid = null;
  }
  keyUp() {
    this.empid = this.retrieveData('empId', this.employeeControl.value)
  }

  save(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (!this.selectedMonth) {
        this.showAlert('Select Salary Month', 'red')
        return;
      }
      if (this.employeeControl.value) {
        this.empid = this.retrieveData('empId', this.employeeControl.value)
      } else {
        this.showAlert('Fill Employee Name', 'red')
        return;
      }
      if (!this.noOfDays) {
        this.showAlert('Fill No of Days', 'red')
        return;
      }
      const attendance = {
        id: this.id,
        empid: this.empid,
        noofdates: this.noOfDays,
        monthCode: this.selectedMonth,
      }
      console.log(attendance);



      try {
        let reps = this.attendanceService.saveAttendance(attendance);
        this.isLoading = true;

        reps.subscribe((data: any) => {
          console.log(data);

          this.showAlert(data.message, 'green')
          this.getAttendanceList(this.selectedMonth)
          this.clearForm()
          this.isLoading = false;

        })
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  deleteData(element: any): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      console.log(element.id);
      const attendance = {
        id: element.id,
        monthCode: this.selectedMonth,
        empid: element.empId
      }
      try {
        let reps = this.attendanceService.deleteAttendance(attendance);
        this.isLoading = true;

        reps.subscribe((data: any) => {
          console.log(data);
          this.showAlert(data.message, 'green')
          this.isLoading = false;
          this.getAttendanceList(this.selectedMonth)
        })
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }
  cancel() {
    this.clearForm()

  }
  updateData(element: any) {
    // throw new Error('Method not implemented.');
    // this.selectedMonth=this.monthCode
    this.empid = element.empId;
    this.id = element.id
    // this.retrieveData('empId',element.empId)
    this.noOfDays = element.noOfDays
    this.employeeControl.setValue(this.retrieveData('emp', element.employeeName))
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
}
