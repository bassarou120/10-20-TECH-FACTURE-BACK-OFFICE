import {Component} from '@angular/core';
import { ComplaintsService } from '../../services/complaints.service';
import { JobService } from '../../services/job.service';
import { Complaints } from 'app/models/complaints';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'detail-complaint',
    templateUrl: './detail-complaint.component.html',
    styleUrls: ['./detail-complaint.component.styl']
})
export class DetailComplaintComponent {
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
      formatDate(date:string){
        const d = date.split("T");
        return d[0]+' '+d[1].substr(0, 8);
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
