import {Component} from '@angular/core';
import { ComplaintsService } from '../../services/complaints.service';
import { JobService } from '../../services/job.service';
import { Complaints } from 'app/models/complaints';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'detail-reclamation',
    templateUrl: './detail-reclamation.component.html',
    styleUrls: ['./detail-reclamation.component.styl']
})
export class DetailReclamationComponent {
    constructor(private complaintsService:ComplaintsService,private jobService: JobService,private activatedRoute: ActivatedRoute) {}
 
    complaints: Complaints;
    id:number;

    getComplaint(id:number): void {
        this.complaintsService.getById(id).subscribe((data: Array<Complaints>) => {
          this.complaints = data['data'];
        }, (error: HttpErrorResponse) => {
          console.log("Error while retrieving data");
        }
        )
      }
    
    ngOnInit() {
        this.activatedRoute.params.subscribe(params => {
            const id = params['id'];
            if(id){
              this.getComplaint(id);
            }
        })
      } 
}
