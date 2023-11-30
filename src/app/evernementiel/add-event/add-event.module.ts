import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { ActualiteService } from '../../services/actualite.service';
import { JobService } from 'app/services/job.service';


@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
       // AddActivitePharreComponent
    ],
    exports: [
        //AddActivitePharreComponent
    ],
    providers: [ActualiteService,JobService],
})
export class AddEventModule {}
 