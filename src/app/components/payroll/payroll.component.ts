import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { PayRollService } from 'src/app/service/payRoll/payRoll.service';
import { SalaryMonthService } from 'src/app/service/salarymonth-service/salaryMonth.service';
import * as XLSX from 'xlsx';

interface LoadData {
  name: any;
  code: any;
  runpayroll: any;
  stopallowance: any;
  stopattendance: any;
}
import { ProgressBarMode } from '@angular/material/progress-bar';
import { ThemePalette } from '@angular/material/core';
import Swal from 'sweetalert2';

export interface PeriodicElement {
  no?: string;
  empName?: string;
  epf?: string;
  department?: string;
  designation?: string;
  grossSalary?: string;
  netSalary?: string;

}

let ELEMENT_DATA: PeriodicElement[] = [

]
@Component({
  selector: 'app-payroll',
  templateUrl: './payroll.component.html',
  styleUrls: ['./payroll.component.scss']
})
export class PayrollComponent implements OnInit {
  msg: boolean = true;

  getServerData($event: PageEvent) {
    throw new Error('Method not implemented.');
  }

  length!: number;
  pageIndex: number = 0;
  pageSize: number = 10;
  selectedMonth: any;
  months: LoadData[] = [];
  setAction: boolean = true;
  isLoading: boolean = true;

  displayedServiceAllowances: string[] = ['no', 'empName', 'epf', 'department', 'designation', 'grossSalary', 'netSalary', 'action'];
  serviceAllowancesDataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  constructor(private payRollService: PayRollService, private salarymonthService: SalaryMonthService, private router: Router) { }

  currentYear?: any;
  currentMonth?: any;
  monthCode?: any;

