import { CanActivateFn, Router } from '@angular/router';

export const isConnectedGuard: CanActivateFn = (route, state) => {
  if (localStorage.getItem('token') != null && localStorage.getItem('user_id') != null){
    return true;
  }else{
    let router: Router = new Router( );
    router.navigate(['/auth/login']);
    return false;
  }
};
