import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DetailComplaintComponent} from './detail-complaint.component';
import { ComplaintsService } from '../../services/complaints.service';
import { JobService } from '../../services/job.service';
@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
       // DetailComplaintComponent
    ],
    exports: [
       // DetailComplaintComponent
    ],
    providers: [ComplaintsService,JobService],

})
export class DetailComplaintModule {}
