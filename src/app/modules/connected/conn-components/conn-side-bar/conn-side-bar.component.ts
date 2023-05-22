import { Component } from '@angular/core';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

export const ROUTES: RouteInfo[] = [
  { path: '/auto-claim/home', title: 'Accueil',  icon: 'pi pi-home', class: 'active' },
  { path: '/auto-claim/contract', title: 'Contrats',  icon: 'pi pi-list', class: '' },
  { path: '/auto-claim/claim', title: 'Sinistres',  icon:'pi pi-folder-open', class: '' }

];

@Component({
  selector: 'app-conn-side-bar',
  templateUrl: './conn-side-bar.component.html',
  styleUrls: ['./conn-side-bar.component.css']
})
export class ConnSideBarComponent {

  menuItems: any[];

  constructor() {
    this.menuItems = [ ];
   }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
   }
}
