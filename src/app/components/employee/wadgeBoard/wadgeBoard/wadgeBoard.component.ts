import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DesignationService } from 'src/app/service/designation-service/designation.service';
import { WageboardService } from 'src/app/service/wageBoard-service/wageboard.service';
import Swal from 'sweetalert2';

export interface PeriodicElement {
  id?: string;
  name?: string;
}

let ELEMENT_DATA: PeriodicElement[] = []

@Component({
  selector: 'app-wadgeBoard',
  templateUrl: './wadgeBoard.component.html',
  styleUrls: ['./wadgeBoard.component.scss']
})
export class WadgeBoardComponent implements OnInit {

  length!: number;
  pageIndex: number = 0;
  pageSize: number = 10;
  displayWageBoard: string[] = ['name', 'action'];
  wageBoardDataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  id: any = 0
  getServerData($event: PageEvent) {
    throw new Error('Method not implemented.');
  }

  designation: any;
  isLoading: boolean = true;

  constructor(private wageBoardService: WageboardService) { }
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
    this.isLoading = true;

    this.getDesignationList()
  }

  onSearchKeyup(event:Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.wageBoardDataSource.filter = filterValue.trim().toLowerCase();

  }
  cancel() {
    this.designation = ''
    this.id = 0
  }
  getDesignationList(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      try {
        this.isLoading = true;

        let reps = this.wageBoardService.getwageboardList();
        reps.subscribe((data: any) => {
          console.log("wage list :", data);
          ELEMENT_DATA = new Array();
          console.log(data);

          data.map((data: any) => {
            // console.log(data.designation);
            ELEMENT_DATA.push({
              id: data.categoryid,
              name: data.categoryname
            })
            this.isLoading = false;

          })
          this.wageBoardDataSource = new MatTableDataSource(ELEMENT_DATA);

        })
        resolve();

      } catch (error) {
        reject(error);
      }
    });
  }

  save(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const category = {
        categoryid: this.id,
        categoryname: this.designation,

        user: 'kaleesha'
      }
      console.log(category);
      this.isLoading = true;


      try {
        let reps = this.wageBoardService.savewageboard(category);
        reps.subscribe((data: any) => {
          console.log(data);
          this.showAlert(data.message, 'green')

          this.getDesignationList();
          this.designation = '';
          this.id = 0;
        })
        resolve();
      } catch (error) {
        this.isLoading = false;

        reject(error);
      }
    });

  }
  updateData(element: any) {
    this.id = element.id;
    this.designation = element.name
  }
  deleteData(element: any) {
    this.id = element.id;
    this.designation = element.name
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
