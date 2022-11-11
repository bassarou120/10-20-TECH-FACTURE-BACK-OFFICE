import {Component,OnInit} from '@angular/core';
import { FormControl, Validators,FormGroup } from '@angular/forms';
@Component({
    selector: 'app-faq',
    templateUrl: './faq.component.html',
    styleUrls: ['./faq.component.styl']
})
export class FaqComponent implements OnInit  {
    constructor() {}

    display = "none";
    displayShowModal = "none";
  
     faqForm = new FormGroup({
      question: new FormControl('',Validators.required),
      answer: new FormControl('', Validators.required)
     }); 

     openModal(id?: number) {
        if(id){
            $('#modal_title').html("Editer un FAQ");
            $('id_faq').val(id);
        }
        else{
            $('#modal_title').html("Ajouter un FAQ");
            $('id_faq').val('');
        }
    
        this.display = "block";
      }
      onCloseHandled() {
        this.display = "none";
      }

      openShowModal(id:number) {
        this.displayShowModal = "block";
      }
      onCloseHandledShowModal() {
        this.displayShowModal = "none";
      }

      deleteElement(id:number){
        window['showSuccessNotification']('Suppression réussie !!');
      }

      hideElement(id:number){
        window['showSuccessNotification']('Element masquer du site !!');
      }

     
    ngOnInit() {
  
    }

    onClickSubmit(): void {
      if(!this.faqForm.invalid){
        console.log('Question:' + this.faqForm.get('question').value);
        console.log('Answer:' + this.faqForm.get('answer').value);
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

    get question(): any {
      return this.faqForm.get('question');
    }
    get answer(): any {
      return this.faqForm.get('answer');
    }
 
}
