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

@Component({
  selector: 'add-regulation',
  templateUrl: './add-document.component.html',
  styleUrls: ['./add-document.component.styl']
})
export class AddDocumentComponent implements OnInit {

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

  //******************************************

  public editorOptions = {
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


  public editor;




  constructor(private actualiteService: ActualiteService, private activatedRoute: ActivatedRoute, private jobService: JobService) { }
  reg: Regulation;

  actualiteForm = new FormGroup({
     titre: new FormControl('', Validators.required),
     lieu: new FormControl('', Validators.required),
     date: new FormControl('', Validators.required),
     date_fin: new FormControl('', Validators.required),
    description: new FormControl(''),
   });
 documentForm = new FormGroup({
     titre: new FormControl('', Validators.required),
     type: new FormControl('', Validators.required),

    description: new FormControl(''),
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


        this.card_header_title = "MODIFIER L'EVERNEMENT"

      }


      if (idActualite) {
        this.action = 'edit';
        this.id = idActualite;
        this.getActualite(idActualite);
      }
    })
  }

  getActualite(id){
  this.actualiteService.getById(id).subscribe(response=>{
    this.actualite=  response['data']

    this.editor.root.innerHTML=this.actualite.content;

    console.log(this.actualite )
    this.actualiteForm.get('titre').setValue(response['data'].title);
     this.actualiteForm.get('date').setValue(response['data'].date);
    this.actualiteForm.get('date_fin').setValue(response['data'].date_fin);
    this.actualiteForm.get('description').setValue(response['data'].description);
    this.actualiteForm.get('lieu').setValue(response['data'].lieu);
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
    if (!this.documentForm.invalid) {
      $('#sbt_btn').removeClass('disabled');
      $('#spinner').addClass('d-none')
      const formData = this.documentForm.value;
      // console.log(formData);

      const data = new FormData();
      // data.append('Content-Type', 'multipart/form-data');
      data.append('fichier', <File>this.fileToUpload);
      data.append('image', <File>this.imgToUpload);

      data.append('type',  formData.type);
      data.append('titre', formData.titre);

      data.append('description', formData.description);


        this.actualiteService.saveDocument(data)
            .subscribe(response => {

              this.notificationForm(
                  "success",
                  "Enregistrement réussi !"
              );
              console.log(response);

              $('#sbt_btn').addClass('disabled');
              $('#spinner').removeClass('d-none');

              this.actualiteForm.reset();
            }, (error: HttpErrorResponse) => {
              console.log("Error while saving data");
              this.notificationForm(
                  "danger",
                  "Erreur lors de l'enregistrement !"
              );
            })



      /*
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
          }, (error: HttpErrorResponse) => {
            this.notificationForm(
                "danger",
                "Erreur lors de l'enregistrement !"
            );

            console.log("Error while retrieving data");
          })
      }

       */




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