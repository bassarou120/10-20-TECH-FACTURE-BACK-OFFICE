import {Component,OnInit} from '@angular/core';
import { InfosService } from '../../services/infos.service';
import { Infos } from 'app/models/infos';
import { Job } from 'app/models/job';
import { JobService } from 'app/services/job.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-infos',
    templateUrl: './infos.component.html',
    styleUrls: ['./infos.component.styl']
})
export class InfosComponent implements OnInit  {
    constructor(private infosService:InfosService,private jobService: JobService,private router: Router) {}
    infos: Array<Infos> = [];
    jobs: Array<Job> = [];

    getList(): void {
        this.infosService.list().subscribe((data: Array<Infos>) => {
          this.infos = data['data'];
        }, (error: HttpErrorResponse) => {
          console.log("Error while retrieving data");
        }
        )
      }
    getJobList(): void {
        this.jobService.list().subscribe((data: Array<Job>) => {
          this.jobs = data['data'];
        }, (error: HttpErrorResponse) => {
          console.log("Error while retrieving data");
        }
        )
    }

    ngOnInit() {
        this.getJobList();
        this.getList();
    }

    edit(id:number){
      this.router.navigate(['/info/add',{id:id}])
  } 
}