import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ControllerService } from 'src/app/service/contorller_serivce/controller.service';
import Swal from 'sweetalert2';

export interface PeriodicElement {
  id?: string;
  menuType?: string;
  menu?: any;
  select?: boolean;
}
let ELEMENT_DATA: PeriodicElement[] = [
  { id: '1', menuType: 'create usergroups', select: false, menu: 'p1' },
  { id: '2', menuType: 'create users', select: false, menu: 'p2' },
  { id: '3', menuType: 'employee profile', select: false, menu: 'p3' },
  { id: '4', menuType: 'wage bord', select: false, menu: 'p4' },
  { id: '5', menuType: 'occupational group', select: false, menu: 'p5' },
  { id: '6', menuType: 'department', select: false, menu: 'p6' },
  { id: '7', menuType: 'designation', select: false, menu: 'p7' },
  { id: '8', menuType: 'bank', select: false, menu: 'p8' },
  { id: '9', menuType: 'allowance & deduction', select: false, menu: 'p9' },
  { id: '10', menuType: 'termination', select: false, menu: 'p10' },
  { id: '11', menuType: 'attendance registry', select: false, menu: 'p11' },
  { id: '12', menuType: 'allowance request', select: false, menu: 'p12' },
  { id: '13', menuType: 'salary advance', select: false, menu: 'p13' },
  { id: '14', menuType: 'bonus', select: false, menu: 'p14' },
  { id: '15', menuType: 'loan manager', select: false, menu: 'p15' },
  { id: '16', menuType: 'run payroll', select: false, menu: 'p16' },
  { id: '17', menuType: 'finalize payroll/cust create', select: false, menu: 'p17' },
  { id: '18', menuType: 'payslip', select: false, menu: 'p18' },
  
];
@Component({
  selector: 'app-userGroup',
  templateUrl: './userGroup.component.html',
  styleUrls: ['./userGroup.component.scss']
})
export class UserGroupComponent implements OnInit {

  addNewGroup: boolean = false;
  selectedGroup: any;
  userGroups: string[] = [

  ];

  length!: number;
  pageIndex: number = 0;
  pageSize: number = 10;
  displayedUserGroup: string[] = ['menuType', 'select'];
  userGroupDataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  employees: string[] = [
    'John Doe',
    'Jane Smith',
    'Bob Johnson',
    'Alice Williams',
  ];
  permisions: string[] = ['create usergroups', 'create users', 'employee profile', 'wage bord', 'occupational group', 'department', 'designation', 'bank', 'allowance & deduction', 'termination', 'attendance registry', 'allowance request', 'salary advance', 'bonus', 'loan manager', 'run payroll', 'finalize payroll/cust create', 'payslip']

  isLoading: boolean = false;
  empid: any;

  selectChecked!: boolean;
  userGroup = {
  };
  constructor(private controllerService: ControllerService) { }



  onRowSelect(element: any): void {
    console.log(element);
    this.selectChecked = element.select;
    console.log('row ', this.selectChecked);
    const pValues: { [key: string]: boolean } = { usergroup: this.selectedGroup, };
    for (let i = 1; i <= 18; i++) {
      const menuKey = `p${i}`;
      pValues[menuKey] = ELEMENT_DATA.some(element => element.menu === menuKey && element.select);
    }
    console.log(pValues);

    this.userGroup = pValues
    console.log(this.userGroup);
  }



  selectAll() {
    const allSelected = ELEMENT_DATA.every((element) => element.select === true);
    console.log(allSelected);

    if (!allSelected) {
      this.userGroup = {
        usergroup: this.selectedGroup,
        p1: true,
        p2: true,
        p3: true,
        p4: true,
        p5: true,
        p6: true,
        p7: true,
        p8: true,
        p9: true,
        p10: true,
        p11: true,
        p12: true,
        p13: true,
        p14: true,
        p15: true,
        p16: true,
        p17: true,
        p18: true,
      };
    } else {
      this.userGroup = {
        usergroup: this.selectedGroup,
        p1: false,
        p2: false,
        p3: false,
        p4: false,
        p5: false,
        p6: false,
        p7: false,
        p8: false,
        p9: false,
        p10: false,
        p11: false,
        p12: false,
        p13: false,
        p14: false,
        p15: false,
        p16: false,
        p17: false,
        p18: false,
      };
    }

    ELEMENT_DATA.forEach((element) => {
      element.select = !allSelected;
    });
    return !allSelected;
  }



  ngOnInit() {
    this.getAllUserGroups()
    this.selectedGroup = "Admin"
    this.onActionAnable('Admin')
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
  selectedAll ?:boolean=false;
  onActionAnable(userGroup: any): Promise<void> {
    return new Promise<void>((resolve, reject) => {

      this.controllerService.getSelectedUsergroup(userGroup).subscribe(
        (data: any) => {
          console.log(data);
          let count = 0;
          ELEMENT_DATA = new Array()
          data.forEach((item: any) => {
            for (let i = 1; i <= 18; i++) {
              const propertyName = 'p' + i;
              const pValue = item[propertyName];
              const pAsBoolean = pValue === true;

              ELEMENT_DATA.push({
                menuType: this.permisions[i - 1],
                select: pAsBoolean,
                menu: propertyName
              });
            }
          });
          this.userGroupDataSource = new MatTableDataSource(ELEMENT_DATA);
          console.log(ELEMENT_DATA);
          this.selectedAll = ELEMENT_DATA.every((element) => element.select === true);
          
          resolve();
        },
        (error: any) => {
          console.error('Error fetching User Groups:', error);
          reject(error);
        }

      );
    });
  }
  getAllUserGroups(): Promise<void> {
    return new Promise<void>((resolve, reject) => {

      this.controllerService.GetGroupList().subscribe(
        (data: any) => {
          console.log(data);
          data.map((data: any) => {
            this.userGroups.push(data.userGroup)

          })
        },
        (error: any) => {
          console.error('Error fetching User Groups:', error);
          reject(error);
        }

      );
    });
  }
  save(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      console.log(ELEMENT_DATA.every);


      console.log(this.userGroup);

      this.controllerService.saveUserGroup(this.userGroup).subscribe(
        (data: any) => {
          console.log(data);
          if (data.type === 'error') {
            this.showAlert(data.message, 'red')

          }
          else {
            this.showAlert(data.message, 'green')

          }
        },
        (error: any) => {
          console.error('Error fetching User Groups:', error);
          reject(error);
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

  addNew() {
    this.addNewGroup = !this.addNewGroup
    this.selectedGroup=null;
    ELEMENT_DATA.forEach((element) => {
      element.select = false;
    });
  }
  getServerData($event: PageEvent) {
    throw new Error('Method not implemented.');
  }
}
