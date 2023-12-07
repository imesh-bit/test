import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AllowanceService } from 'src/app/service/allowance-service/allowance.service';
import { DeductionService } from 'src/app/service/deduction-service/deduction.service';
import { PayRollService } from 'src/app/service/payRoll/payRoll.service';
import Swal from 'sweetalert2';
interface LoadData {
  name: any;
  code: any;
  runpayroll: any;
  stopallowance: any;
  stopattendance: any;
}
@Component({
  selector: 'app-salaryEdit',
  templateUrl: './salaryEdit.component.html',
  styleUrls: ['./salaryEdit.component.scss']
})
export class SalaryEditComponent implements OnInit {
  noneCashbenifit?: number;
  bonus?: number;
  salaryCut?: number;
  salaryAdvance?: number;
  aRIT?: number;
  occupationGroup: any;
  empType: any;
  noOfAttendingDates?: number;
  remark: any;


  basicSalary?: number;
  salary?: number;
  noPayValue?: number;
  budgetAllow1?: number;
  budgetAllow2?: number;
  overPayment?: number;
  loan?: number;
  leavePayment?: number;
  payeTax?: number;
  epf?: number;
  holidayPayments?: number;
  totalForEpr?: number;
  directPay?: number;
  incentive?: number;
  shiftPayment?: number;
  allow1?: number;
  allow2?: number;
  allow3?: number;
  allow4?: number;
  allow5: any;
  Allow1: any = "Allow 1";
  Allow2: any = "Allow 2";
  Allow3: any = "Allow 3";
  Allow4: any = "Allow 4";
  Allow5: any = "Allow 5";
  nonCash1?: number;
  nonCash2?: number;
  nonCash3?: number;
  nonCash4?: number;
  nonCash5?: number;
  nonCash6?: number;
  nonCash7?: number;
  nonCash8?: number;
  nonCash9?: number;
  nonCash10?: number;
  nonCashLabel1: any = "NonCash 1";
  nonCashLabel2: any = "NonCash 2";
  nonCashLabel3: any = "NonCash 3";
  nonCashLabel4: any = "NonCash 4";
  nonCashLabel5: any = "NonCash 5";
  nonCashLabel6: any = "NonCash 6";
  nonCashLabel7: any = "NonCash 7";
  nonCashLabel8: any = "NonCash 8";
  nonCashLabel9: any = "NonCash 9";
  nonCashLabel10: any = "NonCash 10";

  otHM: any;
  otArreas: any;
  extraOt: any;
  totalEarning?: number;
  grossSalary?: number;
  Deduct1: any = "Deduct 1";
  deduct1?: number;
  Deduct5: any = "Deduct 5";
  deduct5?: number;
  deduct4?: number;
  Deduct4: any = "Deduct 4";
  deduct3?: number;
  Deduct3: any = "Deduct 3";
  deduct2?: number;
  Deduct2: any = "Deduct 2";
  totalDeduction?: number;
  netSalary?: number;
  name: any;
  empCode?: number;
  designation: any;
  division: any;
  category: any;
  costType: any;
  providentFund?: number;
  trustFund?: number;
  bankOne: any;
  accountNo1?: number;
  amount1?: number;
  bankTwo: any;
  accountNo2?: number;
  amount2?: number;
  selectedMonth: any;
  empId: any;
  nopaydates: any;
  months: LoadData[] = [];
  setAction: boolean = true;

  constructor(private router: Router, private payRollService: PayRollService, private allowanceService: AllowanceService, private dedudctionService: DeductionService) {

  }

