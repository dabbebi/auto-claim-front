import { Component } from '@angular/core';
import { UserDetails } from 'src/app/models/userDetails.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor (private authService : AuthenticationService, private messageService: MessageService){
  }

  registerForm = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]),
    telephone: new FormControl('', [Validators.minLength(8), Validators.maxLength(8)]),
    cin: new FormControl('', [Validators.minLength(8), Validators.maxLength(8)]),
    address: new FormControl(''),
    confirmation: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(25)])
  });

  isRegisterSuccess: Boolean = false;
  isRegisterError: Boolean = false;
  isConfirmationError: Boolean = false;

  ngOnInit(): void {
    let footer = document.getElementsByClassName('auth-footer');
    if(footer !== null && footer.length > 0) {
      footer[0].classList.remove('is-login');
      footer[0].classList.add('is-register');
    }
  }

  get firstName() {
    return this.registerForm.get('firstName');
  }

  get lastName() {
    return this.registerForm.get('lastName');
  }

  get address() {
    return this.registerForm.get('address');
  }

  get cin() {
    return this.registerForm.get('cin');
  }

  get telephone() {
    return this.registerForm.get('telephone');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get confirmation() {
    return this.registerForm.get('confirmation');
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

  disableSubmitButton() {
    document.getElementById("submit-btn")?.setAttribute("disabled","true");
    document.getElementById("submit-btn")?.classList.remove('enabled-btn');
    document.getElementById("submit-btn")?.classList.add('disabled-btn');
  }

  enableSubmitButton() {
    document.getElementById("submit-btn")?.removeAttribute("disabled");
    document.getElementById("submit-btn")?.classList.remove('disabled-btn');
    document.getElementById("submit-btn")?.classList.add('enabled-btn');
  }

  register() {
    this.disableSubmitButton();
    this.isRegisterError = false;
    this.isRegisterSuccess = false;
    this.isConfirmationError = false;
    
    let user = new UserDetails();
    user.firstName = this.registerForm.value.firstName;
    user.lastName = this.registerForm.value.lastName;
    user.email = this.registerForm.value.email;
    user.cin = this.registerForm.value.cin;
    user.telephone = this.registerForm.value.telephone;
    user.password = this.registerForm.value.password;
    user.address = this.registerForm.value.address;

    if(user.password !== this.registerForm.value.confirmation) {
      document.getElementById('password')?.classList.add('frm-input-txt-err');
      document.getElementById('confirmation')?.classList.add('frm-input-txt-err');
      this.isConfirmationError = true;
    }

    if(!this.isConfirmationError && this.registerForm.valid) {
      this.authService.register(user).subscribe((response : HttpResponse<any>)=>{
        this.enableSubmitButton();
        this.isRegisterSuccess = true;
        this.isRegisterError = false;
        console.log(response);
        this.messageService.add({ severity: 'success', summary: 'Création du compte', detail: 'Compte crée avec succès' });
      },
      (error : HttpErrorResponse)=>{
        this.enableSubmitButton();
        this.isRegisterError = true;
        this.isRegisterSuccess = false;
        console.log(error.message);
        this.messageService.add({ severity: 'error', summary: 'Création du compte', detail: 'La création du compte à échouée' });
      });
    } else {
      this.enableSubmitButton();
      this.messageService.add({ severity: 'error', summary: 'Création du compte', detail: "Le formulaire n'est pas valide" });
    }
  }

}
