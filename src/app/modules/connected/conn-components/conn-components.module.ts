import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConnHeaderComponent } from './conn-header/conn-header.component';
import { ConnFooterComponent } from './conn-footer/conn-footer.component';
import { ConnSideBarComponent } from './conn-side-bar/conn-side-bar.component';
import { RouterModule } from '@angular/router';
import {ButtonModule} from 'primeng/button';

@NgModule({
  declarations: [
    ConnHeaderComponent,
    ConnFooterComponent,
    ConnSideBarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ButtonModule
  ],
  exports: [
    ConnHeaderComponent,
    ConnFooterComponent,
    ConnSideBarComponent
  ]
})
export class ConnComponentsModule { }
