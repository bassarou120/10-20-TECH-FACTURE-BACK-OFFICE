import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { CompetitionService } from 'app/services/competition.service';
import { ComplaintsService } from 'app/services/complaints.service';
import { RegulationService } from 'app/services/regulation.service';
import { Regulation } from 'app/models/regulation';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Complaints } from 'app/models/complaints';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private competitionService: CompetitionService,private complaintsService: ComplaintsService,private regulationService:RegulationService) { }

   
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

  stat(): void {
      this.complaintsService.stat().subscribe((data: Array<Regulation>) => {
        this.stat_data= data['data'];
        this.loading= false;        
      }, (error: HttpErrorResponse) => {
        console.log("Error while retrieving data");
      }
      )
  }

  getRegCount(): void {
    this.regulationService.total_reglementation().subscribe((data: Array<Regulation>) => {
      this.regulations_count = data['data'];
    }, (error: HttpErrorResponse) => {
      console.log("Error while retrieving data");
    }
    )
}
  //en cours
  getComCount(): void {
    this.competitionService.total_competition().subscribe((data: Array<Regulation>) => {
      this.competitions_count = data['data'];
      this.spinner5 = false ;
    }, (error: HttpErrorResponse) => {
      console.log("Error while retrieving data");
    }
    )
  }

  getComplCount(): void {
    this.complaintsService.total_complaints().subscribe((data: Array<Regulation>) => {
      this.complaints_count = data['data'];
      this.total_complaint_spinner= false ;
    }, (error: HttpErrorResponse) => {
      console.log("Error while retrieving data");
    }
    )
  }

  getPendingCompCount(): void {
    this.competitionService.total_competition().subscribe((data: Array<Regulation>) => {
      //this.complaints_count = data['data'];
      this.competitions_count = data['data'];
      
    }, (error: HttpErrorResponse) => {
      console.log("Error while retrieving data");
    }
    )
  }

  getPassedCompetition():void{
    this.competitionService.passed_competition().subscribe((data: Array<Regulation>) => {
      this.  competitions_passed_count  = data['data'];
      this.spinner7 = false;
    }, (error: HttpErrorResponse) => {
      console.log("Error while retrieving data");
    }
    )
  }

  getPassedCompCount(): void {
    this.competitionService.pending_competition().subscribe((data: Array<Regulation>) => {
      this.complaints_count = data['data'];
    }, (error: HttpErrorResponse) => {
      console.log("Error while retrieving data");
    }
    )
  }



  getReclaCount(): void {
    this.spinner2= true;
    this.complaintsService.total_reclamations().subscribe((data: Array<Regulation>) => {
      this.reclamation_count = data['data'];
      this.spinner2= false;
    }, (error: HttpErrorResponse) => {
      console.log("Error while retrieving data");
    }
    )
  }

  getReclaUntreatCount(): void {
    this.complaintsService.unTreated_reclamations().subscribe((data: Array<Regulation>) => {
      this.reclamation_untreated_count = data['data'];
      this.spinner3 = false ;
    }, (error: HttpErrorResponse) => {
      console.log("Error while retrieving data");
    }
    )
  }
  
  getList(): void {
    this.complaintsService.list().subscribe((data: Array<Complaints>) => {
      this.complaints = data['data'].slice(0,6);
      // console.log(this.complaints );
    }, (error: HttpErrorResponse) => {
      console.log("Error while retrieving data");
    }
    )
  }

  formatDate(date:string){
    const d = date.split("T");
    return d[0]+' '+d[1].substr(0, 8);
  }

  ngOnInit() {
  // this.getRegCount();
    this.getComCount();
    // this.getReclaCount();
    // this.getComplCount();
    this.getList();
    // this.getReclaUntreatCount();
    // this.getPendingCompCount();
    // this.getPassedCompCount();
    this.getPassedCompetition();

    this.stat();
    setTimeout(() => {
      if(!this.spinner4 && !this.total_complaint_spinner)
      this.treated_complaints =  this.complaints_count - this.complaint_untreated_count;
      this.spinner1= false ;

      console.log(this.complaints_count,this.complaint_untreated_count);
    }, 10000);
  
 }
    

}
