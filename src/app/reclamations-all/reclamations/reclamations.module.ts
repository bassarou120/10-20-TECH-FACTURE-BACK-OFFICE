import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReclamationsComponent} from './reclamations.component';
import { ComplaintsService } from '../../services/complaints.service';
import { JobService } from '../../services/job.service';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
       // ReclamationsComponent
    ],
    exports: [
       // ReclamationsComponent
    ],
    providers: [ComplaintsService,JobService],
})
export class ReclamationsModule {}
