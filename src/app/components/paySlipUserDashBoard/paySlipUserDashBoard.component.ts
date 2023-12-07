import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-paySlipUserDashBoard',
  templateUrl: './paySlipUserDashBoard.component.html',
  styleUrls: ['./paySlipUserDashBoard.component.scss']
})
export class PaySlipUserDashBoardComponent implements OnInit {

  constructor(private router: Router,) { }

  ngOnInit() {
    localStorage.setItem('label', 'Dash Board');
  }

  viewSalarySlip() {
    this.router.navigate(['/home/salaryslip']);

  }
}
