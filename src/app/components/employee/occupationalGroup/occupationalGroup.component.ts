import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DesignationService } from 'src/app/service/designation-service/designation.service';
import { OccupationalGroupService } from 'src/app/service/occupational-service/occupationalGroup.service';
import Swal from 'sweetalert2';
export interface PeriodicElement {
  id?: string;
  name?: string;
}

let ELEMENT_DATA: PeriodicElement[] = []
@Component({
  selector: 'app-occupationalGroup',
  templateUrl: './occupationalGroup.component.html',
  styleUrls: ['./occupationalGroup.component.scss']
})
export class OccupationalGroupComponent implements OnInit {
  cancel() {
    throw new Error('Method not implemented.');
  }

  id: any = 0;
  length!: number;
  pageIndex: number = 0;
  pageSize: number = 10;
  displayPosition: string[] = ['name', 'action'];
  positionDataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  getServerData($event: PageEvent) {
    throw new Error('Method not implemented.');
  }

  groupname: any;
  isLoading: boolean = true;


  constructor(private occupationaService: OccupationalGroupService) { }


  updateData(element: any) {
    this.id = element.id
    console.log(this.id);
    this.groupname = element.name
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
  ngOnInit(): void {
    this.isLoading = true;

    this.getOccupationList();
  }
  getOccupationList(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      try {
        this.isLoading = true;

        let reps = this.occupationaService.getOccupationList();
        reps.subscribe((data: any) => {
          console.log("wage list :", data);
          ELEMENT_DATA = new Array();

          data.map((data: any) => {
            console.log(data);
            ELEMENT_DATA.push({
              id: data.groupid,
              name: data.groupname
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

  onSearchKeyup(event:Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.positionDataSource.filter = filterValue.trim().toLowerCase();

  }
  save(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const position = {
        groupid: this.id,
        groupname: this.groupname,

        user: ""
      }
      console.log(position);



      try {
        let reps = this.occupationaService.saveOccupation(position);
        reps.subscribe((data: any) => {
          console.log(data);
          this.showAlert(data.message, 'green')

          this.getOccupationList();
          this.groupname = ''
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
