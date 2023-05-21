import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthHeaderComponent } from './auth-header/auth-header.component';
import { AuthFooterComponent } from './auth-footer/auth-footer.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    AuthHeaderComponent,
    AuthFooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    AuthFooterComponent,
    AuthHeaderComponent
  ]
})
export class AuthComponentsModule { }