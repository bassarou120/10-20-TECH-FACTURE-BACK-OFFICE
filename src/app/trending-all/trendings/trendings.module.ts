import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { TrendingService } from '../../services/trending.service';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
       // TrendingsComponent
    ],
    exports: [
        //TrendingsComponent
    ],
    providers: [TrendingService],
})
export class TrendingsModule {}
