import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface SubRouteInfo{
  sub_path: string;
  sub_title: string;
}
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    submenu:SubRouteInfo
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Tableau de bord',  icon: 'dashboard', class: '',submenu:{sub_path:'',sub_title:''} },
    { path: '/jobs', title: 'Metiers',  icon:'category', class: '',submenu:{sub_path:'',sub_title:''}  },
    { path: '/regulations', title: 'Reglementations',  icon:'loyalty', class: '' ,submenu:{sub_path:'',sub_title:''} },
    { path: '/trendings', title: 'Tendances',  icon:'library_books', class: '',submenu:{sub_path:'',sub_title:''} },
    { path: '/infos', title: 'Informations',  icon:'announcement', class: '',submenu:{sub_path:'',sub_title:''} },
    { path: '/investors', title: 'Investisseurs',  icon:'folder_shared', class: '',submenu:{sub_path:'',sub_title:''} },
    { path: '/complaints', title: 'Plaintes',  icon:'notifications', class: '',submenu:{sub_path:'',sub_title:''} },
    { path: '/user-profile', title: 'User Profile',  icon:'person', class: '',submenu:{sub_path:'',sub_title:''} },
    { path: '/logout', title: 'Deconnexion',  icon:'logout', class: 'active-pro',submenu:{sub_path:'',sub_title:''} },

];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
