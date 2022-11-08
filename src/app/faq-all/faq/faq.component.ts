import {Component,OnInit} from '@angular/core';
import { FuncsService } from '../../services/funcs.services';
@Component({
    selector: 'app-faq',
    templateUrl: './faq.component.html',
    styleUrls: ['./faq.component.styl']
})
export class FaqComponent implements OnInit  {
    constructor() {}

    display = "none";
    displayShowModal = "none";
     
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
        //  $('#add_faq_form').submit(function(e){
        //     e.preventDefault();
        //     $('#sbt_btn').addClass('disabled');
        //     $('#spinner').removeClass('d-none')
        //     setTimeout(function () {
        //         $('#sbt_btn').removeClass('disabled');
        //         $('#spinner').addClass('d-none')
        //     }, 5000);
        //     this.onCloseHandled();
        //   })
    
    }
    onClickSubmit(data) {
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
