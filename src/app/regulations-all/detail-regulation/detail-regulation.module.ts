import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DetailRegulationComponent} from './detail-regulation.component';
import { RegulationService } from '../../services/regulation.service';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
       // DetailRegulationComponent
    ],
    exports: [
       // DetailRegulationComponent
    ],
    providers: [RegulationService],
})
export class DetailRegulationModule {}
