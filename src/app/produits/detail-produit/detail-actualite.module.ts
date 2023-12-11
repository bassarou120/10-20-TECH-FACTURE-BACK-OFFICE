import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DetailActualiteComponent} from './detail-actualite.component';
import { ClientService } from '../../services/client.service';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
       // DetailDocumentComponent
    ],
    exports: [
       // DetailDocumentComponent
    ],
    providers: [ClientService],
})
export class DetailActualiteModule {}
