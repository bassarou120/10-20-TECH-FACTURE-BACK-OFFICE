import {Component,OnInit} from '@angular/core';
import { Trending } from 'app/models/trending';
import { TrendingService } from '../../services/trending.service';
import { FormControl, Validators,FormGroup } from '@angular/forms';
import { JobService } from 'app/services/job.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Job } from 'app/models/job';
import { ActivatedRoute } from '@angular/router';

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


    constructor(
      private trendingService:TrendingService,
      private jobService: JobService,
      private activatedRoute: ActivatedRoute
      ) {}
  
    trendingForm = new FormGroup({
        titre: new FormControl('',Validators.required),
        job: new FormControl('', Validators.required),
        content: new FormControl('', Validators.required),
        img: new FormControl(''),
        file: new FormControl(''),
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
        console.log( this.trending.titre,this.trending.job.id );
        // this.trendingForm.setValue({
        //   titre:  this.trending.titre, 
        //   job:  this.trending.job.id
        // }); 
        this.trendingForm.patchValue({
          titre:  this.trending.titre, 
          job:  this.trending.job.id
        }); 
        
        // this.titre.reset({ value: this.trending.titre })
        // this.job.reset({ value:this.trending.job.id})
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
       // if(!this.trendingForm.invalid){
            $('#sbt_btn').addClass('disabled');
            $('#spinner').removeClass('d-none')
          
            const formData =  this.trendingForm.value ;

            this.trendingService.edit(
              new Trending(formData.titre, formData.content, true),
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
        
              $('html,body').animate({
                scrollTop: $("#top").offset().top
            }, 'slow');

             $('#sbt_btn').addClass('disabled');
             $('#spinner').removeClass('d-none')
          
       // }
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
};