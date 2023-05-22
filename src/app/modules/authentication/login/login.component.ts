import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CredentialsDetails } from 'src/app/models/credentialsDetails.model';
import { first } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;
  isLoginError: Boolean = false;

  constructor (private authService : AuthenticationService, private router : Router){
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(25)])
    });
  }

  ngOnInit(): void {
    let footer = document.getElementsByClassName('auth-footer');
    if(footer !== null && footer.length > 0) {
      footer[0].classList.remove('is-register');
      footer[0].classList.add('is-login');
    }
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
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

  disableSubmutButton() {
    document.getElementById("submit-btn")?.setAttribute("disabled","true");
    document.getElementById("submit-btn")?.classList.remove('enabled-btn');
    document.getElementById("submit-btn")?.classList.add('disabled-btn');
  }

  enableSubmitButton() {
    document.getElementById("submit-btn")?.removeAttribute("disabled");
    document.getElementById("submit-btn")?.classList.remove('disabled-btn');
    document.getElementById("submit-btn")?.classList.add('enabled-btn');
  }

  login() {
    this.disableSubmutButton();
    this.isLoginError = false;

    let credentials = new CredentialsDetails();
    credentials.email = this.loginForm.value.email;
    credentials.password = this.loginForm.value.password;

    if(this.loginForm.valid) {
      
      this.authService.login(credentials).pipe(first()).subscribe((response : any)=>{
        localStorage.setItem('token', response.token);
        localStorage.setItem('user_id', response.user_id);
        
        this.router.navigate(['/auto-claim/home']);
      },
      (error : HttpErrorResponse)=>{
        this.enableSubmitButton();
        this.isLoginError = true;
        console.log(error.message);
      });
    } else {
      this.enableSubmitButton();
    }
  }

}