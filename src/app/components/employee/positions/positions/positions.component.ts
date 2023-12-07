import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DesignationService } from 'src/app/service/designation-service/designation.service';
import { PositionService } from 'src/app/service/position-service/position.service';
import Swal from 'sweetalert2';
export interface PeriodicElement {
  id?: string;
  name?: string;
}

let ELEMENT_DATA: PeriodicElement[] = []
@Component({
  selector: 'app-positions',
  templateUrl: './positions.component.html',
  styleUrls: ['./positions.component.scss']
})
export class PositionsComponent implements OnInit {
  cancel() {
    throw new Error('Method not implemented.');
  }

  length!: number;
  pageIndex: number = 0;
  pageSize: number = 10;
  displayPosition: string[] = ['name', 'action'];
  positionDataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  isLoading: boolean = true;
  id: any = 0;
  getServerData($event: PageEvent) {
    throw new Error('Method not implemented.');
  }

  position: any;


  constructor(private designationService: DesignationService) { }
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
  updateData(element: any) {
    this.id = element.id
    this.position = element.name
  }
  ngOnInit(): void {
    this.isLoading = true;

    this.getPositionList();
  }
  getPositionList(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      try {
        this.isLoading = true;

        let reps = this.designationService.getDesignationList();
        reps.subscribe((data: any) => {
          console.log("wage list :", data);
          ELEMENT_DATA = new Array();

          data.map((data: any) => {
            console.log(data);
            ELEMENT_DATA.push({
              id: data.id,
              name: data.designation
            })
          })
          this.positionDataSource = new MatTableDataSource(ELEMENT_DATA);
          this.isLoading = false;

        })
        resolve();

      } catch (error) {
        reject(error);
      }
    });
  }

  save(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const position = {
        id: this.id,
        designation: this.position,

        user: 'kaleesha'
      }
      console.log(position);



      try {
        let reps = this.designationService.saveDesignation(position);
        reps.subscribe((data: any) => {
          console.log(data);
          this.getPositionList();
          this.showAlert(data.message, 'green')

          this.position = '';
          this.id = 0;
        })
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }
  onSearchKeyup(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.positionDataSource.filter = filterValue.trim().toLowerCase();

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
      this.isLoading = true;
      const position = {
        id: element.id,
        designation: element.name,
      }
      this.designationService.deleteData(position).subscribe(
        (data: any) => {
          console.log('delete designation:', data);
          if (data.type === 'sucess') {
            this.showAlert(data.message, 'green')
            this.getPositionList();

          } else {
            this.showAlert(data.message, 'red')

          }
          // console.log(this.months);
          resolve(); // Resolve the Promise when the data is processed
        },
        (error: any) => {
          console.error('Error fetching salary months:', error);
          reject(error); // Reject the Promise if there's an error
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
}
