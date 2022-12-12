import { Component, OnInit } from '@angular/core';
import { Complaints } from 'app/models/complaints';
import { Job } from 'app/models/job';
import { ComplaintsService } from '../../services/complaints.service';
import { JobService } from '../../services/job.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'reclamations',
    templateUrl: './reclamations.component.html',
    styleUrls: ['./reclamations.component.styl']
})
export class ReclamationsComponent  implements  OnInit{
    constructor(private complaintsService:ComplaintsService,private jobService: JobService) {}
 
    complaints: Array<Complaints> = [];
    jobs: Array<Job> = [];
    selected_faq: any;
    type:string = 'reclamation';

    typeNotificationForm: string;
    messageNotificationForm: string;
    isNotificationForm: boolean = false;
  
    display = "none";
  
    complaintForm = new FormGroup({
      action: new FormControl('')
    });
  
    openModal(id_element?: number) {
      if (id_element) {
       
        var el = this.complaints.find(x => x.id == id_element);
        this.selected_faq = el;
  
        this.complaintForm.patchValue({
          action: el.action
        }); 
    
      }
      this.display = "block";
    }
  
    getList(): void {
      this.complaintsService.list(this.type).subscribe((data: Array<Complaints>) => {
        this.complaints = data['data'];
        console.log(this.complaints );
      }, (error: HttpErrorResponse) => {
        console.log("Error while retrieving data");
      }
      )
    }
  
    ngOnInit() {
      this.getList();
    }


    deleteElement(id:number){
      this.complaintsService.delete(id).subscribe(response => {
        this.notificationForm( "success", "Supression réussi !");
        this.getList();
       },(error: HttpErrorResponse)=>{
        console.log("Error while deleting data");   
      } )
   }

  
    changeStatutElement(id:number){
      this.complaintsService.changeStatut(id).subscribe(response => {
        this.notificationForm( "success", "Statut modifier avec succes !");
        this.getList();
       },(error: HttpErrorResponse)=>{
        console.log("Error while hidden data");   
        this.notificationForm( "danger", "Error de modification du statut !");
      } )
    }
  
    onClickSubmit(): void {
  
      $('#sbt_btn').removeClass('disabled');
      $('#spinner').addClass('d-none')
         const formData = this.complaintForm.value;
         this.selected_faq =  this.complaintsService.edit(
          new Complaints(
            this.selected_faq.type, 
            this.selected_faq.firstname, 
            this.selected_faq.lastname, 
            this.selected_faq.email, 
            this.selected_faq.phone_number, 
            this.selected_faq.relative_contact, 
            this.selected_faq.objet, 
            this.selected_faq.complaint, 
            this.selected_faq.actor, 
            this.selected_faq.statut, 
            formData.action, 
            ),
          this.selected_faq.id,
        ).subscribe(response => {
            this.notificationForm(
              "success",
              "Modification réussi !"
            );

  
            this.getList();
            this.display = "none";
          }, (error: HttpErrorResponse) => {
            console.log("Error while retrieving data");
          })
      
  
          $('#sbt_btn').removeClass('disabled');
          $('#spinner').addClass('d-none')
  
      // }
  
    }

    notificationForm(type: string, msg: string) {
      this.typeNotificationForm = type;
      this.messageNotificationForm = msg;
      this.isNotificationForm = true;
    }
  
    closeNotificationForm() {
      this.isNotificationForm = false;
    }
  
    onCloseHandled() {
      this.display = "none";
    }
  
  
  
}
