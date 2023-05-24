import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthenticationComponent } from './authentication.component';
import { RouterModule } from '@angular/router';
import { AuthenticationRoutes } from './authentication-routing.module';
import { AuthComponentsModule } from './auth-components/auth-components.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';


@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    AuthenticationComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(AuthenticationRoutes),
    AuthComponentsModule,
    ReactiveFormsModule,
    ToastModule
  ]
})

export class AuthenticationModule { }