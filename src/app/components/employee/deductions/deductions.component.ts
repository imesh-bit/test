import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PeriodicElement, ELEMENT_DATA } from '../profile/profile.component';
import { DeductionService } from 'src/app/service/deduction-service/deduction.service';

@Component({
  selector: 'app-deductions',
  templateUrl: './deductions.component.html',
  styleUrls: ['./deductions.component.scss']
})
export class DeductionsComponent implements OnInit {

  length!: number;
  pageIndex: number = 0;
  pageSize: number = 10;
  displayWageBoard: string[] = ['name', 'action',];
  wageBoardDataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  deduct1: any;
  deduct2: any;
  deduct3: any;
  deduct4: any;
  deduct5: any;

  constructor(private deductionService: DeductionService) { }

  ngOnInit() {
    this.getAllBankList()
  }
  getServerData($event: PageEvent) {
    throw new Error('Method not implemented.');
  }
  updateData(element: any) {
    throw new Error('Method not implemented.');
  }

  getAllBankList():Promise<void> {
    return new Promise<void>((resolve, reject) => {
      try {
        let reps = this.deductionService.getDeductionList();
        reps.subscribe((data: any) => {
          console.log("bank list :",data);

        })
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }
  save() {
    console.log(this.deduct1);
    return new Promise<void>((resolve, reject) => {
      const allowance = {
        id:0,
        deduct1: this.deduct1,
        deduct2: this.deduct2,
        deduct3: this.deduct3,
        deduct4: this.deduct4,
        deduct5: this.deduct5
      }
      console.log(allowance);



      try {
        let reps = this.deductionService.saveDeduction(allowance);
        reps.subscribe((data: any) => {
          console.log(data);

        })
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

}
