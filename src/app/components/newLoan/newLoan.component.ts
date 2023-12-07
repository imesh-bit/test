import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable, map, startWith } from 'rxjs';
import { EmployeeService } from 'src/app/service/employee/employee.service';
import { LoanManagerService } from 'src/app/service/loanManagerService/loanManager.service';
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
  salary: any;

}
export interface PeriodicElement {
  id?: number;
  deductMonth?: string;
  remark?: string;
  deductAmount?: string;



}

let ELEMENT_DATA: PeriodicElement[] = [

];
@Component({
  selector: 'app-newLoan',
  templateUrl: './newLoan.component.html',
  styleUrls: ['./newLoan.component.scss']
})
export class NewLoanComponent implements OnInit {
  empId: any;
  gurantee1: any;
  gurantee2: any;

  outStanding: any;
  loanSettleDate: any;
  settleAmount: any;
  voucherNumber: any;
  specialNote: any;

  loanType: any;
  LoanTypes: string[] = ['Housing Loan', 'Vehical Loan']
  months: LoadData[] = [

  ];
  selectedMonth: any;
  filteredApplicant: Observable<any[]>;
  applicantControl: FormControl<any>;
  applicantOption: Employee[] = [];
  filteredGuarantee1: Observable<any[]>;
  guaranteeControl1: FormControl<any>;
  filteredGuarantee2: Observable<any[]>;
  guaranteeControl2: FormControl<any>;
  applyDate: any;
  loanAmount: any;
  settlemntperiod: any;
  monthlyInstalment: any;
  reason: any;
  loanNo: any = 0;
  displaySettleLoan: string[] = ['deductMonth', 'remark', 'deductAmount'];
  settleLoanoadDataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  considerateSalary: any;

