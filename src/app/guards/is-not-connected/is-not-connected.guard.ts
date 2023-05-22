import { CanActivateFn, Router } from '@angular/router';

export const isNotConnectedGuard: CanActivateFn = (route, state) => {
  if (localStorage.getItem('token') != null && localStorage.getItem('user_id') != null){
    let router: Router = new Router();
    router.navigate(['/auto-claim/home']);
    return false;
  }else{
    return true;
  }
};