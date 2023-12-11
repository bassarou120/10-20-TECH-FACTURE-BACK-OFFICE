import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FactureComponent} from './facture.component';
import { ClientService } from '../../services/client.service';
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
    providers: [ClientService],

})
export class FactureModule {}
