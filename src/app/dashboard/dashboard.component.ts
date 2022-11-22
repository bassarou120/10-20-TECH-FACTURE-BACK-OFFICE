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

  complaints_count_oK: number;
  complaints_count_no: number;
  regulations_count: number;
  competitions_count: number;
  complaints: Array<Complaints> = [];
    complaints_counts:Array<any>=[]

  getRegCount(): void {
    this.regulationService.total_reglementation().subscribe((data: Array<Regulation>) => {
          this.regulations_count = data['data'];
        }, (error: HttpErrorResponse) => {
          console.log("Error while retrieving data");
        }
    )
  }

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

        // console.log(data);
          this.complaints_count_oK = (data['data'][0] - data['data'][1]);
          this.complaints_count_no =data['data'][1];

         // alert(JSON.stringify(  this.complaints_counts))


        }, (error: HttpErrorResponse) => {
          console.log("Error while retrieving data");
        }
    )
  }

  getList(): void {
    this.complaintsService.list().subscribe((data: Array<Complaints>) => {
          this.complaints = data['data'].slice(0,6);
          console.log(this.complaints );
        }, (error: HttpErrorResponse) => {
          console.log("Error while retrieving data");
        }
    )
  }

  ngOnInit() {
    this.getRegCount();
    this.getComCount();
    this.getComplCount();
    this.getList();
  }


}
