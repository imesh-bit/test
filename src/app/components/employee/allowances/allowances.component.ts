import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { id } from '@swimlane/ngx-charts';
import { AllowanceService } from 'src/app/service/allowance-service/allowance.service';
import { DeductionService } from 'src/app/service/deduction-service/deduction.service';
import Swal from 'sweetalert2';
export interface PeriodicElement {
  id?: string;
  name?: string;
}

let ELEMENT_DATA: PeriodicElement[] = [{ id: '1', name: 'Hydrogen' },
{ id: '2', name: 'Helium' },
{ id: '3', name: 'Lithium' },
{ id: '4', name: 'Beryllium' },]
@Component({
  selector: 'app-allowances',
  templateUrl: './allowances.component.html',
  styleUrls: ['./allowances.component.scss']
})
export class AllowancesComponent implements OnInit {

  length!: number;
  pageIndex: number = 0;
  pageSize: number = 10;
  displayWageBoard: string[] = ['name', 'action',];
  wageBoardDataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  allowId: any = 0;
  allowance1: any;
  allowance2: any;
  allowance3: any;
  allowance4: any;
  allowance5: any;
  deductId: any = 0;
  deduct1: any;
  deduct2: any;
  deduct3: any;
  deduct4: any;
  deduct5: any;
  allow1_status?: boolean = false;
  allow2_status?: boolean = false;
  allow3_status?: boolean = false;
  allow4_status?: boolean = false;
  allow5_status?: boolean = false;
  update_status1: boolean = false;
  update_status2: boolean = false;
  update_status3: boolean = false;
  update_status4: boolean = false;
  update_status5: boolean = false;

  constructor(private dedudctionService: DeductionService, private allowanceService: AllowanceService, private deductionService: DeductionService) { }
  
  ngOnInit() {
    this.getAllAllowances()
    this.getAllDeductions()
  }
  getServerData($event: PageEvent) {
    throw new Error('Method not implemented.');
  }
  updateData(element: any) {
    throw new Error('Method not implemented.');
  }
  getAllDeductions(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      try {
        let reps = this.dedudctionService.getDeductionList();
        reps.subscribe((data: any) => {
          console.log('deduction list : ', data);
          console.log(data[0]);

          if (data[0] != null) {
            this.deductId = data[0].id
            if (data[0].deduct1 != null || data[0].deduct1 != '') {
              this.deduct1 = data[0].deduct1

            } if (data[0].deduct2 != null || data[0].deduct2 != '') {
              this.deduct2 = data[0].deduct2

            } if (data[0].deduct3 != null || data[0].deduct3 != '') {
              this.deduct3 = data[0].deduct3

            } if (data[0].deduct4 != null || data[0].deduct4 != '') {
              this.deduct4 = data[0].deduct4

            } if (data[0].deduct5 != null || data[0].deduct5 != '') {
              this.deduct5 = data[0].deduct5

            }
          }
        })
        resolve();
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
          console.log('allowances list : ', data);
          console.log(data[0]);
          if (data[0] != null) {
            this.allowId = data[0].id

            if (data[0].allow1 != null || data[0].allow1 != '') {
              this.allowance1 = data[0].allow1
              this.allow1_status = data[0].allow1_status
              this.update_status1 = data[0].allow1_status
            } if (data[0].allow2 != null || data[0].allow2 != '') {
              this.allowance2 = data[0].allow2
              this.allow2_status = data[0].allow2_status
              this.update_status2 = data[0].allow2_status

            } if (data[0].allow3 != null || data[0].allow2 != '') {
              this.allowance3 = data[0].allow3
              this.allow3_status = data[0].allow3_status
              this.update_status3 = data[0].allow3_status

            } if (data[0].allow4 != null || data[0].allow4 != '') {
              this.allowance4 = data[0].allow4
              this.allow4_status = data[0].allow4_status
              this.update_status4 = data[0].allow4_status

            } if (data[0].allow5 != null || data[0].allow5 != '') {
              this.allowance5 = data[0].allow5
              this.allow5_status = data[0].allow5_status
              this.update_status5 = data[0].allow5_status

            }
          }
          console.log(this.allowId);

        })
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }
  save() {
    console.log(this.allowance1);
    return new Promise<void>((resolve, reject) => {

      const allowance = {
        id: this.allowId,
        allow1: this.allowance1,
        allow1_status: this.allow1_status,
        allow2: this.allowance2,
        allow2_status: this.allow2_status,
        allow3: this.allowance3,
        allow3_status: this.allow3_status,
        allow4: this.allowance4,
        allow4_status: this.allow4_status,
        allow5: this.allowance5,
        allow5_status: this.allow5_status
      }
      console.log(allowance);



      try {
        let reps = this.allowanceService.saveAllowance(allowance);
        reps.subscribe((data: any) => {
          console.log(data);
          // this.getAllowanceList();
          this.showAlert(data.message, 'green')



        })
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }
  cancelDeduction() {
    this.deduct1 = ''
    this.deduct2 = ''
    this.deduct3 = ''
    this.deduct4 = ''
    this.deduct5 = ''
  }
  saveDeduction() {
    console.log(this.deduct1);
    return new Promise<void>((resolve, reject) => {
      const allowance = {
        id: this.deductId,
        deduct1: this.deduct1,
        deduct2: this.deduct2,
        deduct3: this.deduct3,
        deduct4: this.deduct4,
        deduct5: this.deduct5
      }
      console.log(allowance);

      // this.showAlert('Loading', '', 'black')

      try {
        let reps = this.deductionService.saveDeduction(allowance);
        reps.subscribe((data: any) => {
          console.log(data);

          this.showAlert(data.message, 'green')


        })
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }
  cancel() {
    this.allowance1 = ''
    this.allowance2 = ''
    this.allowance3 = ''
    this.allowance4 = ''
    this.allowance5 = ''

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
