import {Component} from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { CompetitionService } from '../../services/competition.service';
import { Competition } from 'app/models/competition';

@Component({
    selector: 'competitions',
    templateUrl: './competitions.component.html',
    styleUrls: ['./competitions.component.styl']
})
export class CompetitionsComponent {
    
    constructor(private competitionService:CompetitionService,private router: Router,
        private activeRoute: ActivatedRoute) {}
        competitions:  Array<Competition>=[];

    typeNotificationForm: string;
    messageNotificationForm: string;
    isNotificationForm: boolean = false;
  
    ngOnInit() {
        this.getList();
    }

    getList():void{
        this.competitionService.list().subscribe((data:Array<Competition>)=>{
            this.competitions=data['data'];
        },(error: HttpErrorResponse)=>{
            console.log("Error while retrieving data");   
        } 
        )
    }
   
    edit(id:number){
      
        this.router.navigate(['/competition/add',{id:id}])
    }

    deleteElement(id:number){
        this.competitionService.delete(id).subscribe(response => {
          this.notificationForm( "success", "Supression réussi !");
          this.getList();
         },(error: HttpErrorResponse)=>{
          console.log("Error while deleting data");   
        } ) 
     }

      hideElement(id:number){
        this.competitionService.hide(id).subscribe(response => {
            console.log('hide');
          this.notificationForm( "success", "Statut modifier avec succes !");
          this.getList();
         },(error: HttpErrorResponse)=>{
          console.log("Error while hidden data");   
          this.notificationForm( "danger", "Error de modification du statut !");
        } )
      }


    notificationForm(type: string, msg: string) {
        this.typeNotificationForm = type;
        this.messageNotificationForm = msg;
        this.isNotificationForm = true;
    }
  
      closeNotificationForm() {
          this.isNotificationForm = false;
      }
  
}
