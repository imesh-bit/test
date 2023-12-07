import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth-service/auth-service.service';
import { DataTransferService } from 'src/app/service/data-transfer-service/data-transfer.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: string = '';
  password: string = '';
  showPassword: boolean = false;

  @ViewChild('hrDrawer', { static: false }) hrDrawer!: MatDrawer;

  constructor(private router: Router, private authService: AuthService, private dataTransferService: DataTransferService) { }


  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  ngOnInit() {
    window.location.reload
  }
  onLogin() {
    // this.router.navigate(['/home']);

    let resp = this.authService.login(this.username, this.password);
    resp.subscribe((data: any) => {
      console.table(data)
      if (data.loginDetails[0].validUser) {
        localStorage.clear();
        localStorage.setItem('id', data.loginDetails[0].id);
        localStorage.setItem('token', data.loginDetails[0].token);
        localStorage.setItem('pw', this.password)
        const per = data.loginDetails[0];
        if (!per.p1 && !per.p2 && !per.p3 && !per.p4 && !per.p5 && !per.p6 && !per.p7 && !per.p8 && !per.p9 && !per.p10 && !per.p11 && !per.p12 && !per.p13 && !per.p14 && !per.p15 && !per.p16 && !per.p17 && per.p18) {

          this.router.navigate(['/home/slipUser']);
          localStorage.setItem('salUser', 'yes');
        }else{
          this.router.navigate(['/home']);
          localStorage.setItem('salUser', 'no');

        }



       
        this.dataTransferService.setData(data);
        const dataString = JSON.stringify(data);
        localStorage.setItem('data', dataString)
        // console.log(localStorage.getItem('name'));
        // console.log(localStorage.getItem('token'));
        console.log('token session ', localStorage.getItem('token'));
        if (data.loginDetails[0].type === 'error') {
          this.showAlert(data.loginDetails[0].message, 'red')

        }

      } else {
        if (data.loginDetails[0].type === 'error') {
          this.showAlert(data.loginDetails[0].message, 'red')

        }

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
