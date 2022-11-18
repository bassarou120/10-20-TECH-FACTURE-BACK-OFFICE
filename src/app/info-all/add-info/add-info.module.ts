import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AddInfoComponent} from './add-info.component';
import { InfosService } from '../../services/infos.service';
import { JobService } from '../../services/job.service';


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
    providers: [InfosService,JobService],
})
export class AddInfoModule {}
 