import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Job } from 'app/models/job';
import { Regulation } from 'app/models/regulation';

import { ClientService } from '../../services/client.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';




declare const $: any;
declare interface Type {
  value: string;
  label: string;
}


@Component({
  selector: 'add-regulation',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.styl']
})
export class AddClientComponent implements OnInit {


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




  constructor(private clientService: ClientService, private activatedRoute: ActivatedRoute) { }
  reg: Regulation;

  clientForm = new FormGroup({
    nom: new FormControl('', Validators.required),
    prenom: new FormControl('', Validators.required),
    telephone: new FormControl(''),
    email: new FormControl(''),
    adresse: new FormControl('',Validators.required),
    // type: new FormControl('', Validators.required),
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
    this.clientService.getById(id).subscribe(response=>{
      this.client=  response['data']
 

      console.log(this.client )
      this.clientForm.get('nom').setValue(response['data'].nom);
      this.clientForm.get('prenom').setValue(response['data'].prenom);
      this.clientForm.get('email').setValue(response['data'].email);
      this.clientForm.get('telephone').setValue(response['data'].telephone);
      this.clientForm.get('adresse').setValue(response['data'].adresse);



      // this.typeclient=response['data'].type
      // this.clientForm.get('type').setValue(response['data'].title);
      // this.clientForm.setValue({titre:this.client.titre})
      // this.clientForm.value.titre=this.client.titre

    },error => {});


  }
 



  get nom(): any {
    return this.clientForm.get('nom');
  }
  get prenom(): any {
    return this.clientForm.get('prenom');
  } 
  
  get email(): any {
    return this.clientForm.get('email');
  } 
  
  get telephone(): any {
    return this.clientForm.get('telephone');
  }
  get adresse(): any {
    return this.clientForm.get('adresse');
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
    if (!this.clientForm.invalid) {
      $('#sbt_btn').addClass('disabled');

      $('#spinner').removeClass('d-none')

      const formData = this.clientForm.value;
      // console.log(formData);

      if (this.action == 'add') {

        this.clientService.save(formData)
          .subscribe(response => {

            this.notificationForm(
              "success",
              "Enregistrement réussi !"
            );
            console.log(response);

            $('#sbt_btn').removeClass('disabled');
            $('#spinner').addClass('d-none')
            // $('#spinner').removeClass('d-none');

            this.clientForm.reset();
          }, (error: HttpErrorResponse) => {
            console.log("Error while saving data");
            this.notificationForm(
              "danger",
              "Erreur lors de l'enregistrement !"
            );
          })

      }
      else {


        this.clientService.edit(formData, this.id)
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