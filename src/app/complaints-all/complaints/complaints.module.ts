import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { ComplaintsService } from '../../services/complaints.service';
import { JobService } from '../../services/job.service';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';


@NgModule({
    imports: [
        CommonModule,
     
    ],
    declarations: [
       // FaqComponent
    ],
    exports: [
       // FaqComponent
       MatTableModule,
    
    ],
    providers: [ComplaintsService,JobService],
})
export class ComplaintsModule {}
