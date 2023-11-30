import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PartenariatComponent} from './partenariat.component';
import { ActualiteService } from '../../services/actualite.service';
import { MatSelectModule } from '@angular/material/select';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

@NgModule({
    imports: [
        CommonModule,
        MatSelectModule,
        MatSlideToggleModule
    ],
    declarations: [
       // ParamettreGeneralComponent
    ],
    exports: [
        //ParamettreGeneralComponent
    ],
    providers: [ActualiteService],

})
export class PartenariatModule {}
