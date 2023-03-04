import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RegulationsComponent} from './regulations.component';
import { RegulationService } from '../../services/regulation.service';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
    imports: [
        CommonModule,
        MatSelectModule
    ],
    declarations: [
       // RegulationsComponent
    ],
    exports: [
        //RegulationsComponent
    ],
    providers: [RegulationService],

})
export class RegulationsModule {}
