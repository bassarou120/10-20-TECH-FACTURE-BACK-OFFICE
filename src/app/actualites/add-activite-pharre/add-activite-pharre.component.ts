import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Job } from 'app/models/job';
import { Regulation } from 'app/models/regulation';
import { EditorComponent } from '../../components/editor/editor.component';
import { ActualiteService } from '../../services/actualite.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { JobService } from 'app/services/job.service';


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
  selector: 'add-activite-pharre',
  templateUrl: './add-activite-pharre.component.html',
  styleUrls: ['./add-activite-pharre.component.styl']
})
export class AddActivitePharreComponent implements OnInit {

  types: any[];
  regulation: Regulation;
  jobs: Array<Job> = [];
  action: string = "add";
  typeNotificationForm: string;
  messageNotificationForm: string;
  isNotificationForm: boolean = false;
  id: number;
  card_header_title: string = 'Ajouter une Activité pharre'
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


  constructor(private regulationService: ActualiteService, private activatedRoute: ActivatedRoute, private jobService: JobService) { }
  reg: Regulation;

  regulationForm = new FormGroup({
    titre: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
    job: new FormControl('', Validators.required)
  });

  getJobList(): void {
    this.jobService.list().subscribe((data: Array<Job>) => {
      this.jobs = data['data'];
    }, (error: HttpErrorResponse) => {
      console.log("Error while retrieving data");
    }
    )
  }
  getRegulation(id: number): void {
    this.regulationService.getById(id).subscribe((data: Array<Job>) => {
      this.regulation = data['data'];
      this.regulationForm.patchValue({
        titre: this.regulation.titre,
        job: this.regulation.job,
        type: this.regulation.type
      });
      this.editor.root.innerHTML = this.regulation.content;
    }, (error: HttpErrorResponse) => {
      console.log("Error while retrieving data");
    }
    )
  }

  ngOnInit() {
    this.types = TYPES.filter(type => type);
    this.getJobList()
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      console.log('Url Id: ', id);
      this.card_header_title = "Ajouter une Activité pharre"
      if (id) {
        this.action = 'edit';
        this.id = id;
        this.getRegulation(id);
      } 
    })
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
    if (!this.regulationForm.invalid) {
      $('#sbt_btn').removeClass('disabled');
      $('#spinner').addClass('d-none')
      const formData = this.regulationForm.value;
      // console.log(formData);

      const data = new FormData();
      data.append('Content-Type', 'multipart/form-data');
      data.append('file', <File>this.fileToUpload);
      data.append('image', <File>this.imgToUpload);
      data.append('titre', formData.titre);
      data.append('content', this.editor.root.innerHTML);
      data.append('type', formData.type);
      data.append('job', formData.job.id);

      if (this.action == 'add') {
        this.regulationService.saveWithInmage(data, formData.job.id)
          .subscribe(response => {

            this.notificationForm(
              "success",
              "Enregistrement réussi !"
            );
            console.log(response);
          
            $('#sbt_btn').addClass('disabled');
            $('#spinner').removeClass('d-none');
           

            this.regulationForm.reset();
          }, (error: HttpErrorResponse) => {
            console.log("Error while saving data");
            this.notificationForm(
              "danger",
              "Erreur lors de l'enregistrement !"
            );
          })

      }
      else {
        this.regulationService.edit(data, this.id)
          .subscribe(response => {
            this.notificationForm(
              "success",
              "Modification réussi !"
            );
          }, (error: HttpErrorResponse) => {
            console.log("Error while retrieving data");
          })
      }
      $('#sbt_btn').addClass('disabled');
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