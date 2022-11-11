import { Component,Renderer2, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
    selector: 'app-regulations',
    templateUrl: './regulations.component.html',
    styleUrls: ['./regulations.component.styl']
})
export class RegulationsComponent implements OnInit  {
    //dtOptions: DataTables.Settings = {};

    constructor() {
        
     }
    ngOnInit() {
    
        // this.dtOptions = {
        //     pagingType: 'full_numbers',
        //     pageLength: 5,
        //     processing: true
        //   };
    }
}