  constructor(private router: Router, private salarymonthService: SalaryMonthService, private loanService: LoanManagerService, private employeeService: EmployeeService) {

    this.applicantControl = new FormControl();
    this.filteredApplicant = this.applicantControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterApplicants(value))
    );
    this.guaranteeControl1 = new FormControl();
    this.filteredGuarantee1 = this.guaranteeControl1.valueChanges.pipe(
      startWith(''),
      map(value => this._filterApplicants(value))
    );
    this.guaranteeControl2 = new FormControl();
    this.filteredGuarantee2 = this.guaranteeControl2.valueChanges.pipe(
      startWith(''),
      map(value => this._filterApplicants(value))
    );
  }
  private _filterApplicants(value: any): any[] {
    const filterValue = value.toLowerCase();
    return this.applicantOption
      .filter(wage => wage.name.toLowerCase().includes(filterValue))
      .map(wage => wage.name);
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
    await this.getAllEmployee()
    const jsonString = localStorage.getItem('settleLoan');

    // Check if the JSON string is not null
    if (jsonString !== null && jsonString !== '') {
      // Parse the JSON string back to a JavaScript object
      const settleLoan = JSON.parse(jsonString);

      // Now, you can use the `settleLoan` object as needed
      console.log(settleLoan);
      this.loanNo = settleLoan.loanId
      this.settleAmount = settleLoan.loanvalue
      this.outStanding = settleLoan.outstanding
      this.getSelectedLoan(settleLoan.loanId)
      this.getSelectedSettlementList(settleLoan.loanId)
    } else {
      // Handle the case where the data is not found in local storage
      console.log('Data not found in local storage');
    }
  }
  getSelectedLoan(loanId: any): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.loanService.getSelectedloan(loanId).subscribe(
        (data: any) => {
          console.log('selected loan', data);
          this.applicantControl.setValue(this.retrieveData(data[0].empid, 'applicant'));
          this.empId = data[0].empid;
          this.applyDate = this.splitAndSetDate(data[0].loandate);
          this.reason = data[0].reason;
          this.loanAmount = data[0].loanvalue;
          this.monthlyInstalment = data[0].monthlydeduction;
          this.settlemntperiod = data[0].noofinstallments;
          this.loanType = data[0].typeofloan;
          this.guaranteeControl1.setValue(this.retrieveData(data[0].garanteeid1, 'g1'))
          this.gurantee1 = data[0].garanteeid1
          this.gurantee2 = data[0].garanteeid2
          this.guaranteeControl2.setValue(this.retrieveData(data[0].garanteeid2, 'g1'))
          localStorage.setItem('settleLoan', '');
          resolve();
        },
        (error: any) => {
          console.error('Error fetching salary months:', error);
          reject(error); // Reject the Promise if there's an error
        }
      );
    });
  }
  getSelectedSettlementList  (loaiId: any): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      // this.isLoading = true;
      let resp = this.loanService.getSelectedSettlementList(loaiId);
      resp.subscribe((data: any) => {
        ELEMENT_DATA = new Array()
        console.log("settlement list",data);
        let count=0;
        data.map((data: any) => {
          count++;
          ELEMENT_DATA.push({
            id: count,
            deductMonth: data.monthcode,
            remark: data.paymode,
            deductAmount: data.monthlyamount,
            
          })

        })
        this.settleLoanoadDataSource = new MatTableDataSource(ELEMENT_DATA);
        resolve()
        // this.isLoading = false
      })
    });

  }
  splitAndSetDate(dateString: any) {
    const dateParts = dateString.split('-');

    // Create a JavaScript Date object using the date parts
    return new Date(+dateParts[2], +dateParts[1] - 1, +dateParts[0]);
  }
  retrieveData(data: any, type: any) {
    if (type === 'g1') {
      console.log('g1 : ', data);

      const match = this.applicantOption.find(item => item.empid === data);
      console.log('match ', match);
      // this.gurantee1 = match?.empCode

      return match ? match.name : '';
    }
    if (type === 'applicant') {

      const match = this.applicantOption.find(item => item.empid === data);
      console.log('match ', match);
      // this.gurantee1 = match?.empCode
      this.considerateSalary = match?.salary
      return match ? match.name : '';
    }
    return '';
  }
  getAllSalaryMonths(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.salarymonthService.getSalaryMonthList().subscribe(
        (data: any) => {
          console.log('salary months:', data);
          this.months = data.map((item: any) => {
            return {
              name: item.monthcode,
              code: item.monthcode
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
  onKeyUpGurantee1() {
    const match = this.applicantOption.find(item => item.name === this.guaranteeControl1.value);
    console.log('match ', match);
    this.gurantee1 = match?.empid

    console.log("bank name : ", match ? match.empid : '');
  }
  onKeyUpGurantee2() {
    const match = this.applicantOption.find(item => item.name === this.guaranteeControl2.value);
    console.log('match ', match);
    this.gurantee2 = match?.empid

    console.log("bank name : ", match ? match.empid : '');
  }
  onKeyUp() {
    const match = this.applicantOption.find(item => item.name === this.applicantControl.value);
    console.log('match ', match);
    this.empId = match?.empid
    this.considerateSalary = match?.salary * 6
    console.log("emp code : ", match ? match.salary : '');
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
          this.applicantOption = data.map((employeeData: any) => ({
            name: employeeData.empinitialname,
            empCode: employeeData.empcode,
            division: employeeData.division,
            empid: employeeData.empid,
            salary: employeeData.salary
          }));

          console.log(this.applicantOption);

          resolve();
        },
        (error: any) => {
          console.error("Error fetching employees:", error);
          reject();
        }
      );
    });
  }
  cancelLoan() {
    this.clearForm()
    this.router.navigate(['home/loanManager']);

  }


  closeLoan() {
    this.router.navigate(['home/loanManager']);

  }
  settleLoan(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const loan = {
        loanid: this.loanNo,
        settlementdate: this.loanSettleDate,
        settlementamount: this.settleAmount,
        settlementnote: this.specialNote,
        // monthlydeduction: this.monthlyInstalment,
        // deductfrom: '',
        // noofinstallments: this.settlemntperiod,
        // garanteeid1: this.gurantee1,
        // garanteeid2: this.gurantee2,
        empid: this.empId,
        // typeofloan: this.loanType,

      }
      console.log(loan);
      try {
        let reps = this.loanService.settleLoan(loan);
        reps.subscribe((data: any) => {
          console.log(data);
          if (data.type === 'error') {
            this.showAlert(data.message, 'red')
          } else {
            this.clearForm()
            this.showAlert(data.message, 'green')
          }
        })
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }


  newLoan(): Promise<void> {
    return new Promise<void>((resolve, reject) => {

      if ((this.gurantee1 == this.gurantee2) || this.empId == this.gurantee1 || this.empId == this.gurantee2) {
        this.showAlert("Employee And Gurantee Could not be Same..!", 'red')
        return
      }
      if (!this.loanType) {
        this.showAlert('Select Loan Type..!', 'red');
        return
      }
      if (!this.applyDate) {
        this.showAlert('Select Loan Date..!', 'red');
        return
      }
      if (!this.selectedMonth) {
        this.showAlert('Select Salary Month..!', 'red');
        return
      }
      if (!this.loanAmount) {
        this.showAlert('Fill Loan Amount..!', 'red');
        return
      }
      if (!this.settlemntperiod) {
        this.showAlert('Fill Settlement Period..!', 'red');
        return
      } if (!this.monthlyInstalment) {
        this.showAlert('Fill Monthly Instalment..!', 'red');
        return
      } if (!this.gurantee2) {
        this.showAlert('Fill Gurantee One..!', 'red');
        return
      }
      if (!this.gurantee1) {
        this.showAlert('Fill Gurantee Two..!', 'red');
        return
      }
      if (!this.reason) {
        this.showAlert('Fill Reason Filed..!', 'red');
        return
      }


      const loan = {
        loanid: this.loanNo,
        loandate: this.applyDate,
        loanvalue: this.loanAmount,
        reason: this.reason,
        monthlydeduction: this.monthlyInstalment,
        deductfrom: this.selectedMonth,
        noofinstallments: this.settlemntperiod,
        garanteeid1: this.gurantee1,
        garanteeid2: this.gurantee2,
        empid: this.empId,
        typeofloan: this.loanType,

      }
      console.log(loan);
      try {
        let reps = this.loanService.saveLoan(loan);
        reps.subscribe((data: any) => {
          console.log(data);
          if (data.type === 'error') {
            this.showAlert(data.message, 'red')
          } else {
            this.clearForm()
            this.showAlert(data.message, 'green')
          }

        })
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }
  clearForm() {
    this.loanAmount = null;
    this.loanType = null
    this.loanNo = 0;

    this.applicantControl.setValue('');
    this.loanAmount = null;
    this.empId = null;
    // this.specialNote = null
    this.guaranteeControl1.setValue('');
    this.guaranteeControl2.setValue('');
    this.applyDate = ''
    this.gurantee1 = null
    this.gurantee2 = null
    this.reason = null;
    this.monthlyInstalment = null
    this.settlemntperiod = null
    this.considerateSalary = null
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
  // showDeleteConfirmation(element: any) {
  //   Swal.fire({
  //     title: 'Are you sure that ou want to delete this record ?',
  //     // text: 'You will not be able to recover this data!',
  //     icon: 'warning',
  //     // color: 'red',
  //     showCancelButton: true,
  //     confirmButtonText: 'Delete',
  //     cancelButtonText: 'Cancel',
  //   }).then((result) => {
  //     if (result.value) {
  //       // Handle the delete action here
  //       this.deleteData(element);
  //     }
  //   });
  // }
}
