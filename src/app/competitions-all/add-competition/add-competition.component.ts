import {Component} from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Competition } from 'app/models/competition';
import { Job } from 'app/models/job';
import { CompetitionService } from 'app/services/competition.service';
import { JobService } from 'app/services/job.service';

//Update git for new version 
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
    selector: 'add-competion',
    templateUrl: './add-competition.component.html',
    styleUrls: ['./add-competition.component.styl']
})
export class AddCompetitionComponent {
    
    competition: Competition;  
    jobs: Array<Job> = [];
    card_header_title: string = 'Ajouter une compétition';
    typeNotificationForm: string;
    messageNotificationForm: string;
    isNotificationForm: boolean = false;
    id_competition :number ;
    action: string = "add";


    fileToUpload: File = null;
    imgToUpload: File = null;
  
    public editor;
  
    public editorContent = `<h3>I am Example content</h3>`;
  
    public editorOptions = {
      placeholder: "insert content...",
      modules: {
        formula: true,
        toolbar: fullToolbar
      },
    };
  

    constructor(
      private competitionService:CompetitionService,
      private jobService: JobService,
      private activatedRoute: ActivatedRoute
      ) {}
  
    competitionForm = new FormGroup({
        titre: new FormControl('',Validators.required),
       // content: new FormControl('', Validators.required),
        start_date: new FormControl('', Validators.required),
        end_date: new FormControl('', Validators.required),
       });

    getJobList(): void {
        this.jobService.list().subscribe((data: Array<Job>) => {
          this.jobs = data['data'];
        }, (error: HttpErrorResponse) => {
          console.log("Error while retrieving data");
        }
        )
    }

    getCompetition(id:number): void {
      this.competitionService.getById(id).subscribe((data: Array<Competition>) => {
        this.competition = data['data'];
        console.log(this.competition);
        this.competitionForm.patchValue({
          titre:  this.competition.titre,
         start_date:  this.competition.startDate,
          end_date:  this.competition.endDate
        }); 
        this.editor.root.innerHTML = this.competition.content;

      }, (error: HttpErrorResponse) => {
        console.log("Error while retrieving data");
      }
      )
    }
  
    ngOnInit() {
        this.getJobList();
        this.activatedRoute.params.subscribe(params => {
          const id = params['id'];
          if(id){
            this.id_competition = id
            this.action = 'edit';
            this.card_header_title ='Editer une compétition'
            this.getCompetition(id);
          }
      })
    }

    onClickSubmit(): void {
        if(!this.competitionForm.invalid){
            $('#sbt_btn').addClass('disabled');
            $('#spinner').removeClass('d-none')
          
            const formData =  this.competitionForm.value ;
            const data = new FormData();
            data.append('Content-Type', 'multipart/form-data');
            data.append('file', <File>this.fileToUpload);
            data.append('image', <File>this.imgToUpload);
            data.append('titre', formData.titre);
            data.append('content', this.editor.root.innerHTML);
            data.append('startDate', formData.start_date);
            data.append('endDate', formData.end_date);

            if(this.action == 'add'){
                this.competitionService.saveWithInmageAndFile(data)
                .subscribe(response => {
                  this.notificationForm(
                    "success",
                    "Enregistrement réussi !"
                  );
                  this.competitionForm.reset();
                  this.editor.root.innerHTML="";
                 
                }, (error: HttpErrorResponse) => {
                  console.log("Error while retrieving data");
                  this.notificationForm(
                    "danger",
                    "Erreur de l'enregistrement !"
                  );
                })
            }
            else{
                this.competitionService.edit(data, this.id_competition)
                .subscribe(response => {
                  this.notificationForm(
                    "success",
                    "Modification réussi !"
                  );
                }, (error: HttpErrorResponse) => {
                  console.log("Error while retrieving data");
                })
            }
         
            $('#sbt_btn').removeClass('disabled');
            $('#spinner').addClass('d-none')
              $('html,body').animate({
                scrollTop: $("#top").offset().top
              }, 'slow');

             
          
       }
      } 
   
      get titre(): any {
        return this.competitionForm.get('titre');
      }
      get start_date(): any {
        return this.competitionForm.get('start_date');
      }
      get end_date(): any {
        return this.competitionForm.get('end_date');
      }

      notificationForm(type: string, msg: string) {
        this.typeNotificationForm = type;
        this.messageNotificationForm = msg;
        this.isNotificationForm = true;
      }
    
      closeNotificationForm() {
        this.isNotificationForm = false;
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

      handleFileInput(event) {
        this.fileToUpload = event.target.files[0];
        console.log(this.fileToUpload.name);
      }
    
      handleImgInput(event) {
        this.imgToUpload = event.target.files[0];
        console.log(this.imgToUpload.name);
      }
    
}