  color: ThemePalette = 'primary';
  mode: ProgressBarMode = 'buffer';
  value = 0;
  bufferValue = 0
  probar: boolean = true
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
    this.getAllSalaryMonths()
    this.getEmployeePayrollData(this.selectedMonth)
  }
  downloadExcel(jsonData: any | any[], fileName: string): void {
    const dataArray: any[] = Array.isArray(jsonData) ? jsonData : [jsonData];
  
    // Create an HTML table from the JSON data
    const tableHtml = this.convertToHTMLTable(dataArray);
  
    // Create a data URI for the HTML file
    const dataUri = 'data:text/html;charset=utf-8,' + encodeURIComponent(tableHtml);
  
    // Create a link element and trigger a download
    const link = document.createElement('a');
    link.href = dataUri;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  
  private convertToHTMLTable(dataArray: any[]): string {
    // Format headers and generate HTML table
    const header = Object.keys(dataArray[0]).map(h => this.formatHeader(h));
    const textContent = [header.join('\t')];

  dataArray.forEach(obj => {
    const row = Object.values(obj).map(value => String(value));
    textContent.push(row.join('\t'));
  });

  return textContent.join('\n');
  }
  
  private formatHeader(header: string): string {
    // Capitalize first letter
    const formattedHeader = header.charAt(0).toUpperCase() + header.slice(1);
  
    // Insert spaces before uppercase letters
    return formattedHeader.replace(/([A-Z])/g, ' $1').trim();
  }
  
  

  getEmployeePayrollData(monthCode: any): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      console.log(monthCode);
      ELEMENT_DATA = [];

      this.isLoading = true;
      this.payRollService.getEmployeePayrollData(monthCode).subscribe(
        (data: any) => {
          console.log('employee payroll data:', data[0].data);
          ELEMENT_DATA = [];
          if (data[0].data == "No payroll data for selected month") {
            ELEMENT_DATA = [];
            this.serviceAllowancesDataSource = new MatTableDataSource(ELEMENT_DATA);

            this.msg = false
            return;
          }else{
            ELEMENT_DATA = [];

            data.map((data: any) => {
            ELEMENT_DATA.push({
              designation: data.designation,
              department: data.division,
              epf: data.empcode,
              empName: data.empinitialname,
              grossSalary: data.grossalary,
              netSalary: data.netsalary,
              no: data.empid
            })
            console.log(ELEMENT_DATA);
            this.msg = true

          })
          this.serviceAllowancesDataSource = new MatTableDataSource(ELEMENT_DATA);

          resolve();
          }
          
        },
        (error: any) => {
          console.error('Error fetching payroll data:', error);
          reject(error);
        }
      );
    });
  }
  excellDownload(){

    return new Promise<void>((resolve, reject) => {
      this.isLoading = true;
      this.payRollService.getExcelData(this.selectedMonth).subscribe(
        (data: any) => {
          console.log('getExcelData ', data);
          if (data.type == 'error') {
            this.showAlert(data.message, 'red')
          }
          else {
            this.downloadExcel(data,'payrollData.xlsx')

          }
          resolve(); // Resolve the Promise when the data is processed
        },
        (error: any) => {
          console.error('Error fetching salary months:', error);
          reject(error); // Reject the Promise if there's an error
        }
      );
    });
   
  }
  finalizePayroll() {
    return new Promise<void>((resolve, reject) => {
      this.isLoading = true;
      this.payRollService.finalizePayroll(this.selectedMonth).subscribe(
        (data: any) => {
          console.log('finalize ', data);
          if (data.type == 'error') {
            this.showAlert(data.message, 'red')
          }
          else {
            this.showAlert(data.message, 'green')

          }
          resolve(); // Resolve the Promise when the data is processed
        },
        (error: any) => {
          console.error('Error fetching salary months:', error);
          reject(error); // Reject the Promise if there's an error
        }
      );
    });
  }
  removeEntries() {
    return new Promise<void>((resolve, reject) => {
      this.isLoading = true;
      this.payRollService.removeEntries(this.selectedMonth).subscribe(
        (data: any) => {
          console.log('Remove  ', data);
          if (data.type == 'error') {
            this.showAlert(data.message, 'red')

          } else {
            this.showAlert(data.message, 'green')

          }

          resolve(); // Resolve the Promise when the data is processed
        },
        (error: any) => {
          console.error('Error fetching salary months:', error);
          reject(error); // Reject the Promise if there's an error
        }
      );
    });
  }
  runWizard() {
    return new Promise<void>((resolve, reject) => {
      this.isLoading = true;
      this.payRollService.runWizard(this.selectedMonth).subscribe(
        (data: any) => {
          console.log('data wizard ', data);
          this.probar = false;
          if (data.type === 'error') {
            console.log(data.message);
            this.probar = true;

            this.showRunWixardError(data.message)
          } else {

            this.showAlert(data.message, 'green')

            this.getEmployeePayrollData(this.selectedMonth)
          }
          this.probar = true;
          resolve(); // Resolve the Promise when the data is processed
        },
        (error: any) => {
          console.error('Error fetching salary months:', error);
          reject(error); // Reject the Promise if there's an error
        }
      );
    });
  }
  showRunWixardError(massage: any) {
    Swal.fire({
      title: massage,
      // text: 'You will not be able to recover this data!',
      icon: 'warning',
      // color: 'red',
      showCancelButton: true,
      confirmButtonText: 'ok',
      // cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.value) {
        // Handle the delete action here
        // this.deleteData(element);
        this.probar = true;


      }
    });
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
  onActionAnable(month: any) {
    console.log('month ', month);
    this.getEmployeePayrollData(month)

    const filteredMonths = this.months.filter(item => item.code === month);

    if (filteredMonths.length > 0) {
      console.log('Match found:', filteredMonths[0]);
      console.log("emp name:", filteredMonths[0].name);
      if (filteredMonths[0].runpayroll && filteredMonths[0].stopallowance) {
        console.log('action disable');
        this.setAction = true;
      } else {
        console.log('action anable');
        this.setAction = false;
      }
    } else {
      console.log('No match found.');
    }
  }
  updateData(element: any) {
    this.router.navigate(['home/editSalary']);
    localStorage.setItem('monthCode', this.selectedMonth);
    localStorage.setItem('salaryID', element.no)
    // this.getSelectedEmployeePayrollData(this.selectedMonth, element.no)
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
        // this.deleteData(element);
      }
    });
  }
  // deletePayRoll(): Promise<void> {
  //   return new Promise<void>((resolve, reject) => {
  //     this.isLoading = true;
  //     this.payRollService.deletePayRoll().subscribe(
  //       (data: any) => {
  //         console.log('salary months:', data);
  //         this.months = data.map((item: any) => {
  //           if (data) {
  //             this.isLoading = false;
  //           }
  //           return {
  //             name: item.monthcode,
  //             code: item.monthcode,
  //             runpayroll: item.runpayroll,
  //             stopallowance: item.stopallowance,
  //             stopattendance: item.stopattendance
  //           };

  //         });
  //         console.log(this.months);
  //         resolve(); // Resolve the Promise when the data is processed
  //       },
  //       (error: any) => {
  //         console.error('Error fetching salary months:', error);
  //         reject(error); // Reject the Promise if there's an error
  //       }
  //     );
  //   });
  // }

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
