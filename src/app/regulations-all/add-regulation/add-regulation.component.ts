import {Component,OnInit} from '@angular/core';
import { FormControl, Validators,FormGroup } from '@angular/forms';
import {EditorComponent} from '../../components/editor/editor.component';


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
    selector: 'add-regulation',
    templateUrl: './add-regulation.component.html',
    styleUrls: ['./add-regulation.component.styl']
})
export class AddRegulationComponent  implements OnInit {
  
    types: any[];
    jobs: any[];
  
    constructor() { }
  
    regulationForm = new FormGroup({
        titre: new FormControl('',Validators.required),
        type: new FormControl('', Validators.required),
        job: new FormControl('', Validators.required),
        img: new FormControl(''),
        file: new FormControl(''),
       }); 

        ngOnInit() {
            this.types = TYPES.filter(type => type);
            this.jobs = JOBS.filter(job => job);
        
        }
   
      changeJob(e: any) {
        this.job?.setValue(e.target.value, {
          onlySelf: true,
        });
      }
      changeType(e: any) {
        this.type?.setValue(e.target.value, {
          onlySelf: true,
        });
      }
      get titre(): any {
        return this.regulationForm.get('titre');
      }
      get type(): any {
        return this.regulationForm.get('type');
      }
      get job(): any {
        return this.regulationForm.get('job');
      }
    
      onClickSubmit(): void {
        if(!this.regulationForm.invalid){
            $('#sbt_btn').addClass('disabled');
            $('#spinner').removeClass('d-none')
          
            setTimeout(function () {
                $('#sbt_btn').removeClass('disabled');
                $('#spinner').addClass('d-none')
                window['showSuccessNotification']('Enregistrement reussie');
            }, 5000);
            //this.onCloseHandled();
        }
      
    
      } 
   
};