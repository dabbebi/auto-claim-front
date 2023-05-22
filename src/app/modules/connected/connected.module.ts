import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConnectedComponent } from './connected.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { ConnectedRoutes } from './connected-routing.module';
import { ContractComponent } from './contract/contract.component';
import { ClaimComponent } from './claim/claim.component';
import { ConnComponentsModule } from './conn-components/conn-components.module';



@NgModule({
  declarations: [
    ConnectedComponent,
    HomeComponent,
    ContractComponent,
    ClaimComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ConnectedRoutes),
    ConnComponentsModule
  ]
})
export class ConnectedModule { }
