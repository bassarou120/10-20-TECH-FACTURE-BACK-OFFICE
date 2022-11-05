import {Component,OnInit} from '@angular/core';

@Component({
    selector: 'app-faq',
    templateUrl: './faq.component.html',
    styleUrls: ['./faq.component.styl']
})
export class FaqComponent implements OnInit  {
    constructor() { }
    ngOnInit() {
        $('#add_faq_btn').click(function(){
            alert('alert');
        })
    }
}
