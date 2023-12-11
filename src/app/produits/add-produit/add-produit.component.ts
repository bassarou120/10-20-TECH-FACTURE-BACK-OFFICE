import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Job } from 'app/models/job';
import { Regulation } from 'app/models/regulation';


import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';


import {ProduitService} from '../../services/produit.service';


declare const $: any;
declare interface Type {
  value: string;
  label: string;
}


@Component({
  selector: 'add-regulation',
  templateUrl: './add-produit.component.html',
  styleUrls: ['./add-produit.component.styl']
})
export class AddProduitComponent implements OnInit {


  types: any[];

  action: string = "add";
  typeNotificationForm: string;
  messageNotificationForm: string;
  isNotificationForm: boolean = false;

  typeclient:any

  client: any
  imgToUpload: File = null;
  id: number;
  card_header_title: string = ' '
  fileToUpload: File = null;

  isAgenda=false

  listEvent:any;


  public editor;



  constructor(private produitService: ProduitService, private activatedRoute: ActivatedRoute) { }
  reg: Regulation;

  produitForm = new FormGroup({
    designation: new FormControl('', Validators.required),
    prix: new FormControl('', Validators.required),
    observation: new FormControl(''),

   });



  ngOnInit() {
    // this.types = TYPES.filter(type => type);

    this.activatedRoute.params.subscribe(params => {
      const type = params['type'];
      const idclient = params['id'];

      if(type){
        this.typeclient=type
        this.card_header_title = type
        this.action='add';
      }else {
        this.card_header_title = "MODIFIER LE CLIENT"

      }

     

      if(type){
        this.typeclient=type
        this.card_header_title = type
        this.action='add';
      }else {


        this.card_header_title = "MODIFIER UN CLIENT"

      }


      if (idclient) {
        this.action = 'edit';
        this.id = idclient;
        this.getClient(idclient);
      }
  
    
    })
  }


  getClient(id){
    this.produitService.getById(id).subscribe(response=>{
      this.client=  response['data']
 

      console.log(this.client )
      this.produitForm.get('designation').setValue(response['data'].designation);
      this.produitForm.get('prix').setValue(response['data'].prix);
      this.produitForm.get('observation').setValue(response['data'].observation);

 

    },error => {});


  }
 



  get designation(): any {
    return this.produitForm.get('designation');
  }
  get prix(): any {
    return this.produitForm.get('prix');
  } 
  
  get observation(): any {
    return this.produitForm.get('observation');
  } 
  
  get telephone(): any {
    return this.produitForm.get('telephone');
  }
  get adresse(): any {
    return this.produitForm.get('adresse');
  }
  


  notificationForm(type: string, msg: string) {
    this.typeNotificationForm = type;
    this.messageNotificationForm = msg;
    this.isNotificationForm = true;
  }

  closeNotificationForm() {
    this.isNotificationForm = false;
  }

  handleFileInput(event) {
    this.fileToUpload = event.target.files[0];
    console.log(this.fileToUpload.name);
  }

  handleImgInput(event) {
    this.imgToUpload = event.target.files[0];
    console.log(this.imgToUpload.name);
  }

  onClickSubmit(): void {
    if (!this.produitForm.invalid) {
      $('#sbt_btn').addClass('disabled');

      $('#spinner').removeClass('d-none')

      const formData = this.produitForm.value;
      // console.log(formData);

      if (this.action == 'add') {

        this.produitService.save(formData)
          .subscribe(response => {

            this.notificationForm(
              "success",
              "Enregistrement réussi !"
            );
            console.log(response);

            $('#sbt_btn').removeClass('disabled');
            $('#spinner').addClass('d-none')
            // $('#spinner').removeClass('d-none');

            this.produitForm.reset();
          }, (error: HttpErrorResponse) => {
            console.log("Error while saving data");
            this.notificationForm(
              "danger",
              "Erreur lors de l'enregistrement !"
            );
          })

      }
      else {


        this.produitService.edit(formData, this.id)
          .subscribe(response => {
            console.log(response);
            this.notificationForm(
              "success",
              "Modification réussi !"
            );

            $('#sbt_btn').removeClass('disabled');
            $('#spinner').addClass('d-none');

          }, (error: HttpErrorResponse) => {
            this.notificationForm(
                "danger",
                "Erreur lors de l'enregistrement !"
            );

            console.log("Error while retrieving data");
          })
      }




      $('#spinner').removeClass('d-none');
    
   
      $('html,body').animate({
        scrollTop: $("#top").offset().top
      }, 'slow');
    }
  }

  onEditorBlured(quill) {
    this.editor = quill;
  }

  onEditorFocused(quill) {
  }

  onEditorCreated(quill) {
    this.editor = quill;
  }

  onContentChanged({ quill, html, text }) {
  }


};