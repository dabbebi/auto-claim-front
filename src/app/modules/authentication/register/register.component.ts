import { Component } from '@angular/core';
import { UserDetails } from 'src/app/models/userDetails.model';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor (private authService : AuthenticationService, private router : Router){
  }

  registerForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    telephone: new FormControl(''),
    cin: new FormControl(''),
    address: new FormControl(''),
    confirmation: new FormControl('')
  });

  isRegisterSuccess: Boolean = false;
  isRegisterError: Boolean = false;
  registerErrorMessage: String = "";

  ngOnInit(): void {
    let footer = document.getElementsByClassName('auth-footer');
    if(footer !== null && footer.length > 0) {
      footer[0].classList.remove('is-login');
      footer[0].classList.add('is-register');
    }
  }

  viewPassword() {
    let currentType = document.getElementById('password')?.getAttribute('type');
    if(currentType === 'password'){
      document.getElementById('password')?.setAttribute('type', 'text');
      document.getElementById('confirmation')?.setAttribute('type', 'text');
    }else {
      document.getElementById('password')?.setAttribute('type', 'password');
      document.getElementById('confirmation')?.setAttribute('type', 'password');
    }
  }

  register() {
    document.getElementById("submit-btn")?.setAttribute("disabled","true");
    document.getElementById("submit-btn")?.setAttribute("style","cursor: not-allowed;");

    const emailExpression: RegExp = /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/;
    this.isRegisterError = false;

    let user = new UserDetails();
    user.firstName = this.registerForm.value.firstName;
    user.lastName = this.registerForm.value.lastName;
    user.email = this.registerForm.value.email;
    user.cin = this.registerForm.value.cin;
    user.telephone = this.registerForm.value.telephone;
    user.password = this.registerForm.value.password;
    user.address = this.registerForm.value.address;

    if(user.firstName === "") {
      document.getElementById('firstName')?.classList.add('frm-input-txt-err');
      this.isRegisterError = true;
    }else {
      document.getElementById('firstName')?.classList.remove('frm-input-txt-err');
    }

    if(user.lastName === "") {
      document.getElementById('lastName')?.classList.add('frm-input-txt-err');
      this.isRegisterError = true;
    }else {
      document.getElementById('lastName')?.classList.remove('frm-input-txt-err');
    }

    if(user.email === "" || !emailExpression.test(String(user.email))) {
      document.getElementById('email')?.classList.add('frm-input-txt-err');
      this.isRegisterError = true;
    }else {
      document.getElementById('email')?.classList.remove('frm-input-txt-err');
    }

    if(user.password !== this.registerForm.value.confirmation 
      || (user.password != null && user.password != undefined && user.password.length < 3)) {
      document.getElementById('password')?.classList.add('frm-input-txt-err');
      document.getElementById('confirmation')?.classList.add('frm-input-txt-err');
      this.isRegisterError = true;
    }else {
      document.getElementById('password')?.classList.remove('frm-input-txt-err');
      document.getElementById('confirmation')?.classList.remove('frm-input-txt-err');
    }

    if(!this.isRegisterError) {
      this.authService.register(user).subscribe((data : any)=>{
        this.isRegisterSuccess = true;
        this.isRegisterError = false;
        console.log(data);   
      },
      (err : HttpErrorResponse)=>{
        this.isRegisterError = true;
        this.registerErrorMessage = err.error.message;
        document.getElementById("submit-btn")?.removeAttribute("disabled");
        document.getElementById("submit-btn")?.setAttribute("style","cursor: pointer;");
        console.log(err.error.message); 
      });
    } else {
      document.getElementById("submit-btn")?.removeAttribute("disabled");
      document.getElementById("submit-btn")?.setAttribute("style","cursor: pointer;");
    }
  }

}
