import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DetailTrendingComponent} from './detail-trending.component';
import { TrendingService } from '../../services/trending.service';
import { JobService } from '../../services/job.service';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
      //  DetailTrendingComponent
    ],
    exports: [
       // DetailTrendingComponent
    ],
    providers: [TrendingService,JobService],

})
export class DetailTrendingModule {}
