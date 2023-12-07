import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DataTransferService } from 'src/app/service/data-transfer-service/data-transfer.service';
import { EmployeeService } from 'src/app/service/employee/employee.service';

export interface PeriodicElement {
  systemId?: string;
  activeStatus?: boolean;
  employeeName?: string;
  epf?: number;
  department?: string;
  designation?: string;
  appoinmentDate?: string;
  dateOfBirth?: string;
  gender?: string;
}

let ELEMENT_DATA: PeriodicElement[] = [
  {
    systemId: '1',
    activeStatus: true,
    employeeName: 'John Doe',
    epf: 12345,
    department: 'HR',
    designation: 'Manager',
    appoinmentDate: '2022-05-15',
    dateOfBirth: '1990-02-10',
    gender: 'Male',
  },
  {
    systemId: '2',
    activeStatus: true,
    employeeName: 'Jane Smith',
    epf: 54321,
    department: 'Finance',
    designation: 'Accountant',
    appoinmentDate: '2021-11-20',
    dateOfBirth: '1985-09-25',
    gender: 'Female',
  },
  // Add more data items as needed
];

// Export the data array
export { ELEMENT_DATA };


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  length!: number;
  pageIndex: number = 0;
  pageSize: number = 10;
  displayedEmployee: string[] = ['systemId', 'employeeName', 'epf', 'department', 'designation', 'appoinmentDate', 'dateOfBirth', 'gender', 'action'];
  employeeDataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  searchEmp: any;

  isLoading: boolean = true;
  constructor(private router: Router, private employeeService: EmployeeService, ) {

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
    this.isLoading = true;
    // console.log(' data transfer',this.datatransferService.getData());

    if (localStorage.getItem('token')) {

      setTimeout(() => {

      }, 10000);
    } this.getAllBankList();
  }
  getAllBankList(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      try {
        let reps = this.employeeService.getEmployeeList('ABC');
        this.isLoading = true;
        reps.subscribe((data: any) => {
          console.table("emp list :", data);
          ELEMENT_DATA = new Array();


          data.map((data: any) => {
            let gender = 'Female'
            if (data.gender == 1) {
              gender = "Male"
            }

            ELEMENT_DATA.push({
              systemId: data.empid,
              activeStatus: data.active,
              employeeName: data.empinitialname,
              epf: data.empcode,
              department: data.division,
              designation: data.designation,
              appoinmentDate: data.dateappointment,
              dateOfBirth: data.datebirth,
              gender: gender,
            });
            this.employeeDataSource = new MatTableDataSource(ELEMENT_DATA);
            this.isLoading = false;
          })
        })
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }


  onSearchKeyup(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.employeeDataSource.filter = filterValue.trim().toLowerCase();

  }

  getServerData(event: PageEvent) {
    this.pageSize = event?.pageSize;
    this.pageIndex = event?.pageIndex;

  }
  isActive(element: any): boolean {
    return element.activeStatus;
  }

  updateData(element: any) {
    console.log(element);
    localStorage.setItem('systemId', element.systemId)
    this.router.navigate(['home/register']);
  }

  employeeRegister() {
    // if (!this.employeeTable) {
    //   this.employeeProfile = false;
    //   this.employeeTable = true;
    // } else {
    //   this.employeeProfile = true;
    //   this.employeeTable = false;
    // }
    // this.companyDetailsView=true;
    this.router.navigate(['home/register']);
    localStorage.setItem('label', 'Employee Registration')
  }

}
