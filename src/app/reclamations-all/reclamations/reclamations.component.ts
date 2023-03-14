import { Component, OnInit,ViewChild } from '@angular/core';
import { Complaints } from 'app/models/complaints';
import { Job } from 'app/models/job';
import { ComplaintsService } from '../../services/complaints.service';
import { JobService } from '../../services/job.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

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
  
    spinner = true;
    displayedColumns = [
        'id',
        'name',
        'email',
        'job',
        'objet',
        'statut',
        'action'
    ];
    dataSource: MatTableDataSource<Complaints>;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

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
        this.dataSource = new MatTableDataSource(data['data']);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.setPaginationLabelToFrench();
        this.spinner = false;
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
  
    applyFilter(filterValue: string) {
      filterValue = filterValue.trim(); // Remove whitespace
      filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
      this.dataSource.filter = filterValue;
  }

  setPaginationLabelToFrench() {
      this.paginator._intl.itemsPerPageLabel = 'Elements par page:';
      this.paginator._intl.nextPageLabel = 'Page suivante';
      this.paginator._intl.previousPageLabel = 'Page précédente';
      this.paginator._intl.getRangeLabel = this.frenchRangeLabel;
  }

  frenchRangeLabel(page: number, pageSize: number, length: number): string {
      if (length === 0 || pageSize === 0) {
          return `0 sur ${length}`;
      }

      length = Math.max(length, 0);

      const startIndex = page * pageSize;

      // If the start index exceeds the list length, do not try and fix the end index to the end.
      const endIndex = startIndex < length ?
          Math.min(startIndex + pageSize, length) :
          startIndex + pageSize;

      return `${startIndex + 1} - ${endIndex} sur ${length}`;
  }
  
}
