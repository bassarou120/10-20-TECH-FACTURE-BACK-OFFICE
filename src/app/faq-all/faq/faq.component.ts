import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Faq } from '../../models/faq';
import { FaqService } from '../../services/faq.service';
import { JobService } from '../../services/job.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Job } from 'app/models/job';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.styl']
})
export class FaqComponent implements OnInit {
  constructor(private faqService: FaqService, private jobService: JobService) { }

  //faqService:FaqService
  faq: Array<Faq> = [];
  jobs: Array<Job> = [];
  selected_faq: any;
  titre_modal: string = "Ajouter un FAQ";
  action: string = "add";

  display = "none";
  displayShowModal = "none";

  typeNotificationForm: string;
  messageNotificationForm: string;
  isNotificationForm: boolean = false;

  faqForm = new FormGroup({
    question: new FormControl('', Validators.required),
    answer: new FormControl('', Validators.required),
    job: new FormControl('', Validators.required),
  });

  openModal(id_element?: number) {
    if (id_element) {
      this.action = "edit";
      this.titre_modal = "Editer un FAQ";
     
      var el = this.faq.find(x => x.id == id_element);
      this.selected_faq = el;

      // this.question.reset({ value: el.question })
      // this.answer.reset({ value: el.content })

      this.faqForm.patchValue({
        question: el.question, 
        answer: el.content,
        job: el.job,
      }); 
  
    }
    else {
      this.titre_modal = "Ajouter un FAQ";
      this.action = "add";
      this.faqForm.patchValue({
        question: '', 
        answer:'',
        job: '',
      }); 

    }
    this.display = "block";
  }

  onCloseHandled() {
    this.display = "none";
  }

  openShowModal(id: number) {
    this.selected_faq = this.faq.find(x => x.id == id);
    this.displayShowModal = "block";
  }

  onCloseHandledShowModal() {
    this.displayShowModal = "none";
  }

  deleteElement(id: number) {
    this.faqService.delete(id).subscribe(response => {
      this.notificationForm("success", "Supression réussi !");
      this.getList();
    }, (error: HttpErrorResponse) => {
      console.log("Error while deleting data");
    })
  }

  hideElement(id: number) {
    this.faqService.hide(id).subscribe(response => {
      this.notificationForm("success", "Statut modifier avec succes !");
      this.getList();
    }, (error: HttpErrorResponse) => {
      console.log("Error while hidden data");
      this.notificationForm("danger", "Error de modification du statut !");
    })
  }

  changeJob(e: any) {
    this.job?.setValue(e.target.value, {
      onlySelf: true,
    });
  }

  getList(): void {
    this.faqService.list().subscribe((data: Array<Faq>) => {
      this.faq = data['data'];
      // this.selected_faq= data['data'][0];
    }, (error: HttpErrorResponse) => {
      console.log("Error while retrieving data");
    }
    )
  }

  getJobList(): void {
    this.jobService.list().subscribe((data: Array<Job>) => {
      this.jobs = data['data'];
    }, (error: HttpErrorResponse) => {
      console.log("Error while retrieving data");
    }
    )
  }

  ngOnInit() {
    this.getJobList()
    this.getList();
  }

  onClickSubmit(): void {

    // console.log("hello",this.faqForm.value);
    // if(!this.faqForm.invalid){  
    $('#sbt_btn').removeClass('disabled');
    $('#spinner').addClass('d-none')
    const formData = this.faqForm.value;
       console.log(formData.job)
    if (this.action == 'add') {
      this.faqService.save(new Faq(formData.question, formData.answer, true,formData.job), formData.job.id)
        .subscribe(response => {
          this.notificationForm(
            "success",
            "Enregistrement réussi !"
          );
          this.getList();
          this.display = "none";
        }, (error: HttpErrorResponse) => {
          console.log("Error while retrieving data");
          this.notificationForm(
            "danger",
            "Erreur lors de l'enregistrement !"
          );
        })
    }
    else {
      this.faqService.edit(
        new Faq(formData.question, formData.answer, this.selected_faq.isDisplayed,formData.job.id),
        this.selected_faq.id,
      )
        .subscribe(response => {
          this.notificationForm(
            "success",
            "Modification réussi !"
          );
          this.getList();
          this.faqForm.reset();
          this.display = "none";
        }, (error: HttpErrorResponse) => {
          console.log("Error while retrieving data");
        })
    }

    $('#sbt_btn').removeClass('disabled');
    $('#spinner').addClass('d-none')

    // }

  }

  get question(): any {
    return this.faqForm.get('question');
  }
  get answer(): any {
    return this.faqForm.get('answer');
  }
  get job(): any {
    return this.faqForm.get('job');
  }


  notificationForm(type: string, msg: string) {
    this.typeNotificationForm = type;
    this.messageNotificationForm = msg;
    this.isNotificationForm = true;
  }

  closeNotificationForm() {
    this.isNotificationForm = false;
  }


}
