import {Component,OnInit} from '@angular/core';

declare const $: any;
declare interface Type {
    value: string;
    label: string;
}
export const TYPES: Type[] = [
    { value: 'Decret', label: 'Decret' },
    { value: 'Arrete', label: 'Arreté' },
    { value: 'Loi', label: 'Loi' },
    { value: 'Article', label: 'Article' },
];

declare interface Job {
    value: string;
    label: string;
}
export const JOBS: Job[] = [ 
    { value: 'Voyage', label: 'agence de voyage' },
    { value: 'Hebergement', label: 'Hebergement touristique' },
    { value: 'Restoration', label: 'Etablissement de restauration' },
    { value: 'Guide', label: 'Guide touristique' },

];


@Component({
    selector: 'add-trending',
    templateUrl: './add-trending.component.html',
    styleUrls: ['./add-trending.component.styl']
})
export class AddTrendingComponent  implements OnInit {
    types: any[];
    jobs: any[];
  
    constructor() { }
  
    ngOnInit() {
        this.types = TYPES.filter(type => type);
        this.jobs = JOBS.filter(job => job);

    }
   
};