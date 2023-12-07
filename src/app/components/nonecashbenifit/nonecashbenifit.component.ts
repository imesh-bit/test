import { Component, OnInit } from '@angular/core';
import { NonCashService } from 'src/app/service/nonCash-service/nonCash.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nonecashbenifit',
  templateUrl: './nonecashbenifit.component.html',
  styleUrls: ['./nonecashbenifit.component.scss']
})
export class NonecashbenifitComponent implements OnInit {
  nonecash5: any;
  nonecash4: any;
  nonecash3: any;
  nonecash2: any;
  nonecash1: any;
  nonecash6: any;
  nonecash7: any;
  nonecash8: any;
  nonecash9: any;
  nonecash10: any;
  id: any;

  constructor(private nonCashservice: NonCashService) { }

  ngOnInit() {
    this.getAllNonCash()
  }

  getAllNonCash(): Promise<void> {
    return new Promise<void>((resolve, reject) => {

      let resp = this.nonCashservice.getNonCashList();
      resp.subscribe((data: any) => {
        console.log('salary advance list ', data[0]);

        this.id = data[0].id
        this.nonecash1 = data[0].noncash1;
        this.nonecash2 = data[0].noncash2;
        this.nonecash3 = data[0].noncash3;
        this.nonecash4 = data[0].noncash4;
        this.nonecash5 = data[0].noncash5;
        this.nonecash6 = data[0].noncash6;
        this.nonecash7 = data[0].noncash7;
        this.nonecash8 = data[0].noncash8;
        this.nonecash9 = data[0].noncash9;
        this.nonecash10 = data[0].noncash10;
        resolve();

      })
    })
  }

  cancel() {
    throw new Error('Method not implemented.');
  }
  save(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const nonCash = {
        id: this.id,
        noncash1: this.nonecash1,
        noncash2: this.nonecash2,
        noncash3: this.nonecash3,
        noncash4: this.nonecash4,
        noncash5: this.nonecash5,
        noncash6: this.nonecash6,
        noncash7: this.nonecash7,
        noncash8: this.nonecash8,
        noncash9: this.nonecash9,
        noncash10: this.nonecash10
      };
      console.log(nonCash);
      

      let resp = this.nonCashservice.saveNonCash(nonCash);
      resp.subscribe((data: any) => {
        console.log('salary advance list ', data[0]);

        if (data.type == 'error') {
          this.showAlert(data.message, 'red');
        } else {
          this.showAlert(data.message, 'green')
          this.getAllNonCash()

        }
        resolve();

      })
    })
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
        // this.deleteData(element);
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
