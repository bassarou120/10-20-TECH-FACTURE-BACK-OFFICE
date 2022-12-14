import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {JobsComponent} from './jobs.component';
import { JobService } from '../services/job.service';


@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        //JobsComponent
    ],
    exports: [
        //JobsComponent
    ],
    providers: [JobService],
})
export class JobsModule {}
