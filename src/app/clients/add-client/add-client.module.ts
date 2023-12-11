import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { ClientService } from '../../services/client.service';



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
    providers: [ClientService],
})
export class AddClientModule {}
 