import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CompetitionsComponent} from './competitions.component';
import { CompetitionService } from 'app/services/competition.service';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
      //  CompetionsComponent
    ],
    exports: [
       // CompetionsComponent
    ],
    providers: [CompetitionService],
})
export class CompetitionsModule {}
