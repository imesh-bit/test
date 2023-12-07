import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SalaryMonthService } from 'src/app/service/salarymonth-service/salaryMonth.service';
import Swal from 'sweetalert2';
interface LoadData {
  name: any;
  code: any;

}
interface Employee {
  name: string;
  empCode: string;
  division: string;
  empid: any;
}
export interface PeriodicElement {
  id?: string;
  month?: string;
  payroll?: string;
  allowance?: string;
  attendance?: string;
  year?: string
  monthCode?: string
  advance?: string
}

let ELEMENT_DATA: PeriodicElement[] = [

]

@Component({
  selector: 'app-payrollMonth',
  templateUrl: './payrollMonth.component.html',
  styleUrls: ['./payrollMonth.component.scss']
})
export class PayrollMonthComponent implements OnInit {
  years: number[] = [2030, 2029, 2028, 2027, 2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010];

  selectedMonth: any;
  selectedYear: any;
  months: LoadData[] = [
    { name: 'January', code: 1 },
    { name: 'February', code: 2 },
    { name: 'March', code: 3 },
    { name: 'April', code: 4 },
    { name: 'May', code: 5 },
    { name: 'June', code: 6 },
    { name: 'July', code: 7 },
    { name: 'August', code: 8 },
    { name: 'September', code: 9 },
    { name: 'October', code: 10 },
    { name: 'November', code: 11 },
    { name: 'December', code: 12 }
  ];
  monthCode: any;
  runpayroll?: boolean = false;
  stopallowance?: boolean = false;
  stopattendance?: boolean = false;
  displayedServiceAllowances: string[] = ['month', 'payroll', 'attendance', 'allowance', 'advance', 'action'];
  serviceAllowancesDataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  stopadvance?: boolean = false;
  constructor(private salaryMonthService: SalaryMonthService) { }
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

    // for (let year = 2030; year >= 2010; year--) {
    //   this.years.push(year.toString());
    // }
    this.getAllSalaryMonths()
  }
  updateData(element: any) {
    console.log(element);

    if (element && element.month) {
      // Split the month string by space
      const parts = element.month.split(' ');
  
      // Check if there's at least one part
      if (parts.length > 0) {
        this.selectedMonth = parts[0];
      } else {
        // Handle the case when the month string is not in the expected format
        console.error('Invalid month string format:', element.month);
      }
    } else {
      // Handle the case when the element or its month property is missing
      console.error('Invalid element:', element);
    }
    if (element.payroll == 'no') {
      this.runpayroll = false;
    } else {
      this.runpayroll = true;

    }
    this.selectedYear = element.year
    console.log(this.selectedYear);
    if (element.allowance == 'no') {
      this.stopallowance = false;
    } else {
      this.stopallowance = true;

    }
     if (element.attendance == 'no') {
      this.stopattendance = false;
    } else {
      this.stopattendance = true;

    } 
    if (element.advance == 'no') {
      this.stopadvance = false;
    } else {
      this.stopadvance = true;

    }

   
  }
  cancel() {
    this.selectedMonth = null;
    this.selectedYear = null;
    this.runpayroll = false;
    this.stopallowance = false;
    this.stopattendance = false
    this.stopadvance = false
  }

  getCodeFromName(monthName: string): number | undefined {
    const month = this.months.find(item => item.name === monthName);
    return month ? month.code : undefined;
  }
  getAllSalaryMonths(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.salaryMonthService.getSalaryMonthList().subscribe(
        (data: any) => {
          console.log('salary months:', data);
          ELEMENT_DATA = new Array()
          data.map((data: any) => {
            let runp = 'no'
            let sallow = 'no'
            let sattend = 'no'
            let advance = 'no'
            if (data.runpayroll) {
              runp = 'yes'
            }
            if (data.stopallowance) {
              sallow = 'yes'
            }
            if (data.stopattendance) {
              sattend = 'yes'
            }
            if (data.stopadvance) {
              advance = 'yes'
            }
            ELEMENT_DATA.push({
              id: data.monthid,
              month: data.monthname +' - '+data.year,
              year: data.year,
              payroll: runp,

              allowance: sallow,
              attendance: sattend,
              monthCode: data.monthcode,
              advance: advance
            })
          })
          this.serviceAllowancesDataSource = new MatTableDataSource(ELEMENT_DATA);
          console.log(ELEMENT_DATA);

          resolve();
        },
        (error: any) => {
          console.error('Error fetching salary months:', error);
          reject(error); // Reject the Promise if there's an error
        }
      );
    });
  }
  save(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.monthCode = this.getCodeFromName(this.selectedMonth);
      console.log(this.monthCode);
      if (!this.selectedMonth) {
        this.showAlert('Select a Month...!', 'red');
        return

      } if (!this.selectedYear) {
        this.showAlert('Select a Year...!', 'red');
        return
      }

      const month = {
        monthname: this.selectedMonth,
        year: this.selectedYear,
        monthid: this.monthCode,
        runpayroll: this.runpayroll,
        stopallowance: this.stopallowance,
        stopattendance: this.stopattendance,
        stopadvance: this.stopadvance
      }

      console.log(month);
      let resp = this.salaryMonthService.saveMonth(month);
      resp.subscribe(
        (data: any) => {
          if (data.message === 'error') {
            this.showAlert(data.message, 'red')

          } else {
            this.showAlert(data.message, 'green')
            this.getAllSalaryMonths();
            this.selectedMonth = null;
            this.selectedYear = null;
            this.runpayroll = false;
            this.stopallowance = false;
            this.stopattendance = false
            this.stopadvance = false
          }


          resolve();
        },
        (error: any) => {
          reject();
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
