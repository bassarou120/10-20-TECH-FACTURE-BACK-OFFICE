import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DetailReclamationComponent} from './detail-reclamation.component';
import { ComplaintsService } from '../../services/complaints.service';
import { JobService } from '../../services/job.service';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        //DetailReclamationComponent
    ],
    exports: [
       // DetailReclamationComponent
    ],
    providers: [ComplaintsService,JobService],
})
export class DetailReclamationModule {}
