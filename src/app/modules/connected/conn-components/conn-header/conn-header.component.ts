import { Component } from '@angular/core';

@Component({
  selector: 'app-conn-header',
  templateUrl: './conn-header.component.html',
  styleUrls: ['./conn-header.component.css']
})
export class ConnHeaderComponent {
  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    window.location.replace('/auth/login');
  }
}
