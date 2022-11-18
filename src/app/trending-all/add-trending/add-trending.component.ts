import {Component,OnInit} from '@angular/core';
import { Trending } from 'app/models/trending';
import { TrendingService } from '../../services/trending.service';
import { FormControl, Validators,FormGroup } from '@angular/forms';
import { JobService } from 'app/services/job.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Job } from 'app/models/job';
import { ActivatedRoute } from '@angular/router';

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
    selector: 'add-trending',
    templateUrl: './add-trending.component.html',
    styleUrls: ['./add-trending.component.styl']
})

export class AddTrendingComponent  implements OnInit {
    trending: Trending;  
    jobs: Array<Job> = [];
    card_header_title :string
    typeNotificationForm: string;
    messageNotificationForm: string;
    isNotificationForm: boolean = false;
    id_trending :number ;
    fileToUpload: File = null;
    imgToUpload: File = null;

    public editor;
  
    public editorOptions = {
      placeholder: "Insert content...",
      modules: {
        formula: true,
        toolbar: fullToolbar
      },
    };

    constructor(
      private trendingService:TrendingService,
      private jobService: JobService,
      private activatedRoute: ActivatedRoute
      ) {}
  
    trendingForm = new FormGroup({
        titre: new FormControl('',Validators.required),
      //  job: new FormControl('', Validators.required),
      //  content: new FormControl('', Validators.required)
       });

    getJobList(): void {
        this.jobService.list().subscribe((data: Array<Job>) => {
          this.jobs = data['data'];
        }, (error: HttpErrorResponse) => {
          console.log("Error while retrieving data");
        }
        )
    }

    getTrending(id:number): void {
      this.trendingService.getById(id).subscribe((data: Array<Trending>) => {
        this.trending = data['data'];

        this.trendingForm.patchValue({
          titre:  this.trending.titre, 
        //  job:  this.trending.job
        }); 
        this.editor.root.innerHTML = this.trending.content;

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
            this.id_trending = id
            this.card_header_title ='Editer une tendance'
            this.getTrending(id);
          }
      })
    }

    onClickSubmit(): void {
       if(!this.trendingForm.invalid){
            $('#sbt_btn').addClass('disabled');
            $('#spinner').removeClass('d-none')
          
            const formData =  this.trendingForm.value ;

            // console.log(formData);
      
            const data = new FormData();
            data.append('Content-Type', 'multipart/form-data');
            if(this.fileToUpload){
              data.append('file', <File>this.fileToUpload);
            }
            if(this.imgToUpload){
              data.append('image', <File>this.imgToUpload);
            }
            data.append('titre', formData.titre);
            data.append('content', this.editor.root.innerHTML);
           // data.append('job', formData.job.id);

            this.trendingService.edit(
               data,
              this.id_trending,
            )
              .subscribe(response => {
                this.notificationForm(
                  "success",
                  "Modification réussi !"
                );
    
              }, (error: HttpErrorResponse) => {
                console.log("Error while retrieving data");
                this.notificationForm(
                  "danger",
                  "Erreur de la motification !"
                );
              })
        
              $('#sbt_btn').addClass('disabled');
              $('#spinner').removeClass('d-none')
              
              $('html,body').animate({
                scrollTop: $("#top").offset().top
            }, 'slow');

          
          
       }
      } 
   
      get titre(): any {
        return this.trendingForm.get('titre');
      }
      get type(): any {
        return this.trendingForm.get('type');
      }
      get job(): any {
        return this.trendingForm.get('job');
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
    
};