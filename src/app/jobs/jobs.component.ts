import {Component,OnInit} from '@angular/core';
import { Job } from 'app/models/job';
import {JobService} from '../services/job.service';
import { HttpErrorResponse } from '@angular/common/http';


declare var $: any;
declare interface MetierInfo {
    jobIcon: string;
    titre: string;
    description: string;
    dt: number;
    dnt: number;
    link: string;
}

export const METIERS: MetierInfo[] = [
    { jobIcon: 'flight',titre: 'Agences de voyage', description: 'Tableau de bord Tableau de Tableau de bord',dt:0,dnt:0 ,link:'/list-demand-voyage'},
    { jobIcon: 'hotel',titre: 'Hotels', description: 'Tableau de bord Tableau de Tableau de bord',dt:0,dnt:0 ,link:'#'},
    { jobIcon: 'restaurant',titre: 'Restaurants et assimilés', description: 'Tableau de bord Tableau de Tableau de bord',dt:0,dnt:0,link:'#' },
    { jobIcon: 'person',titre: 'Guides touristiques', description: 'Tableau de bord Tableau de bTableau de bord',dt:0,dnt:0 ,link:'#'}
];

@Component({
    selector: 'app-jobs',
    templateUrl: './jobs.component.html',
    styleUrls: ['./jobs.component.styl']
})

export class JobsComponent implements OnInit {
    jobItems: any[];
    job:Job;
    treated: any[];
    untreated: any[];
  
    constructor(private jobService: JobService) {}

    
    stat(status:string): void {
        this.jobService.stat_by_demande_job(status).subscribe((data: Array<Job>) => {
            if(status=='traitee'){
               for (let index = 0; index < data['data'].length; index++) {
                const mt = data['data'][index].split(',');
                const metier = mt[0];
                switch (metier) {
                    case 'HEB':
                        this.jobItems[1].dt=mt[1]
                      break;
                    case 'AGV':
                        this.jobItems[0].dt=mt[1]
                      break;
                    case 'RES':
                        this.jobItems[2].dt=mt[1]
                      break;
                    case 'GUI':
                        this.jobItems[3].dt=mt[1]
                      break;
                  }
               }
                this.treated = data['data'];
            }
            else{
                for (let index = 0; index < data['data'].length; index++) {
                    const mt = data['data'][index].split(',');
                    const metier = mt[0];
                    switch (metier) {
                        case 'HEB':
                            this.jobItems[1].dnt=mt[1]
                          break;
                        case 'AGV':
                            this.jobItems[0].dnt=mt[1]
                          break;
                        case 'RES':
                            this.jobItems[2].dnt=mt[1]
                          break;
                        case 'GUI':
                            this.jobItems[3].dnt=mt[1]
                          break;
                      }
                   }
                    this.untreated = data['data'];
            }
                console.log(data['data'] );
            }, (error: HttpErrorResponse) => {
                console.log("Error while retrieving data");
            }
        )
    }
  
    ngOnInit() {
      this.jobItems = METIERS.filter(menuItem => menuItem);
       this.stat('traitee');
       this.stat('non traitee');
    }


}
