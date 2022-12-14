import {Component} from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Competition } from 'app/models/competition';
import {CompetitionService} from 'app/services/competition.service';

@Component({
    selector: 'detail-competition',
    templateUrl: './detail-competition.component.html',
    styleUrls: ['./detail-competition.component.styl']
})
export class DetailCompetitionComponent {
    constructor(private competitionService:CompetitionService,private activatedRoute: ActivatedRoute) {}
    competition: Competition;  
    id:number;


   getCompetition(id:number): void {
       this.competitionService.getById(id).subscribe((data: Array<Competition>) => {
         this.competition = data['data'];
         console.log(this.competition );
       }, (error: HttpErrorResponse) => {
         console.log("Error while retrieving data");
       }
       )
    }
   
   ngOnInit() {
       this.activatedRoute.params.subscribe(params => {
           const id = params['id'];
           if(id){
             this.getCompetition(id);
           }
       })
     }
}
