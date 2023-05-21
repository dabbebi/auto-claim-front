import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './modules/authentication/authentication.component';

const routes: Routes =[
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  }, {
    path: '',
    component: AuthenticationComponent,
    children: [
        {
      path: '',
      loadChildren: () => import('./modules/authentication/authentication.module').then(x => x.AuthenticationModule)
  }],
  canActivate : []
}, {
    path: '**',
    redirectTo: 'login'
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
