import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Job } from 'app/models/job';
import { Regulation } from 'app/models/regulation';
import { EditorComponent } from '../../components/editor/editor.component';
import { ActualiteService } from '../../services/actualite.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { JobService } from 'app/services/job.service';
import {Actualite} from '../../models/Actualite';

import {QuillModule, QuillModules} from 'ngx-quill';


import * as QuillNamespace from 'quill';

var Size = QuillNamespace.import("attributors/style/size");

Size.whitelist = ['8px','9px','10px','12px','14px','16px','20px','24px','32px','42px','54px','68px','84px','98px','100px',
];
QuillNamespace.register(Size, true);

const fontFamilyArr = ['Arial','Arial Black','Arial Rounded MT Bold','Apple Chancery','Times New Roman','Comic Sans MS','Impact', 'Georgia','Roman',"Roboto Condensed",'Courier', 'Garamond', 'Tahoma',  , 'Verdana', "Times New Roman", "Calibri", "Calibri Light", "Sans-Serif"];
let fonts = QuillNamespace.import("attributors/style/font");
fonts.whitelist = fontFamilyArr;
QuillNamespace.register(fonts, true);


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

const fullToolbar = [

  [
    {
      font: fonts.whitelist
    },
    {
      size: Size.whitelist
    }
  ],
  ['bold', 'italic', 'underline', 'strike'],
  [
    {
      color: []
    },
    {
      background: []
    }
  ],
  [
    {
      script: 'super'
    },
    {
      script: 'sub'
    }
  ],
  [
    {
      header: '1'
    },
    {
      header: '2'
    },
    'blockquote',
    'code-block'
  ],
  [
    {
      list: 'ordered'
    },
    {
      list: 'bullet'
    },
    {
      indent: '-1'
    },
    {
      indent: '+1'
    }
  ],
  [
    'direction',
    {
      align: []
    }
  ],
  ['link', 'image', 'video', 'formula'],
  ['clean']
];

/*
const fullToolbar = [

  [
    {
      font: fonts.whitelist
    },
    {
      size: Size.whitelist
    }
  ],
  ['bold', 'italic', 'underline', 'strike'],
  [
    {
      color: []
    },
    {
      background: []
    }
  ],
  [
    {
      script: 'super'
    },
    {
      script: 'sub'
    }
  ],
  [
    {
      header: '1'
    },
    {
      header: '2'
    },
    'blockquote',
    'code-block'
  ],
  [
    {
      list: 'ordered'
    },
    {
      list: 'bullet'
    },
    {
      indent: '-1'
    },
    {
      indent: '+1'
    }
  ],
  [
    'direction',
    {
      align: []
    }
  ],
  ['link', 'image', 'video', 'formula'],
  ['emoji'],
  ['clean']
];
*/

@Component({
  selector: 'add-regulation',
  templateUrl: './add-actualite.component.html',
  styleUrls: ['./add-actualite.component.styl']
})
export class AddActualiteComponent implements OnInit {


  Quill: any = QuillNamespace;

  types: any[];


  regulation: Regulation;
  jobs: Array<Job> = [];
  action: string = "add";
  typeNotificationForm: string;
  messageNotificationForm: string;
  isNotificationForm: boolean = false;



  public editorContent = `<h3>I am Example content</h3>`;

  // imageResize: {
  //   displaySize: true
  // // },



  customOptions = [{
    import: '??',
    whitelist: ['[GuestName]', '[HotelName]']
  }];



  //******************************************

  public editorOptions:QuillModules = {
    placeholder: "insert content...",
    theme: 'snow',
    modules: {

      formula: true,
      toolbar: fullToolbar
    },

  };




  typeActualite:any

  actualite: Actualite
  imgToUpload: File = null;
  id: number;
  card_header_title: string = ' '
  fileToUpload: File = null;

  isAgenda=false

  listEvent:any;


  public editor;




  constructor(private actualiteService: ActualiteService, private activatedRoute: ActivatedRoute, private jobService: JobService) { }
  reg: Regulation;

  actualiteForm = new FormGroup({
    titre: new FormControl('', Validators.required),
    description: new FormControl(''),
    // type: new FormControl('', Validators.required),
   });



  ngOnInit() {
    this.types = TYPES.filter(type => type);


    this.activatedRoute.params.subscribe(params => {
      const type = params['type'];
      const idActualite = params['id'];

      if(type){
        this.typeActualite=type
        this.card_header_title = type
        this.action='add';
      }else {


        this.card_header_title = "MODIFIER L'ACTUALITE"

      }


      if (idActualite) {
        this.action = 'edit';
        this.id = idActualite;
        this.getActualite(idActualite);
      }
    })

    if(this.typeActualite=="AGENDA"){
      this.isAgenda=true;
      this.getEvents()
    }



  }

  getEvents(){

      this.actualiteService.getListEvent().subscribe((data: Array<Actualite>) => {
            this.listEvent = data['data'];

            console.log( this.listEvent)

          }, (error: HttpErrorResponse) => {
            console.log("Error while retrieving data");
          }
      )

  }

  getActualite(id){
  this.actualiteService.getById(id).subscribe(response=>{
    this.actualite=  response['data']

    this.editor.root.innerHTML=this.actualite.content;

    console.log(this.actualite )
    this.actualiteForm.get('titre').setValue(response['data'].title);
    this.actualiteForm.get('description').setValue(response['data'].description);
    this.typeActualite=response['data'].type
    // this.actualiteForm.get('type').setValue(response['data'].title);
  // this.actualiteForm.setValue({titre:this.actualite.titre})
    // this.actualiteForm.value.titre=this.actualite.titre

  },error => {});


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
    return this.actualiteForm.get('titre');
  }
  get type(): any {
    return this.actualiteForm.get('type');
  }
  get job(): any {
    return this.actualiteForm.get('job');
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
    if (!this.actualiteForm.invalid) {
      $('#sbt_btn').addClass('disabled');

      $('#spinner').removeClass('d-none')

      const formData = this.actualiteForm.value;
      // console.log(formData);

      const data = new FormData();
      // data.append('Content-Type', 'multipart/form-data');
      data.append('fichier', <File>this.fileToUpload);
      data.append('image', <File>this.imgToUpload);
      data.append('content', this.editor.root.innerHTML);
      data.append('type', this.typeActualite);
      data.append('title', formData.titre);
      data.append('description', formData.description);

      if (this.action == 'add') {

        this.actualiteService.saveWithInmage(data, 0)
          .subscribe(response => {


            this.notificationForm(
              "success",
              "Enregistrement réussi !"
            );
            console.log(response);

            $('#sbt_btn').removeClass('disabled');
            $('#spinner').addClass('d-none')
            // $('#spinner').removeClass('d-none');

            this.actualiteForm.reset();
          }, (error: HttpErrorResponse) => {
            console.log("Error while saving data");
            this.notificationForm(
              "danger",
              "Erreur lors de l'enregistrement !"
            );
          })

      }
      else {



        data.append('_method', 'PUT');
        data.append('image', <File>this.imgToUpload);
        // console.log( <File>this.imgToUpload)
        this.actualiteService.edit(data, this.id)
          .subscribe(response => {
            console.log(response);
            this.notificationForm(
              "success",
              "Modification réussi !"
            );

            // $('#sbt_btn').addClass('disabled');
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