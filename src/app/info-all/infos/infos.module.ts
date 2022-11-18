import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InfosComponent} from './infos.component';
import { InfosService } from '../../services/infos.service';
import { JobService } from 'app/services/job.service';



@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
       // InfosComponent
    ],
    exports: [
      //  InfosComponent
    ],
    providers: [InfosService,JobService],
})
export class InfosModule {}
