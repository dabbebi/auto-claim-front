import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { ContractComponent } from "./contract/contract.component";
import { ClaimComponent } from "./claim/claim.component";

export const ConnectedRoutes: Routes = [
    {
      path: '',
      redirectTo: 'home',
      pathMatch: 'full',
    },
    { path: 'home',                   component: HomeComponent },
    { path: 'contract',               component: ContractComponent },
    { path: 'claim',                  component: ClaimComponent },
    {
      path: '**',
      redirectTo: 'home',
      pathMatch: 'full',
    }
  ];