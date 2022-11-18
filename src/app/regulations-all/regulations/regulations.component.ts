import { Component,Renderer2, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { RegulationService } from '../../services/regulation.service';
import { Regulation } from 'app/models/regulation';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
    selector: 'app-regulations',
    templateUrl: './regulations.component.html',
    styleUrls: ['./regulations.component.styl']
})
export class RegulationsComponent implements OnInit  {
    constructor(private regulationService:RegulationService,private router: Router,
        private activeRoute: ActivatedRoute) {}
    regs:  Array<Regulation>=[];

    typeNotificationForm: string;
    messageNotificationForm: string;
    isNotificationForm: boolean = false;
  
    ngOnInit() {
        this.getList();
    }

    getList():void{
        this.regulationService.list().subscribe((data:Array<Regulation>)=>{
            this.regs=data['data'];
        },(error: HttpErrorResponse)=>{
            console.log("Error while retrieving data");   
        } 
        )
    }
   
    edit(id:number){
        // this.router.navigate(['/regulation/add'], { queryParams: {
        //     id: id
        // }});
        this.router.navigate(['/regulation/add',{id:id}])
    }

    deleteElement(id:number){
        this.regulationService.delete(id).subscribe(response => {
          this.notificationForm( "success", "Supression réussi !");
          this.getList();
         },(error: HttpErrorResponse)=>{
          console.log("Error while deleting data");   
        } ) 
     }

      hideElement(id:number){
        this.regulationService.hide(id).subscribe(response => {
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

