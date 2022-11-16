import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FaqComponent} from './faq.component';
import { FaqService } from '../../services/faq.service';
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
    providers: [FaqService,JobService],
})
export class FaqModule {}
