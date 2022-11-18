import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DetailInfoComponent} from './detail-info.component';
import { InfosService } from '../../services/infos.service';


@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        //DetailRegulationComponent
    ],
    exports: [
       // DetailRegulationComponent
    ],
    providers: [InfosService],
})
export class DetailInfoModule {}
