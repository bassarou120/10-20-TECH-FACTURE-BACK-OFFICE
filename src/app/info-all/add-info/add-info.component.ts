import { Component, OnInit } from '@angular/core';
import { Infos } from 'app/models/infos';
import { JobService } from 'app/services/job.service';

import { HttpErrorResponse } from '@angular/common/http';
import { Job } from 'app/models/job';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {InfosService} from '../../services/infos.service';


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
  selector: 'add-info',
  templateUrl: './add-info.component.html',
  styleUrls: ['./add-info.component.styl']
})
export class AddInfoComponent implements OnInit {

  constructor(private infoService: InfosService, private jobService: JobService,private activatedRoute: ActivatedRoute) { }

  info: Infos;
  jobs: Array<Job> = [];
  card_header_title: string = "Editer une Information";
  id:number;
  imgToUpload: File = null;
  action: string = "add";
  typeNotificationForm: string;
  messageNotificationForm: string;
  isNotificationForm: boolean = false;
 
  public editor;

  public editorOptions = {
    placeholder: "Insert content...",
    modules: {
      formula: true,
      toolbar: fullToolbar
    },
  };

  infoForm = new FormGroup({
    titre: new FormControl('', Validators.required),
    // job: new FormControl('', Validators.required)
  });

  getJobList(): void {
    this.jobService.list().subscribe((data: Array<Job>) => {
      this.jobs = data['data'];
    }, (error: HttpErrorResponse) => {
      console.log("Error while retrieving data");
    }
    )
  }


  getInfo(id: number): void {
    this.infoService.getById(id).subscribe((data: Array<Job>) => {
      this.info = data['data'];
      this.infoForm.patchValue({
        titre: this.info.titre,
      });
      this.editor.root.innerHTML = this.info.content;
    }, (error: HttpErrorResponse) => {
      console.log("Error while retrieving data");
    }
    )
  }

  ngOnInit() {
    this.getJobList()
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      this.card_header_title = "Editer une information"
      if (id) {
        this.action = 'edit';
        this.id = id;
        this.getInfo(id);
      }
    })
  }

  onClickSubmit(): void {
    if (!this.infoForm.invalid) {
      $('#sbt_btn').addClass('disabled');
      $('#spinner').removeClass('d-none')

      const formData = this.infoForm.value;

      // console.log(formData);

      const data = new FormData();
      data.append('Content-Type', 'multipart/form-data');
 
      if (this.imgToUpload) {
        data.append('image', <File>this.imgToUpload);
      }
      data.append('titre', formData.titre);
      data.append('content', this.editor.root.innerHTML);
      // data.append('job', formData.job.id);

      this.infoService.edit(
        data,
        this.id,
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
    return this.infoForm.get('titre');
  }

  get job(): any {
    return this.infoForm.get('job');
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

  notificationForm(type: string, msg: string) {
    this.typeNotificationForm = type;
    this.messageNotificationForm = msg;
    this.isNotificationForm = true;
  }

  closeNotificationForm() {
    this.isNotificationForm = false;
  }

  handleImgInput(event) {
    this.imgToUpload = event.target.files[0];
    console.log(this.imgToUpload.name);
  }

};