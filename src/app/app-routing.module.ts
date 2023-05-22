import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './modules/authentication/authentication.component';
import { ConnectedComponent } from './modules/connected/connected.component';
import { isNotConnectedGuard } from './guards/is-not-connected/is-not-connected.guard';
import { isConnectedGuard } from './guards/is-connected/is-connected.guard';

const routes: Routes =[
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full',
  }, {
    path: 'auth',
    component: AuthenticationComponent,
    children: [
        {
      path: '',
      loadChildren: () => import('./modules/authentication/authentication.module').then(x => x.AuthenticationModule)
  }],
  canActivate : [isNotConnectedGuard]
}, {
  path: 'auto-claim',
  component: ConnectedComponent,
  children: [
      {
    path: '',
    loadChildren: () => import('./modules/connected/connected.module').then(x => x.ConnectedModule)
}],
canActivate : [isConnectedGuard]
}, {
    path: '**',
    redirectTo: 'auth/login'
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
