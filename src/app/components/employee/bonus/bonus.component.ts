import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable, startWith, map } from 'rxjs';
import { AllowanceService } from 'src/app/service/allowance-service/allowance.service';
import { BonusService } from 'src/app/service/bonus-service/bonus.service';
import { EmployeeService } from 'src/app/service/employee/employee.service';
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
}
export interface PeriodicElement {
  id?: string;
  employeeName?: string;
  epf?: string;
  reference?: string;
  month?: string;
  amount?: string;
  empId?: string;
  division: string;
}

let ELEMENT_DATA: PeriodicElement[] = [

]

@Component({
  selector: 'app-bonus',
  templateUrl: './bonus.component.html',
  styleUrls: ['./bonus.component.scss']
})
export class BonusComponent implements OnInit {
  empId: any = 0;
  id: any = 0;
  selectedAllow: any;


  selectedMonth: any;
  months: LoadData[] = [

  ];
  employees: Employee[] = [

  ];

  length!: number;
  pageIndex: number = 0;
  pageSize: number = 10;
  displayedServiceAllowances: string[] = ['epf', 'employeeName', 'allowance', 'month', 'amount', 'action'];
  serviceAllowancesDataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  searchEmp: any;

  isLoading: boolean = false;
  filteredEmployees: Observable<string[]>;
  employeeControl = new FormControl();
  amount: any;
  setAction: boolean = true;
  constructor(private router: Router, private employeeService: EmployeeService, private salarymonthService: SalaryMonthService, private allowReqService: AllowanceService, private bonusService: BonusService) {
    this.filteredEmployees = this.employeeControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterEmployees(value))
    );
  }
  allowances: string[] = ['April Bonus', 'December Bonus']
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
    this.getAllEmployee()
    await this.getAllSalaryMonths()
    this.onActionAnable(this.selectedMonth)

    this.getAllBonusList()
  }
  onActionAnable(month: any) {
    console.log('month ', month);
    this.getAllBonusList()
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

          console.log(this.employees);
          this.isLoading = false;

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

    console.log("bank name : ", match ? match.empid : '');
  }

  getServerData($event: PageEvent) {
    throw new Error('Method not implemented.');
  }
  onSearchKeyup() {
    throw new Error('Method not implemented.');
  }




  getAllBonusList(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.isLoading = true;

      let resp = this.bonusService.getBonusList(this.selectedMonth);
      resp.subscribe((data: any) => {
        console.table('bonus data: ', data);
        ELEMENT_DATA = new Array()
        data.map((data: any) => {
          ELEMENT_DATA.push({
            id: data.id,
            division: data.division,
            empId: data.empid,
            employeeName: data.empname,
            reference: data.reference,
            epf: data.empcode,
            amount: data.amount
          })
        })
        this.serviceAllowancesDataSource = new MatTableDataSource(ELEMENT_DATA);
        this.isLoading = false;

      })
    })
  }

  save(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (!this.selectedMonth) {
        this.showAlert('Select a Month...!', 'red');
        return

      } if (!this.selectedAllow) {
        this.showAlert('Select a Bonus Refference...!', 'red');
        return
      }
      if (!this.employeeControl.value) {
        this.showAlert('Fill Employee Name...!', 'red');
        return
      } if (!this.amount) {
        this.showAlert('Fill Amount...!', 'red');
        return
      }
      const allow = {
        bonusid: this.id,
        empid: this.empId,
        monthCode: this.selectedMonth,
        reference: this.selectedAllow,
        amount: this.amount
      }
      if (allow) [
        this.isLoading = true

      ]
      console.log(allow);
      let resp = this.bonusService.saveBonus(allow);
      resp.subscribe(
        (data: any) => {
          if (data.message === 'error') {
            this.showAlert(data.message, 'red')

          } else {
            this.showAlert(data.message, 'green')
            // window.location.reload()
            this.clearForm()
            this.getAllBonusList()
          }
          this.isLoading = false;


          resolve();
        },
        (error: any) => {
          reject();
        }
      );
    });
  }
  clearForm() {
    this.employeeControl.setValue('');
    this.amount = null;
    this.empId = 0;
    this.selectedAllow = ''
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
  updateData(element: any) {
    this.id = element.id
    this.selectedAllow = element.reference;
    console.log(element);
    this.employeeControl.setValue(this.retrieveData('emp', element.employeeName))
    this.amount = element.amount;
    this.onKeyUp()
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
  deleteData(element: any): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const allow = {
        id: element.id,
        empid: element.empId,
        monthCode: this.selectedMonth,
        allowancecode: element.allowance,
        amount: element.amount
      }
      console.log(allow);
      this.isLoading = true;

      let resp = this.allowReqService.deleteAllowanceReq(allow);
      resp.subscribe(async (data: any) => {
        console.table(data);
        await this.showAlert(data.message, 'green')

        this.isLoading = false;

      })
    })
  }
  cancel() {
    this.clearForm()

  }

}
