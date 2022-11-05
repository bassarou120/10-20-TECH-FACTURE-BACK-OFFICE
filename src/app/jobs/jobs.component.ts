import {Component,OnInit} from '@angular/core';

declare var $: any;
declare interface MetierInfo {
    jobIcon: string;
    titre: string;
    description: string;
}

export const METIERS: MetierInfo[] = [
    { jobIcon: 'flight',titre: 'Agences de voyage', description: 'Tableau de bord Tableau de bTableau de bord' },
    { jobIcon: 'hotel',titre: 'Hotels', description: 'Tableau de bord Tableau de bTableau de bord' },
    { jobIcon: 'restaurant',titre: 'Restaurants et assimilés', description: 'Tableau de bord Tableau de bTableau de bord' },
    { jobIcon: 'person',titre: 'Guides touristiques', description: 'Tableau de bord Tableau de bTableau de bord' }
];

@Component({
    selector: 'app-jobs',
    templateUrl: './jobs.component.html',
    styleUrls: ['./jobs.component.styl']
})

export class JobsComponent implements OnInit {
    jobItems: any[];
  
    constructor() { }
  
    ngOnInit() {
      this.jobItems = METIERS.filter(menuItem => menuItem);
    }
}
