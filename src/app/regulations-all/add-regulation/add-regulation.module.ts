import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { RegulationService } from '../../services/regulation.service';
import { JobService } from 'app/services/job.service';


@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
       // AddRegulationComponent
    ],
    exports: [
        //AddRegulationComponent
    ],
    providers: [RegulationService,JobService],
})
export class AddRegulationModule {}
 