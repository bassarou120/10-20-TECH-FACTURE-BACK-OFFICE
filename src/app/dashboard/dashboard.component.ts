import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { CompetitionService } from 'app/services/competition.service';
import { ComplaintsService } from 'app/services/complaints.service';
import { ActualiteService } from 'app/services/actualite.service';
import { Regulation } from 'app/models/regulation';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Complaints } from 'app/models/complaints';
import {ParamettreImageService} from '../services/paramettre-image.service';
import {AdherantService} from '../services/adherant.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private  paramettreImageService:ParamettreImageService,
             private adherantService:AdherantService) { }

   
  regulations_count: number;  
 
  competitions_count: number;  
  competitions_passed_count: number;  
  
  complaints_count: number;
  complaint_untreated_count: number; 
  reclamation_count: number; 
  reclamation_untreated_count: number;
  competitions_passed: number;
  treated_complaints:number;
  spinner1= true;
  spinner2= true;
  spinner3= true;
  spinner4= true;
  spinner5= true;
  spinner6= true;
  spinner7= true;
  loading= true;
  total_complaint_spinner = true;
  total_reclamation_spinner = true;
  stat_data=[];
  complaints: Array<Complaints> = [];

  listCotisation
  listAdherant
  ngOnInit() {

    this.stat();
    this.getCotisation()
    this.getAdherant()
    setTimeout(() => {
      if(!this.spinner4 && !this.total_complaint_spinner)
        this.treated_complaints =  this.complaints_count - this.complaint_untreated_count;
      this.spinner1= false ;

      console.log(this.complaints_count,this.complaint_untreated_count);
    }, 10000);

  }

  stat(): void {
      this.paramettreImageService.getStat().subscribe((data: Array<any>) => {
        this.stat_data= data['data'];

        // alert(JSON.stringify(this.stat_data))
        this.loading= false;        
      }, (error: HttpErrorResponse) => {
        console.log("Error while retrieving data");
      }
      )
  }

  getCotisation(): void {
    this.paramettreImageService.getCotisation().subscribe((data: Array<any>) => {
          this.listCotisation= data['data'];

          // alert(JSON.stringify(this.stat_data))
          this.loading= false;
        }, (error: HttpErrorResponse) => {
          console.log("Error while retrieving data");
        }
    )
  }
  getAdherant(): void {
    this.adherantService.getAdherantlite().subscribe((data: Array<any>) => {
          this.listAdherant= data['data'].data;

          // alert(JSON.stringify(this.stat_data))
          this.loading= false;
        }, (error: HttpErrorResponse) => {
          console.log("Error while retrieving data");
        }
    )
  }




  formatDate(date:string){
    const d = date.split("T");
    return d[0]+' '+d[1].substr(0, 8);
  }



}
