import { Component, OnInit } from '@angular/core';
import {TokenStorage} from '../../utils/token.storage';
import jwt_decode from 'jwt-decode';

declare const $: any;

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

/*
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Tableau de bord',  icon: 'dashboard', class: '' },
    { path: '/jobs', title: 'Metiers',  icon:'category', class: '' },
    { path: '/regulations', title: 'Règlementations',  icon:'loyalty', class: ''  },
    { path: '/trendings', title: 'Tendances',  icon:'library_books', class: '' },
    // { path: '/infos', title: 'Comment obtenir ?',  icon:'announcement', class: '' },
    { path: '/complaints', title: 'Plaintes',  icon:'notifications', class: ''},
    { path: '/reclamations', title: 'Réclamations',  icon:'announcement', class: ''},
    // { path: '/user-profile', title: 'User Profile',  icon:'person', class: ''},
    { path: '/faq', title: 'FAQ',  icon:'question_mark', class: '' },
    { path: '/competitions', title: 'Concours',  icon:'folder_open', class: '' },
    { path: '/operateurs', title: 'Base operateurs',  icon:'search', class: '' },
    { path: 'https://tourisme-app.star-labs.bj/evaluation/', title: 'Evaluation',  icon:'library_books', class: '' },
    // { path: '#', title: 'Recherche',  icon:'autorenew', class: '' },
    { path: '/old_db', title: 'Ancienne Base operateurs',  icon:'search', class: '' },
    { path: '/users', title: 'Utilisateurs',  icon:'people', class: '' },

];
*/



export const HIDE_ROUTES: RouteInfo[] = [
  { path: '/regulations/:id', title: 'Détail Règlementation',  icon: '', class: '' },
  { path: '/regulation/add', title: 'Ajouter une Règlementation',  icon: '', class: '' },
  { path: '/infos/:id', title: 'Comment obtenir ??',  icon: '', class: '' },
  { path: '/info/add', title: 'Ajouter une information',  icon: '', class: '' },
  { path: '/trendings/:id', title: 'Détail Tendance ',  icon: '', class: '' },
  { path: '/trending/add', title: 'Ajouter une tendance',  icon: '', class: '' },
  { path: '/complaints/:id', title: 'Détail de la Plainte ',  icon: '', class: '' },
  { path: '/reclamations/:id', title: 'Détail de la reclamation ',  icon: '', class: '' },
  { path: '/user/add', title: 'Ajouter un utilisateur',  icon: '', class: '' },
  { path: '/competition/add', title: 'Ajouter un concours',  icon: '', class: '' },
  { path: '/competitions/:id', title: 'Détail compétition',  icon: '', class: '' },
  { path: '/list-demand-voyage', title: 'Liste des demandes du métier voyage',  icon:'', class: '' },
  { path: '/detail-demand-voyage/:id', title: 'Détail de la demande',  icon:'', class: '' },


];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor(private tokenStorage:TokenStorage) { }

  ngOnInit() {
        // this.menuItems = ROUTES.filter(menuItem => menuItem);

      console.log(this.menuItems)

    this.getUserRole();
  }

  UsetTokenInfo:any;
  userRole




  getUserRole(){


      try {
        console.log( jwt_decode(this.tokenStorage.getToken()))
          this.UsetTokenInfo=jwt_decode(this.tokenStorage.getToken());

          this.userRole=this.UsetTokenInfo.user_roles[0].name

      } catch(Error) {

          console.log("error")

      }


      switch (this.userRole){
          case "ROLE_ADMIN":
              this.menuItems = [
                  { path: '/dashboard', title: 'Tableau de bord',  icon: 'dashboard', class: '' },
                  { path: '/jobs', title: 'Metiers',  icon:'category', class: '' },
                  { path: '/regulations', title: 'Règlementations',  icon:'loyalty', class: ''  },
                  { path: '/trendings', title: 'Tendances',  icon:'library_books', class: '' },
                  // { path: '/infos', title: 'Comment obtenir ?',  icon:'announcement', class: '' },
                  { path: '/complaints', title: 'Plaintes',  icon:'notifications', class: ''},
                  { path: '/reclamations', title: 'Réclamations',  icon:'announcement', class: ''},
                  // { path: '/user-profile', title: 'User Profile',  icon:'person', class: ''},
                  { path: '/faq', title: 'FAQ',  icon:'question_mark', class: '' },
                  { path: '/competitions', title: 'Concours',  icon:'folder_open', class: '' },
                  { path: '/operateurs', title: 'Base operateurs',  icon:'search', class: '' },
                  { path: "getLinkWithExternal('https://tourisme-app.star-labs.bj/evaluation/')", title: 'Evaluation',  icon:'library_books', class: '' },
                  // { path: '#', title: 'Recherche',  icon:'autorenew', class: '' },
                  { path: '/old_db', title: 'Ancienne Base operateurs',  icon:'search', class: '' },
                  { path: '/users', title: 'Utilisateurs',  icon:'people', class: '' },

              ];
           break
          case "ROLE_COMMISSION_VISITE":
              this.menuItems = [
                  { path: '/dashboard', title: 'Tableau de bord',  icon: 'dashboard', class: '' },

                  { path: '/operateurs', title: 'Base operateurs',  icon:'search', class: '' },
                  { path: "getLinkWithExternal('https://tourisme-app.star-labs.bj/evaluation/')", title: 'Evaluation',  icon:'library_books', class: '' },
                  // { path: 'https://tourisme-app.star-labs.bj/evaluation/', title: 'Evaluation',  icon:'library_books', class: '' },

                  { path: '/old_db', title: 'Ancienne Base operateurs',  icon:'search', class: '' },

              ];
              break
          case "ROLE_AUDITEUR":
              this.menuItems = [
                  { path: '/dashboard', title: 'Tableau de bord',  icon: 'dashboard', class: '' },
                  { path: '/operateurs', title: 'Base operateurs',  icon:'search', class: '' },
                  { path: "getLinkWithExternal('https://tourisme-app.star-labs.bj/evaluation/')", title: 'Evaluation',  icon:'library_books', class: '' },
                  { path: '/old_db', title: 'Ancienne Base operateurs',  icon:'search', class: '' },

              ];
              break

          case "ROLE_ORGANE_TECH":
              this.menuItems = [
                  { path: '/dashboard', title: 'Tableau de bord',  icon: 'dashboard', class: '' },
                  { path: '/complaints', title: 'Plaintes',  icon:'notifications', class: ''},
                  { path: '/reclamations', title: 'Réclamations',  icon:'announcement', class: ''},
                  { path: '/operateurs', title: 'Base operateurs',  icon:'search', class: '' },
                  { path: "getLinkWithExternal('https://tourisme-app.star-labs.bj/evaluation/')", title: 'Evaluation',  icon:'library_books', class: '' },

                  { path: '/old_db', title: 'Ancienne Base operateurs',  icon:'search', class: '' },


              ];
           break

          case "ROLE_SECRETARIAT":
              this.menuItems = [
                  { path: '/dashboard', title: 'Tableau de bord',  icon: 'dashboard', class: '' },

                  { path: '/faq', title: 'FAQ',  icon:'question_mark', class: '' },

                  { path: '/operateurs', title: 'Base operateurs',  icon:'search', class: '' },

                  { path: '/old_db', title: 'Ancienne Base operateurs',  icon:'search', class: '' },


              ];
           break

      }


  }

    getLinkWithExternal(url){

      window.location.href=url;

    }


  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
