import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-changePassWord',
  templateUrl: './changePassWord.component.html',
  styleUrls: ['./changePassWord.component.scss']
})
export class ChangePassWordComponent implements OnInit {



  currentPw: any;
  newPw: any;
  confirmPw: any;
  showPassword: boolean = false;
  showNewPassword: boolean = false;
  showConfirmPassword: boolean = false;
  isLengthValid = false;
  isUpperCaseValid = false;
  isLowerCaseValid = false;
  isDigitValid = false;
  isSpecialCharValid = false;
  isNewPasswordMatch = false;
  isDifferentFromCurrent = false;
  pwChangeBtn = true;
  isCurrentPw = false;
  constructor() {

  }
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  togglePasswordVisibilityNew() {
    this.showNewPassword = !this.showNewPassword;
  }
  togglePasswordVisibilityConfirm() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onConfirmPasswordKeyUp() {
    // const errors = [];
    
    // Check if the current password matches the stored password
    if (localStorage.getItem('pw') == this.currentPw) {
      this.isCurrentPw = true;
    } else {
      this.isCurrentPw = false;

    }
    // Check if the password is at least 8 characters long
    if (this.newPw.length >= 8) {
      this.isLengthValid = true;
    } else {
      // errors.push('Password must be at least 8 characters long.');
      this.isLengthValid = false;
    }

    // Check if the password contains at least one uppercase letter
    if (/[A-Z]/.test(this.newPw)) {
      this.isUpperCaseValid = true;
    } else {
      // errors.push('Password must contain at least one uppercase letter.');
      this.isUpperCaseValid = false;
    }

    // Check if the password contains at least one lowercase letter
    if (/[a-z]/.test(this.newPw)) {
      this.isLowerCaseValid = true;
    } else {
      // errors.push('Password must contain at least one lowercase letter.');
      this.isLowerCaseValid = false;
    }

    // Check if the password contains at least one digit
    if (/\d/.test(this.newPw)) {
      this.isDigitValid = true;
    } else {
      // errors.push('Password must contain at least one digit.');
      this.isDigitValid = false;
    }

    // Check if the password contains at least one special character (#, @, !, $, %, ^, &, *, or ())
    if (/[#@!$%^&*()]/.test(this.newPw)) {
      this.isSpecialCharValid = true;
    } else {
      // errors.push('Password must contain at least one special character (#, @, !, $, %, ^, &, *, or ()).');
      this.isSpecialCharValid = false;
    }

    // Check if the new password matches the confirmation password
    if (this.newPw === this.confirmPw && this.newPw !== null && this.confirmPw !== null) {
      this.isNewPasswordMatch = true;
    } else {
      // errors.push('New password and confirmation do not match.');
      this.isNewPasswordMatch = false;
    }

    // Check if the new password is different from the current password
    if (this.newPw !== this.currentPw && this.currentPw !== null) {
      this.isDifferentFromCurrent = true;
    } else {
      // errors.push('New password cannot be the same as the current password.');
      this.isDifferentFromCurrent = false;
    }
    if (localStorage.getItem('pw') == this.currentPw && this.isLengthValid && this.isUpperCaseValid && this.isLowerCaseValid && this.isDigitValid && this.isSpecialCharValid && this.isNewPasswordMatch && this.isDifferentFromCurrent) {
      this.pwChangeBtn = false;
    } else {
      this.pwChangeBtn = true;
    }
    // Display error messages if there are any errors
    // if (errors.length > 0) {
    //   alert(errors.join('\n'));
    //   return;
    // }

    // alert('Password changed successfully!');
  }
  changePassword() {

  }

  onSubmit() {

  }
}