  currentYear?: any;
  currentMonth?: any;
  monthCode?: any;

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
    // this.getAllAllowances()
    // this.getAllDeductions()
    if (localStorage.getItem('monthCode') && localStorage.getItem('salaryID') && localStorage.getItem('monthCode') != '' && localStorage.getItem('salaryID') != '') {
      console.log(localStorage.getItem('monthCode'));
      console.log(localStorage.getItem('salaryID'));
      this.getSelectedEmployeePayrollData(localStorage.getItem('monthCode'), localStorage.getItem('salaryID'))
    }
  }
  getSelectedEmployeePayrollData(monthCode: any, empid: any): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      // this.isLoading = true;
      this.payRollService.getSelectedEmployeePayrollData(monthCode, empid).subscribe(
        (data: any) => {
          console.log('employee payroll data salary edit:', data);
          data.map((data: any) => {
            let al1, al2, al3, al4, al5;

            al1 = !data.allow1name || data.allow1name.trim() === "" ? "Allow 1" : data.allow1name;
            al2 = !data.allow2name || data.allow2name.trim() === "" ? "Allow 2" : data.allow2name;
            al3 = !data.allow3name || data.allow3name.trim() === "" ? "Allow 3" : data.allow3name;
            al4 = !data.allow4name || data.allow4name.trim() === "" ? "Allow 4" : data.allow4name;
            al5 = !data.allow5name || data.allow5name.trim() === "" ? "Allow 5" : data.allow5name;

            let d1, d2, d3, d4, d5;

            d1 = !data.deduct1name || data.deduct1name.trim() === "" ? "Deduct 1" : data.deduct1name;
            d2 = !data.deduct2name || data.deduct2name.trim() === "" ? "Deduct 2" : data.deduct2name;
            d3 = !data.deduct3name || data.deduct3name.trim() === "" ? "Deduct 3" : data.deduct3name;
            d4 = !data.deduct4name || data.deduct4name.trim() === "" ? "Deduct 4" : data.deduct4name;
            d5 = !data.deduct5name || data.deduct5name.trim() === "" ? "Deduct 5" : data.deduct5name;

            let n1, n2, n3, n4, n5, n6, n7, n8, n9, n10;

            n1 = !data.noncash1_name || data.noncash1_name.trim() === "" ? "NonCash 1" : data.noncash1_name;
            n2 = !data.noncash2_name || data.noncash2_name.trim() === "" ? "NonCash 2" : data.noncash2_name;
            n3 = !data.noncash3_name || data.noncash3_name.trim() === "" ? "NonCash 3" : data.noncash3_name;
            n4 = !data.noncash4_name || data.noncash4_name.trim() === "" ? "NonCash 4" : data.noncash4_name;
            n5 = !data.noncash5_name || data.noncash5_name.trim() === "" ? "NonCash 5" : data.noncash5_name;
            n6 = !data.noncash6_name || data.noncash6_name.trim() === "" ? "NonCash 6" : data.noncash6_name;
            n7 = !data.noncash7_name || data.noncash7_name.trim() === "" ? "NonCash 7" : data.noncash7_name;
            n8 = !data.noncash8_name || data.noncash8_name.trim() === "" ? "NonCash 8" : data.noncash8_name;
            n9 = !data.noncash9_name || data.noncash9_name.trim() === "" ? "NonCash 9" : data.noncash9_name;
            n10 = !data.noncash10_name || data.noncash10_name.trim() === "" ? "NonCash 10" : data.noncash10_name;




            this.accountNo1 = data.accno1;
            this.accountNo2 = data.accno2;
            this.allow1 = data.allow1;
            this.Allow1 = al1;
            this.allow2 = data.allow2;
            this.Allow2 = al2;
            this.allow3 = data.allow3;
            this.Allow3 = al3;
            this.allow4 = data.allow4;
            this.Allow4 = al4;
            this.allow5 = data.allow5;
            this.Allow5 = al5;
            this.amount1 = data.amount1;
            this.amount2 = data.amount2;
            this.bankOne = data.bank1;
            this.bankTwo = data.bank2;
            this.salary = data.basicarreas;
            this.basicSalary = data.basicsalary;
            this.bonus = data.bonus;
            this.budgetAllow2 = data.bra2;
            this.budgetAllow1 = data.budgetallowance;
            this.category = data.categoryname;
            this.deduct1 = data.deduct1;
            this.Deduct1 = d1;
            this.deduct2 = data.deduct2;
            this.Deduct2 = d2;
            this.deduct3 = data.deduct3;
            this.Deduct3 = d3;
            this.deduct4 = data.deduct4;
            this.Deduct4 = d4;
            this.deduct5 = data.deduct5;
            this.Deduct5 = d5;
            this.designation = data.designation;
            this.division = data.division;
            this.empCode = data.empcode;
            this.empId = data.empid;
            this.name = data.empname;
            this.epf = data.epf8;
            this.providentFund = data.epf12;
            this.trustFund = data.etf;
            this.grossSalary = data.grossalary;
            this.occupationGroup = data.groupname;
            this.loan = data.loanvalue;
            this.selectedMonth = data.monthcode;
            this.netSalary = data.netsalary;
            this.nonCash1 = data.noncash1;
            this.nonCashLabel1 = n1;
            this.nonCash2 = data.noncash2;
            this.nonCashLabel2 = n2;
            this.nonCash3 = data.noncash3;
            this.nonCashLabel3 = n3;
            this.nonCash4 = data.noncash4;
            this.nonCashLabel4 = n4;
            this.nonCash5 = data.noncash5;
            this.nonCashLabel5 = n5;
            this.nonCash6 = data.noncash6;
            this.nonCashLabel6 = n6;
            this.nonCash7 = data.noncash7;
            this.nonCashLabel7 = n7;
            this.nonCash8 = data.noncash8;
            this.nonCashLabel8 = n8;
            this.nonCash9 = data.noncash9;
            this.nonCashLabel9 = n9;
            this.nonCash10 = data.noncash10;
            this.nonCashLabel10 = n10;
            this.noOfAttendingDates = data.noofattendents;
            this.noPayValue = data.nopay;
            this.overPayment = data.otpay;
            this.salaryCut = data.paycut;

            this.salaryAdvance = data.saladvance;
            this.empType = data.typofemp
            this.nopaydates = data.nopaydates;
            this.aRIT=data.paye
          })
          this.calculate()
          localStorage.setItem('monthCode', '');
          localStorage.setItem('salaryID', '')
          resolve();

        },
        (error: any) => {
          console.error('Error fetching payroll data:', error);
          reject(error);
        }
      );
    });
  }
  calculate() {
    let totaEPR: number = 0;
    if (this.basicSalary != undefined) {
      totaEPR = totaEPR + this.basicSalary
    }
    if (this.salary != undefined) {
      totaEPR = totaEPR + this.salary
    }
    if (this.budgetAllow1 != undefined) {
      totaEPR = totaEPR + this.budgetAllow1
    }
    if (this.budgetAllow2 != undefined) {
      totaEPR = totaEPR + this.budgetAllow2
    }
    if (this.allow3 != undefined) {
      totaEPR = totaEPR + this.allow3
    }
    // this.totalForEpr=this.basicSalary+this.salary+this.budgetAllow1+this.budgetAllow2+this.leavePayment
    if (totaEPR != 0) {
      this.totalForEpr = totaEPR
    }
    console.log(this.totalForEpr);

    // -------------------------------------

    let totaldeduc = 0;
    if (this.salaryCut != undefined) {
      totaldeduc = totaEPR + this.salaryCut
    }
    if (this.noPayValue != undefined) {
      totaldeduc = totaEPR + this.noPayValue
    } if (this.salaryAdvance != undefined) {
      totaldeduc = totaEPR + this.salaryAdvance
    } if (this.loan != undefined) {
      totaldeduc = totaEPR + this.loan
    } if (this.aRIT != undefined) {
      totaldeduc = totaEPR + this.aRIT
    } if (this.epf != undefined) {
      totaldeduc = totaEPR + this.epf
    } if (this.deduct1 != undefined) {
      totaldeduc = totaEPR + this.deduct1
    } if (this.deduct2 != undefined) {
      totaldeduc = totaEPR + this.deduct2
    } if (this.deduct3 != undefined) {
      totaldeduc = totaEPR + this.deduct3
    } if (this.deduct4 != undefined) {
      totaldeduc = totaEPR + this.deduct4
    } if (this.deduct5 != undefined) {
      totaldeduc = totaEPR + this.deduct5
    }
    this.totalDeduction = totaldeduc
  }

  getAllAllowances(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      try {


        let reps = this.allowanceService.getAllowanceList();
        reps.subscribe((data: any) => {
          console.log('allowances list : ', data);
          console.log(data[0]);
          if (data[0] != null) {
            if (data[0].allow1 != null || data[0].allow1 != '') {
              this.Allow1 = data[0].allow1

            } if (data[0].allow2 != null || data[0].allow2 != '') {
              this.Allow2 = data[0].allow2

            } if (data[0].allow3 != null || data[0].allow2 != '') {
              this.Allow3 = data[0].allow3

            } if (data[0].allow4 != null || data[0].allow4 != '') {
              this.Allow4 = data[0].allow4

            } if (data[0].allow5 != null || data[0].allow5 != '') {
              this.Allow5 = data[0].allow5

            }
          }

        })
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  save(): Promise<void> {
    return new Promise<void>((resolve, reject) => {

      if (this.remark == null || this.remark == "") {
        this.showAlert('Remark Could Not Empty', 'red')
        return;
      }
      const payroll = {
        monthCode: this.selectedMonth,
        empID: this.empId,
        basicSal: this.basicSalary,
        salArreas: this.salary,
        NoPay: this.noPayValue,
        nopaydates: this.nopaydates,
        otpay: this.overPayment,
        remark: this.remark
      }
      try {
        let reps = this.payRollService.savePayroll(payroll);
        reps.subscribe((data: any) => {
          console.log('deduction list : ', data);
          console.log(data[0]);
          if (data.type == 'error') {
            this.showAlert(data.message, 'red')
          } else {
            this.showAlert(data.message, 'green')
          }
        })
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  getAllDeductions(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      try {
        let reps = this.dedudctionService.getDeductionList();
        reps.subscribe((data: any) => {
          console.log('deduction list : ', data);
          console.log(data[0]);

          if (data[0] != null) {
            if (data[0].deduct1 != null || data[0].deduct1 != '') {
              this.Deduct1 = data[0].deduct1

            } if (data[0].deduct2 != null || data[0].deduct2 != '') {
              this.Deduct2 = data[0].deduct2

            } if (data[0].deduct3 != null || data[0].deduct3 != '') {
              this.Deduct3 = data[0].deduct3

            } if (data[0].deduct4 != null || data[0].deduct4 != '') {
              this.Deduct4 = data[0].deduct4

            } if (data[0].deduct5 != null || data[0].deduct5 != '') {
              this.Deduct5 = data[0].deduct5

            }
          }
        })
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }
  onActionAnable(month: any) {
    console.log('month ', month);

    const filteredMonths = this.months.filter(item => item.code === month);

    if (filteredMonths.length > 0) {
      console.log('Match found:', filteredMonths[0]);
      console.log("emp name:", filteredMonths[0].name);
      if (filteredMonths[0].runpayroll && filteredMonths[0].stopattendance) {
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

  close() {
    this.router.navigate(['home/payroll']);
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
