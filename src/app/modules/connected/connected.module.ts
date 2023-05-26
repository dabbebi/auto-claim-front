import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConnectedComponent } from './connected.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { ConnectedRoutes } from './connected-routing.module';
import { ContractComponent } from './contract/contract.component';
import { ClaimComponent } from './claim/claim.component';
import { ConnComponentsModule } from './conn-components/conn-components.module';
import { ToastModule } from 'primeng/toast';
import { ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { FileUploadModule } from 'primeng/fileupload';
import { DropdownModule } from 'primeng/dropdown';
import { ClaimDetailsComponent } from './claim-details/claim-details.component';
import { TabViewModule } from 'primeng/tabview';
import { ChartModule } from 'primeng/chart';
import { GalleriaModule } from 'primeng/galleria';

@NgModule({
  declarations: [
    ConnectedComponent,
    HomeComponent,
    ContractComponent,
    ClaimComponent,
    ClaimDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ConnectedRoutes),
    ConnComponentsModule,
    ReactiveFormsModule,
    ToastModule,
    TableModule,
    ButtonModule,
    TagModule,
    DialogModule,
    InputTextModule,
    CalendarModule,
    FileUploadModule,
    DropdownModule,
    TabViewModule,
    ChartModule,
    GalleriaModule
  ]
})
export class ConnectedModule { }
