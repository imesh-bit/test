import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataTransferService } from 'src/app/service/data-transfer-service/data-transfer.service';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],

})
export class EmployeeComponent implements OnInit {

  p1: boolean = true;
  p2: boolean = true;
  p3: boolean = true;
  p4: boolean = true;
  p5: boolean = true;
  p6: boolean = true;
  p7: boolean = true;
  p8: boolean = true;
  p9: boolean = true;
  p10: boolean = true;
  p11: boolean = true;
  p12: boolean = true;
  p13: boolean = true;
  p14: boolean = true;
  p15: boolean = true;
  p16: boolean = true;
  p17: boolean = true;
  p18: boolean = false;
  menuItems: any[] = [];




  isMenuOpen = false;
  constructor(private router: Router, private datatransferService: DataTransferService) {


  }


  ngOnInit() {
    setInterval(() => {
      const storedLabel = localStorage.getItem('label');
      if (storedLabel !== this.header) {
        this.header = storedLabel;
      }

      console.log("interval set");
      this.disableBrowserBackButton();
    }, 1000);
    // console.log(this.datatransferService.getData());
    this.setPermisions()
  }
  setPermisions() {
    const dataString = localStorage.getItem('data');
    if (dataString !== null) {
      console.log(dataString);
      const data = JSON.parse(dataString);
      const per = data.loginDetails[0]
      this.p1 = per.p1 !== true;
      this.p2 = per.p2 !== true;
      this.p3 = per.p3 !== true;
      this.p4 = per.p4 !== true;
      this.p5 = per.p5 !== true;
      this.p6 = per.p6 !== true;
      this.p7 = per.p7 !== true;
      this.p8 = per.p8 !== true;
      this.p9 = per.p9 !== true;
      this.p10 = per.p10 !== true;
      this.p11 = per.p11 !== true;
      this.p12 = per.p12 !== true;
      this.p13 = per.p13 !== true;
      this.p14 = per.p14 !== true;
      this.p15 = per.p15 !== true;
      this.p16 = per.p16 !== true;
      this.p17 = per.p17 !== true;
      this.p18 = per.p18 !== true;
      console.log(this.p3);
      let pr1 = false;
      let pr2 = false;
      let pr3 = false;
      let pr4 = false;
      let pr5 = false;
      let pr6 = false;
      if (this.p3 && this.p4 && this.p5 && this.p6 && this.p7 && this.p8 && this.p9 && this.p10) {
        pr1 = true;
      }
      console.log(this.p3);

      if (this.p12 && this.p13 && this.p14) [
        pr3 = true
      ]
      // if(this.p12&&this.p13&&this.p14){
      //   pr5=true;
      // }
      if (this.p16 && this.p17 && this.p18) {
        pr5 = true;
      }
      if (this.p1 && this.p2) {
        pr6 = true;
      }
      this.menuItems = [
        {
          label: 'Human Resource',
          icon: 'people',
          hidden: pr1,
          action: this.toggleMenu(),
          children: [

            { label: 'Employee Profile', link: '/home/employee', hidden: this.p3 },
            { label: 'Employee Inventory', link: '/home/inventry', hidden: this.p3 },
            { label: 'Wage Board', link: '/home/wageBoard', hidden: this.p4 },
            { label: 'Occupational Group', link: '/home/occupational', hidden: this.p5 },
            { label: 'Department', link: '/home/department', hidden: this.p6 },

            { label: 'Designation', link: '/home/positions', hidden: this.p7 },
            { label: 'Bank', link: '/home/bank', hidden: this.p8 },

            { label: 'Allownce & Deduction', link: '/home/allowance', hidden: this.p9 },
            { label: 'NonCash Benifit', link: '/home/nonecash', hidden: this.p9 },
            // { label: 'Termination', link: '/home/termination', hidden: this.p10 },


          ]
        },
        {
          label: 'Attendance',
          icon: 'event_note',
          hidden: this.p11,
          action: this.toggleMenu(),
          children: [

            { label: 'Attendance Resgistry', link: '/home/attendence', hidden: this.p11 },


          ]
        },
        {
          label: 'Request',
          icon: 'assignment',
          hidden: pr3,
          action: this.toggleMenu(),
          children: [

            { label: 'Allowance/Noncash Request', link: '/home/allownceRequest', hidden: this.p12 },
            { label: 'Salary Advance', link: '/home/salaryAllowance', hidden: this.p13 },
            { label: 'Bonus ', link: '/home/bonus', hidden: this.p14 },


          ]
        }, {
          label: 'Loan',
          icon: 'real_estate_agent',
          hidden: this.p15,
          action: this.toggleMenu(),
          children: [

            { label: 'Loan Manager', link: '/home/loanManager', hidden: this.p15 },
            // { label: 'Allownces Report', link: '/home/allowance' },


          ]

        },
        {
          label: 'Payroll',
          icon: 'payment',
          hidden: pr5,
          action: this.toggleMenu(),
          children: [

            { label: 'Payroll Month', link: '/home/payrollmonth', hidden: this.p16 },
            { label: 'Payroll', link: '/home/payroll', hidden: this.p17 },
            { label: 'Salary Slip', link: '/home/salaryslip', hidden: this.p18 },
            // { label: 'Allownces Report', link: '/home/allowance' },


          ]
        },
        {
          label: 'Tax',
          icon: 'attach_money',
          hidden: pr6,
          action: this.toggleMenu(),
          children: [

            { label: 'Tax Control', link: '/home/notFound', hidden: this.p2 },
            { label: 'EPF/ETF/PAYEE Summary', link: '/home/notFound', hidden: this.p2 },
            { label: 'EPF "C" From', link: '/home/notFound', hidden: this.p2 },
            { label: 'EPF/ETF Return', link: '/home/notFound', hidden: this.p2 },
            { label: '6th Month Return', link: '/home/notFound', hidden: this.p2 },
            { label: 'Certification of income Tax Deduction (T.10)', link: '/home/notFound', hidden: this.p2 },
            { label: 'PAYEE Sheduale (T.9A)', link: '/home/notFound', hidden: this.p2 },
            { label: 'Gratuity Provision', link: '/home/notFound', hidden: this.p2 },


          ]
        },
        {
          label: 'Control Panel',
          icon: 'settings',
          hidden: pr6,
          action: this.toggleMenu(),
          children: [

            { label: 'Users', link: '/home/user', hidden: this.p2 },
            { label: 'User Group', link: '/home/userGroup', hidden: this.p1 },


          ]
        },

      ];
    }
  }
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  disableBrowserBackButton() {
    window.history.pushState(null, '', window.location.href);
    // this.onPopState( window.history.pushState(null, '', window.location.href))
  }

  @HostListener('window:popstate', ['$event'])
  onPopState(event: any) {
    // When the user tries to navigate back using the browser's back button,
    // this event handler will be called.
    // You can prevent the action by pushing a new state again.
    window.history.pushState(null, '', window.location.href);
  }
  header: any
  setHeader(label: any) {
    console.log(label);
    this.header = label;
    localStorage.setItem('label', label);
    this.toggleMenu()

  }



  hideMenu: boolean = true;
  homeRoute() {

    console.log(localStorage.getItem('salUser'));

    if (localStorage.getItem('salUser') === 'no') {
      this.router.navigate(['/home/dashBoard'])
      this.hideMenu = false;
    } else {
      this.router.navigate(['/home/slipUser'])
    }
    this.header = 'Dash Board'
    localStorage.setItem('label', this.header);
  }


  logout() {
    localStorage.clear()
    this.router.navigate(['/login'])
    this.datatransferService.clearData()
    sessionStorage.clear()

  }
  changePassword() {

    this.header = 'Change Password'
    localStorage.setItem('label', this.header);
    this.router.navigate(['/home/changePassWord'])
  }
}
