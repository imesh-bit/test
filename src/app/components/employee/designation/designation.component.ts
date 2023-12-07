import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PositionService } from 'src/app/service/position-service/position.service';
import Swal from 'sweetalert2';
export interface PeriodicElement {
  id?: string;
  name?: string;
}

let ELEMENT_DATA: PeriodicElement[] = []
@Component({
  selector: 'app-designation',
  templateUrl: './designation.component.html',
  styleUrls: ['./designation.component.scss']
})
export class DesignationComponent implements OnInit {

  length!: number;
  pageIndex: number = 0;
  pageSize: number = 10;
  displayDesignation: string[] = ['name', 'action'];
  designationDataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  isLoading: boolean = true;
  id: any = 0;
  getServerData($event: PageEvent) {
    throw new Error('Method not implemented.');
  }
  updateData(element: any) {
    this.position = element.name;
    this.id = element.id;
  }
  position: any;

  constructor(private positionService: PositionService) { }

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
  ngOnInit(): void {
    this.isLoading = true;

    this.getPositionList();
  }
  cancel() {
    this.id = 0;
    this.position = ''
  }

  getPositionList(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      try {
        this.isLoading = true;

        let reps = this.positionService.getPositionsList();
        reps.subscribe((data: any) => {
          console.log("wage list :", data);
          ELEMENT_DATA = new Array();

          data.map((data: any) => {
            console.log(data);
            ELEMENT_DATA.push({
              id: data.id,
              name: data.division
            })
          })
          this.designationDataSource = new MatTableDataSource(ELEMENT_DATA);
          this.isLoading = false;

        })
        resolve();

      } catch (error) {
        reject(error);
      }
    });
  }
  onSearchKeyup(event:Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.designationDataSource.filter = filterValue.trim().toLowerCase();

  }
  save(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const position = {
        id: this.id,
        division: this.position,

        user: 'kaleesha'
      }
      console.log(position);



      try {
        let reps = this.positionService.savePositions(position);
        reps.subscribe((data: any) => {
          console.log(data);
          this.showAlert(data.message, 'green')

          this.getPositionList();
          this.position = ''
        })
        resolve();
      } catch (error) {
        reject(error);
      }
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
}
