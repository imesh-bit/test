import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BankService } from 'src/app/service/bank-service/bank.service';
import Swal from 'sweetalert2';
export interface PeriodicElement {
  id?: string;
  name?: string;
  bankCode?: string;
  branchName?: string;
  branchCode?: string;
}

let ELEMENT_DATA: PeriodicElement[] = []
@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.scss']
})
export class BankComponent implements OnInit {
  cancel() {
    throw new Error('Method not implemented.');
  }

  length!: number;
  pageIndex: number = 0;
  pageSize: number = 10;
  id: any = 0;
  bankname: any;
  bankcode: any;
  branchname: any;
  branchcode: any;
  displayBank: string[] = ['name', 'bankCode', 'branchName', 'branchCode', 'action'];
  bankDataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  getServerData($event: PageEvent) {
    throw new Error('Method not implemented.');
  }
  getRowStyle(index: number) {
    return {
      'background-color': this.selectedRowIndex === index ? '#cce5ff' : 'transparent',
      // Add any other styles you want to apply conditionally
    };
  }
  isLoading: boolean = true;
  wageBorad: any;

  constructor(private bankService: BankService) { }
  selectedRowIndex: number = -1;
  isRowHovered: number | null = null;

  onRowClick(index: number) {
    this.selectedRowIndex = index;
    // Add any additional logic you want to perform when a row is clicked
  }
  ngOnInit() {
    this.isLoading = true;

    this.getAllBankList()
  }
  getAllBankList(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      try {
        this.isLoading = true;

        let reps = this.bankService.getBankList();
        reps.subscribe((data: any) => {
          console.log("bank list :", data);
          ELEMENT_DATA = new Array()
          data.map((data: any) => {
            ELEMENT_DATA.push({
              id: data.id,
              name: data.bankname,
              bankCode: data.bankcode,
              branchName: data.branchname,
              branchCode: data.branchcode
            })
            this.bankDataSource = new MatTableDataSource(ELEMENT_DATA);
            this.isLoading = false;

          })
        })
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }
  onSearchKeyup(event:Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.bankDataSource.filter = filterValue.trim().toLowerCase();

  }
  save(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const bank = {
        id: this.id,
        bankname: this.bankname,
        bankcode: this.bankcode,
        branchname: this.branchname,
        branchcode: this.branchcode,
        user: 'kaleesha'
      }
      console.log(bank);



      try {
        let reps = this.bankService.saveBank(bank);
        reps.subscribe((data: any) => {
          console.log(data);
          this.showAlert(data.message, 'green')
          this.getAllBankList();
          this.id = 0;
          this.bankname = '';
          this.bankcode = '';
          this.branchname = '';
          this.branchcode = '';
        })
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }
  updateData(element: any) {
    this.id = element.id;
    this.bankname = element.name;
    this.bankcode = element.bankCode;
    this.branchname = element.branchName;
    this.branchcode = element.branchCode
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
