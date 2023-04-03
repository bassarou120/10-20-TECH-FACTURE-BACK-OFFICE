import { Component, OnInit } from '@angular/core';
import { Job } from 'app/models/job';
import { JobService } from '../services/job.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';


declare var $: any;
declare interface MetierInfo {
    jobIcon: string;
    titre: string;
    description: string;
    dt: number;
    dnt: number;
    link: string;
}

export const METIERS: MetierInfo[] = [
    { jobIcon: 'flight', titre: 'Agences de voyage', description: 'Nombre total de demande', dt: 0, dnt: 0, link: '/list-demand-voyage' },
    { jobIcon: 'hotel', titre: 'Hotels', description: 'Nombre total de demande', dt: 0, dnt: 0, link: '#' },
    { jobIcon: 'restaurant', titre: 'Restaurants et assimilés', description: 'Nombre total de demande', dt: 0, dnt: 0, link: '#' },
    { jobIcon: 'person', titre: 'Guides touristiques', description: 'Tableau de bord Tableau de bTableau de bord', dt: 0, dnt: 0, link: '#' }
];

@Component({
    selector: 'app-jobs',
    templateUrl: './jobs.component.html',
    styleUrls: ['./jobs.component.styl']
})

export class JobsComponent implements OnInit {
    jobItems: any[];
    job: Job;
    treated: any[];
    untreated: any[];
    spinner = false;
    statistique_by_date = [];
    all_stat=[];
    date_stat=[];
    constructor(private jobService: JobService) { }

    filtreForm = new FormGroup({
        start_date: new FormControl('', [Validators.required, this.passValidator]),
        end_date: new FormControl('', [Validators.required, this.passValidator]),
    }
        ,
        { validators: [this.dateRangeValidator] }
    );

    passValidator(control: AbstractControl): ValidationErrors | null {
        const the_date = control.value;
        const today = new Date();
        if (new Date(the_date) > today) {
            // return { passError: true };
            return { pass: true };
        }
        else {
            return null;
        }
    }

    dateRangeValidator(formGroup: FormGroup) {
        const startDate = formGroup.get('start_date').value;
        const endDate = formGroup.get('end_date').value;
        const today = new Date();
        if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
            return { dateRange: true };
        }
        else {
            return { dateRange: false };
        }
        return null;
    }

    startDateValidator(formGroup: FormGroup) {
        const startDate = formGroup.get('start_date').value;
        const today = new Date();
        if (new Date(startDate) > today) {
            return { startDate: true };
        }
        else {
            return { startDate: false };
        }
        return null;
    }

    endDateValidator(formGroup: FormGroup) {
        const endDate = formGroup.get('end_date').value;
        const today = new Date();
        // console.log(new Date(endDate) < today)
        if (new Date(endDate) > today) {
            return { endDate: true };
        }
        else {
            return { endDate: false };
        }
        return null;
    }

    stat(): void {
        this.jobItems = METIERS.filter(menuItem => menuItem);
        this.jobService.stat_by_demande_job().subscribe((data: Array<Job>) => {
            this.all_stat=data['data']
            // console.log(data['data']);
        
            for (let index = 0; index < this.jobItems.length; index++) {
                const element = this.jobItems[index];
                if(index==0){
                    this.jobItems[index].dt=data['data']['AGV']
                }
                if(index==1){
                    this.jobItems[index].dt=data['data']['HEB']
                }
                if(index==2){
                    this.jobItems[index].dt=data['data']['RES']
                }
                if(index==3){
                    this.jobItems[index].dt=data['data']['GUI']
                }
                
            }
            console.log(this.jobItems)
        }, (error: HttpErrorResponse) => {
            console.log("Error while retrieving data");
        }
        )
    }

    ngOnInit() {
       this.stat()
    }

    onClickSubmit(): void {
        this.spinner = true;
        const formData = this.filtreForm.value;
        this.jobService.getStatByDate({
            date_debut:formData.start_date,
            date_fin:formData.end_date
        }).subscribe((data: Array<Job>) => {
                this.date_stat=data['data']
                this.spinner = false;
            }, (error: HttpErrorResponse) => {
                console.log("Error while retrieving data");
                this.spinner = false;
            })

    }



    get start_date(): any {
        return this.filtreForm.get('start_date');
    }
    get end_date(): any {
        return this.filtreForm.get('end_date');
    }
}
