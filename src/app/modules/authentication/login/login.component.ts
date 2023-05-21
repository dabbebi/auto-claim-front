import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CredentialsDetails } from 'src/app/models/credentialsDetails.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor (private authService : AuthenticationService, private router : Router){
  }

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  isLoginSucceed: Boolean = false;
  isLoginError: Boolean = false;
  loginErrorMessage: String = "";

  ngOnInit(): void {
    let footer = document.getElementsByClassName('auth-footer');
    if(footer !== null && footer.length > 0) {
      footer[0].classList.remove('is-register');
      footer[0].classList.add('is-login');
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

  login() {
    document.getElementById("submit-btn")?.setAttribute("disabled","true");
    document.getElementById("submit-btn")?.setAttribute("style","cursor: not-allowed;");

    const emailExpression: RegExp = /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/;
    this.isLoginError = false;

    let credentials = new CredentialsDetails();
    credentials.email = this.loginForm.value.email;
    credentials.password = this.loginForm.value.password;

   

    if(credentials.email === "" || !emailExpression.test(String(credentials.email))) {
      document.getElementById('email')?.classList.add('frm-input-txt-err');
      this.isLoginError = true;
    }else {
      document.getElementById('email')?.classList.remove('frm-input-txt-err');
    }

    if(credentials.password === "" 
      || (credentials.password != null && credentials.password != undefined && credentials.password.length < 3)) {
      document.getElementById('password')?.classList.add('frm-input-txt-err');
      this.isLoginError = true;
    }else {
      document.getElementById('password')?.classList.remove('frm-input-txt-err');
    }

    if(!this.isLoginError) {
      this.authService.login(credentials).subscribe((data : any)=>{
        this.isLoginSucceed = true;
        this.isLoginError = false;
        console.log(data);   
      },
      (err : HttpErrorResponse)=>{
        this.isLoginError = true;
        this.loginErrorMessage = err.error.message;
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