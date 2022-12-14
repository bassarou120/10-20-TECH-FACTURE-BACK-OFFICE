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

  complaints: Array<Complaints> = [];

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
    }, (error: HttpErrorResponse) => {
      console.log("Error while retrieving data");
    }
    )
  }

  getComplCount(): void {
    this.complaintsService.total_complaints().subscribe((data: Array<Regulation>) => {
      this.complaints_count = data['data'];
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

  getUntreatedComplCount(): void {
    this.complaintsService.unTreated_complaints().subscribe((data: Array<Regulation>) => {
      this.complaint_untreated_count = data['data'];
    }, (error: HttpErrorResponse) => {
      console.log("Error while retrieving data");
    }
    )
  }

  getReclaCount(): void {
    this.complaintsService.total_reclamations().subscribe((data: Array<Regulation>) => {
      this.reclamation_count = data['data'];
    }, (error: HttpErrorResponse) => {
      console.log("Error while retrieving data");
    }
    )
  }

  getReclaUntreatCount(): void {
    this.complaintsService.unTreated_reclamations().subscribe((data: Array<Regulation>) => {
      this.reclamation_untreated_count = data['data'];
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
    this.getReclaCount();
    this.getComplCount();
    this.getList();
    this.getUntreatedComplCount();
    this.getReclaUntreatCount();
    this.getPendingCompCount();
    this.getPassedCompCount();
    this.getPassedCompetition();
    
  }
    

}
