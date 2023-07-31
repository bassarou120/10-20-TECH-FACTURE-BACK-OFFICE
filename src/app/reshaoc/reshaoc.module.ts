import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReshaocComponent} from './reshaoc.component';
import { ActualiteService } from '../services/actualite.service';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
    imports: [
        CommonModule,
        MatSelectModule
    ],
    declarations: [
       // ReshaocComponent
    ],
    exports: [
        //ReshaocComponent
    ],
    providers: [ActualiteService],

})
export class ReshaocModule {}