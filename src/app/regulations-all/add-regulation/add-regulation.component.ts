import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
import {Component,OnInit, ViewChild} from '@angular/core';
import { FormControl, Validators,FormGroup, FormBuilder } from '@angular/forms';
import { Piece } from 'app/models/Piece';
import { Reglementation } from 'app/models/Reglementation';
import { ReglementationsService } from 'app/services/reglementations.service';
import { environment } from 'environments/environment';
import { error } from 'protractor';
import { filter } from 'rxjs';
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
const fullToolbar = [
  [
    {
      font: []
    },
    {
      size: []
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
    templateUrl: './add-regulation.component.html',
    styleUrls: ['./add-regulation.component.styl']
})
export class AddRegulationComponent  implements OnInit {
  
  public editor;

  public editorContent = `<h3>I am Example content</h3>`;
  
  public editorOptions = {
    placeholder: "insert content...",
      modules: {
       formula: true,
          toolbar: fullToolbar
         },
  };




  fileToUpload: File = null;
  pieceInfo: Piece = null;
  url = environment.backend;
  regulation: Reglementation;

 
    types: any[];
    jobs: any[];
 
    constructor(
       private fb: FormBuilder,
      private reglementService: ReglementationsService ,
      private http: HttpClient,) {}
  
    regulationForm = new FormGroup
    ({
        titre: new FormControl('',Validators.required),
        type: new FormControl('', Validators.required),
        job: new FormControl('', Validators.required),
        img: new FormControl(''),
        file: new FormControl(''),
       }); 

        ngOnInit() {
       

          setTimeout(() => {
            this.editorContent = '<h1>content changed!</h1>';
            console.log('you can use the quill instance object to do something', this.editor);
            // this.editor.disable();
          }, 2800)
 
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
        if(this.regulationForm.valid){

           
            // $('#sbt_btn').addClass('disabled');
            // $('#spinner').removeClass('d-none');

           this.regulation =this.regulationForm.value;

           this.regulation.content=this.editor.root.innerHTML

          // alert(JSON.stringify(this.regulation));
          // this.reglementService.saveFile

          this.reglementService.save(this.regulation).subscribe(
            (data:Reglementation)=>{

              alert(JSON.stringify(data));

            },
            (error)=>{
              alert(JSON.stringify(error));

            }
          );


            // setTimeout(function () {
            //     $('#sbt_btn').removeClass('disabled');
            //     $('#spinner').addClass('d-none')
            //     window['showSuccessNotification']('Enregistrement reussie');
            // }, 5000);
            //this.onCloseHandled();



            
        }
      
    
      } 

      handleFileInput(event) {
        this.fileToUpload = event.target.files[0];
        console.log(this.fileToUpload.name);
      }


      submitFormFile(): void {

        if (this.fileToUpload.name != "") {
       //   const formDataDonnee = this.validateFormFile.value;
    
          const formData = new FormData();
          
          formData.append('Content-Type', 'multipart/form-data');
          formData.append('file', <File>this.fileToUpload);
    
          const req = new HttpRequest('POST', this.url + '/piece/uploadFile', formData, {
            // reportProgress: true
          });
    
          
          this.http.request(req).pipe(filter(e => e instanceof HttpResponse))
            .subscribe(
              (data: any) => {
                let piece: Piece = data.body;
                console.log(data);
                piece.namePiece = this.fileToUpload.name;
                
                piece.refEmplacement = "formDataDonnee.refEmplacement";
                piece.refPiece = "formDataDonnee.refPiece";
    
                this.reglementService.saveFile(this.regulation.id, piece).subscribe(
                  (data: Reglementation) => {
                    // this.filesRequete = data.files;
                    // this.fileInput.nativeElement.value = '';
                    // this.validateFormFile.reset();
                  });
              },
              err => {
    
                // this.fileInput.nativeElement.value = '';
                // this.message.error('Chargement du fichier échoué.');
              });
    
        } else {
          alert('error Formulaire invalide ! \n pas de fic')
        //  this.createMessage('error', 'Formulaire invalide !');
        }
      }




      onEditorBlured(quill ) {
        this.editor = quill;
      // console.log('editor blur!',   quill.getContents(), quill.root.innerHTML );
      }
    
      onEditorFocused(quill) {
        // console.log('editor focus!', quill);
      }
    
      onEditorCreated(quill) {
        this.editor = quill;
        // console.log('quill is ready! this is current quill instance object', quill);
      }
    


    
   
};