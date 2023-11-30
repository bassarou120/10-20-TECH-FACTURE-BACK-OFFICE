import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DetailActualiteComponent} from './detail-actualite.component';
import { ActualiteService } from '../../services/actualite.service';

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
    providers: [ActualiteService],
})
export class DetailActualiteModule {}
