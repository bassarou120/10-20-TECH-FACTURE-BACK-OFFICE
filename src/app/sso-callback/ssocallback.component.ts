import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { CompetitionService } from 'app/services/competition.service';
import { ComplaintsService } from 'app/services/complaints.service';
import { RegulationService } from 'app/services/regulation.service';
import { Regulation } from 'app/models/regulation';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Complaints } from 'app/models/complaints';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-sso',
  templateUrl: './ssocallback.component.html',
  styleUrls: ['./ssocallback.component.html']
})
export class SsocallbackComponent implements OnInit {

  constructor(private route: ActivatedRoute,private http: HttpClient) {}


    headers = new HttpHeaders({
        'Authorization':  'Basic bXRjYWxpY2VuY2U6bXRjYWxpY2VuY2U=',
        'Content-Type': 'application/x-www-form-urlencoded'
    });

 code:string


  ngOnInit() {

    this.route.queryParams
        .subscribe(params => {
              console.log(params.code);

              // { orderby: "price" }
           this.code=params.code;
            }
        );

      this.getSsoToken();
  }


  getSsoToken(){



      this.http.post( 'https://pprodofficial.service-public.bj/api/official/token',
          {
              'grant_type':'authorization_code',
              'redirect_uri': environment.ssoUrlCallback,
              'code':this.code

          },
          {headers: this.headers})
          .subscribe(
              (data:any)=>{
                 console.log(data)
              },(error: HttpErrorResponse)=>{
                  console.log("Error while retrieving data");
              }
          )
  }


    

}
