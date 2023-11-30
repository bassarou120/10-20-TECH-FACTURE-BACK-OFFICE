import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FromationComponent} from './fromation.component';
import { ActualiteService } from '../../services/actualite.service';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
    imports: [
        CommonModule,
        MatSelectModule
    ],
    declarations: [
       // ParamettreGeneralComponent
    ],
    exports: [
        //ParamettreGeneralComponent
    ],
    providers: [ActualiteService],

})
export class FromationModule {}
