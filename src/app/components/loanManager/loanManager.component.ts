import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { LoanManagerService } from 'src/app/service/loanManagerService/loanManager.service';


export interface PeriodicElement {
  id?: string;
  name?: string;
  epf?: string;
  loanId?: string;
  loanType?: string;
  value?: string;
  period?: string;
  monthlyDeduction?: string;
  balance?: any;
  designation?: string;
  outstanding?: string;


}

let ELEMENT_DATA: PeriodicElement[] = [

];


@Component({
  selector: 'app-loanManager',
  templateUrl: './loanManager.component.html',
  styleUrls: ['./loanManager.component.scss']
})
export class LoanManagerComponent implements OnInit {

  length!: number;
  pageIndex: number = 0;
  pageSize: number = 10;
  displayLoan: string[] = ['name', 'empId', 'epf', 'loanId', 'loanType', 'value', 'period', 'monthlyDeduction', 'balance', 'action'];
  loadDataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  isLoading: boolean = false;



  constructor(private router: Router, private loanManagerService: LoanManagerService) { }
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
    this.getAllLoanList('0')
  }

  getAllLoanList(setoff: any): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.isLoading = true;
      let resp = this.loanManagerService.getLoanList(setoff);
      resp.subscribe((data: any) => {
        ELEMENT_DATA = new Array()
        console.log(data);
        data.map((data: any) => {
          ELEMENT_DATA.push({
            id: data.empid,
            epf: data.empcode,
            name: data.empname,
            loanId: data.loanid,
            value: data.loanvalue,
            monthlyDeduction: data.monthlydeduction,
            period: data.noofinstallments,
            loanType: data.typeofloan,
            balance: data.outstanding,
            outstanding:data.outstanding
          })

        })
        this.loadDataSource = new MatTableDataSource(ELEMENT_DATA);
        resolve()
        this.isLoading = false
      })
    });

  }
  
  getServerData($event: PageEvent) {
    throw new Error('Method not implemented.');
  }
  updateData(element: any) {
    const settleLoan={
      loanId:element.loanId,
      outstanding:element.outstanding,
      loanvalue:element.value,

    }
    const jsonString = JSON.stringify(settleLoan);
    localStorage.setItem('settleLoan', jsonString)
    console.log(jsonString);
    
    this.router.navigate(['home/newLoan']);

  }
  searchLoan: any;
  settledLoans() {
    throw new Error('Method not implemented.');
  }
  viewNotSettledLoans() {
    this.getAllLoanList('0')
  }
  viewSettledLoans() {
    this.getAllLoanList('1')
  }
  newLoan() {
    this.router.navigate(['home/newLoan']);
    localStorage.setItem('label', 'Loan Registration')
  }
}
