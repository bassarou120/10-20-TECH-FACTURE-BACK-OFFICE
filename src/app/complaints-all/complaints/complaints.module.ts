import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { ComplaintsService } from '../../services/complaints.service';
import { JobService } from '../../services/job.service';


@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
       // FaqComponent
    ],
    exports: [
       // FaqComponent
    ],
    providers: [ComplaintsService,JobService],
})
export class ComplaintsModule {}
