import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AddTrendingComponent} from './add-trending.component';
import { TrendingService } from '../../services/trending.service';
import { JobService } from 'app/services/job.service';


@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
       // AddRegulationComponent
    ],
    exports: [
       // AddRegulationComponent
    ],
    providers: [TrendingService,JobService],
})
export class AddTrendingModule {}
 