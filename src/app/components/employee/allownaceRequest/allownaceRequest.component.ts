import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable, map, startWith } from 'rxjs';
import { AllowanceService } from 'src/app/service/allowance-service/allowance.service';
import { EmployeeService } from 'src/app/service/employee/employee.service';
import { NonCashService } from 'src/app/service/nonCash-service/nonCash.service';
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
interface Allowance {
  name: string;
  code: string;
 
}
export interface PeriodicElement {
  id?: string;
  employeeName?: string;
  epf?: string;
  allowance?: string;
  month?: string;
  amount?: string;
  empId?: string;
  division: string;
}

let ELEMENT_DATA: PeriodicElement[] = [

]

@Component({
  selector: 'app-allownaceRequest',
  templateUrl: './allownaceRequest.component.html',
  styleUrls: ['./allownaceRequest.component.scss']
})
export class AllownaceRequestComponent implements OnInit {
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
  allowType: any = 'Noncash';

  allowTypes: string[] = ['Noncash', 'Allowance']
  constructor(private nonCashService: NonCashService, private allowanceService: AllowanceService, private router: Router, private employeeService: EmployeeService, private salarymonthService: SalaryMonthService, private allowReqService: AllowanceService) {
    this.filteredEmployees = this.employeeControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterEmployees(value))
    );
  }
  allowances: Allowance[] = []
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
    this.getAllNonCash()
    console.log(currentMonth);
    console.log(currentYear);
    console.log(monthCode);
    this.selectedMonth = monthCode
    this.getAllEmployee()
    await this.getAllSalaryMonths()
    this.onActionAnable(this.selectedMonth)
    this.getAllAllowReq(monthCode, this.allowType)
    // this.getAllAllowanceList(monthCode)
  }
  onActionAnableAllowtype(allowType: any) {
    console.log('allowType ', allowType);
    if (this.allowType === 'Noncash') {
      this.getAllNonCash()

    }
    else if (this.allowType == 'Allowance') {
      this.getAllAllowances()

    }
    this.onActionAnable(allowType)
    // this.onSearchKeyup(month)

    const filteredMonths = this.months.filter(item => item.code === allowType);

    // if (filteredMonths.length > 0) {
    //   console.log('Match found:', filteredMonths[0]);
    //   console.log("month name:", filteredMonths[0].name);
    //   console.log("month runpayroll:", filteredMonths[0].runpayroll);
    //   console.log("month stopallowance:", filteredMonths[0].stopallowance);
    //   // 
    //   if (!filteredMonths[0].runpayroll && !filteredMonths[0].stopallowance) {
    //     console.log('action anable');
    //     this.setAction = false;
    //   } else {
    //     console.log('action disable');
    //     this.setAction = true;
    //   }
    // } else {
    //   console.log('No match found.');
    // }
  }

  onActionAnable(month: any) {
    console.log('month ', month);
    this.getAllAllowReq(this.selectedMonth, this.allowType)
    this.onSearchKeyup(month)

    const filteredMonths = this.months.filter(item => item.code === month);

    // if (filteredMonths.length > 0) {
    //   console.log('Match found:', filteredMonths[0]);
    //   console.log("month name:", filteredMonths[0].name);
    //   console.log("month runpayroll:", filteredMonths[0].runpayroll);
    //   console.log("month stopallowance:", filteredMonths[0].stopallowance);
    //   // 
    //   if (!filteredMonths[0].runpayroll && !filteredMonths[0].stopallowance) {
    //     console.log('action anable');
    //     this.setAction = false;
    //   } else {
    //     console.log('action disable');
    //     this.setAction = true;
    //   }
    // } else {
    //   console.log('No match found.');
    // }
  }

  private _filterEmployees(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.employees
      .filter(employee => employee.name.toLowerCase().includes(filterValue))
      .map(employee => employee.name);
  }

  getAllNonCash(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      try {
        let reps = this.nonCashService.getNonCashList();
        reps.subscribe((data: any) => {
          console.log('noncash list:', data);
          if (data[0] !== null) {
            this.allowances = [];
            const nonCashFields = 10; // Number of noncash fields
  
            for (let i = 1; i <= nonCashFields; i++) {
              const nonCashKey = `noncash${i}`;
              if (data[0][nonCashKey] !== null && data[0][nonCashKey] !== '') {
                const allowanceObject = {
                  name: data[0][nonCashKey],
                  code: nonCashKey
                };
                this.allowances.push(allowanceObject);
              }
            }
          }
          resolve();
        });
      } catch (error) {
        reject(error);
      }
    });
  }
  

  getAllAllowances(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      try {
        let reps = this.allowanceService.getAllowanceList();
        reps.subscribe((data: any) => {
          console.log('allowances list : ', data[0]);
          console.log(data);
          if (data[0] != null) {
            this.allowances = []; // Reset the allowances array
  
            const allowanceData = data[0]; // Assuming data[0] contains the allowances
  
            // Create an array of allowances with 'name' and 'code' properties
            const allowanceKeys = ['allow1', 'allow2', 'allow3', 'allow4', 'allow5'];
            allowanceKeys.forEach((allowanceKey) => {
              const statusKey = `${allowanceKey}_status`;
              const allowanceValue = allowanceData[allowanceKey];
              const statusValue = allowanceData[statusKey];
  
              if (allowanceValue !== null && allowanceValue !== '' && !statusValue) {
                const allowanceObject: Allowance = {
                  name: allowanceValue,
                  code: allowanceKey
                };
                this.allowances.push(allowanceObject);
              }
            });
          }
          resolve();
        });
      } catch (error) {
        reject(error);
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
  getAllEmployee(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      console.log("Getting all employees");
      this.isLoading = true;

      let resp = this.employeeService.getEmployeeList('ABC');
      resp.subscribe(
        (data: any) => {
          // console.clear()

          // Filter and map the data to Employee objects
          this.employees = data.map((employeeData: any) => ({
            name: employeeData.empinitialname,
            empCode: employeeData.empcode,
            division: employeeData.division,
            empid: employeeData.empid
          }));

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
    if (this.employeeControl.value && this.empId) {
      this.onSearchKeyup(this.employeeControl.value)

    } else if (this.selectedAllow) {

      // this.onSearchKeyup(this.selectedAllow)
    }
  }

  getServerData($event: PageEvent) {
    throw new Error('Method not implemented.');
  }
  // onSearchKeyup() {
  //   throw new Error('Method not implemented.');
  // }

  onSearchKeyup(event: any) {

    const filterValue = event;
    this.serviceAllowancesDataSource.filter = filterValue.trim().toLowerCase();

  }
  getAllAllowReq(monthCode: any, allowType: any): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.isLoading = true;
      let type;
      if (allowType = 'Noncash') {
        type = 'N';
      } else if (allowType = 'Allowance') {
        type = 'A';

      }
      let resp = this.allowReqService.getAllAllowanceReq(monthCode, type);
      resp.subscribe(
        (data: any) => {
          // console.clear()
          console.log('all allowReq  list', data);
          ELEMENT_DATA = new Array()
          data.map((data: any) => {
            ELEMENT_DATA.push({
              id: data.id,
              empId: data.empid,
              epf: data.empcode,
              employeeName: data.empname,
              amount: data.amount,
              allowance: data.allowancecode,
              division: data.division
            })



          })
          this.serviceAllowancesDataSource = new MatTableDataSource(ELEMENT_DATA);
console.log(ELEMENT_DATA);

          this.isLoading = false;
          // console.log(this.employees);
          resolve();
        },
        (error: any) => {
          console.error("Error fetching employees:", error);
          reject();
        }
      );
    });
  }

  //   getAllAllowanceList(monthCode:any): Promise<void> {
  //     return new Promise<void>((resolve, reject) => {
  //       this.isLoading = true;
  // console.log("all data");

  //       let resp = this.allowReqService.getAllowanceList();
  //       resp.subscribe((data: any) => {
  //         console.table(data);


  //         this.isLoading = false;

  //       })
  //     })
  //   }

  save(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (!this.allowType) {
        this.showAlert('Select a Allowance Type...!', 'red');
        return
      }
      if (!this.selectedMonth) {
        this.showAlert('Select a Month...!', 'red');
        return

      } if (!this.selectedAllow) {
        this.showAlert('Select a Allowance...!', 'red');
        return
      }
      if (!this.employeeControl.value) {
        this.showAlert('Fill Employee Name...!', 'red');
        return
      } if (!this.amount) {
        this.showAlert('Fill Amount...!', 'red');
        return
      }
      let type;
      if (this.allowType = 'Noncash') {
        type = 'N';
      } else if (this.allowType = 'Allowance') {
        type = 'A';

      }
      const allow = {

        id: this.id,
        reqType: type,

        empid: this.empId,
        monthCode: this.selectedMonth,
        allowancecode: this.selectedAllow,
        amount: this.amount
      }
      if (allow) [
        this.isLoading = true

      ]
      console.log(allow);
      let resp = this.allowReqService.saveAllowanceReq(allow);
      resp.subscribe(
        (data: any) => {
          // console.clear()
          console.log(allow);

          console.log(data);
          if (data.type === 'error') {
            this.showAlert(data.message, 'red')
          } else {
            this.showAlert(data.message, 'green')
            // window.location.reload()
            this.clearForm()
            this.getAllAllowReq(this.selectedMonth,this.allowType)
          }

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
  clearForm() {
    this.employeeControl.setValue('');
    this.amount = null;
    this.empId = 0;
    this.selectedAllow = ''
  }

  isActive(element: any): boolean {
    return element.activeStatus;
  }
  retrieveData(type: any, code: any): any {

    if (type === 'emp') {


      const match = this.employees.find(item => item.empCode === code);
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
    console.log('update', element);

    this.id = element.id
    this.selectedAllow = element.allowance;
    console.log(element);
    this.employeeControl.setValue(this.retrieveData('emp', element.epf))
    this.amount = element.amount;
    // this.onKeyUp()
    this.empId = element.empId
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
        if (data.type === 'error') {
          this.showAlert(data.message, 'red')
        } else {
          this.showAlert(data.message, 'green')
          this.getAllAllowReq(this.selectedMonth,this.allowType)
        }
        this.isLoading = false;

      })
    })
  }
  cancel() {
    this.clearForm()

  }
}
