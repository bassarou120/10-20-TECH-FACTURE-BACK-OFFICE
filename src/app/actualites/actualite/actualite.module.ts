import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActualiteComponent} from './actualite.component';
import { ActualiteService } from '../../services/actualite.service';
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
export class ActualiteModule {}
