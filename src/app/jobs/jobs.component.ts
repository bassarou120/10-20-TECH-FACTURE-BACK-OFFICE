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
    { jobIcon: 'flight', titre: 'Agences de voyage', description: 'Tableau de bord Tableau de Tableau de bord', dt: 0, dnt: 0, link: '/list-demand-voyage' },
    { jobIcon: 'hotel', titre: 'Hotels', description: 'Tableau de bord Tableau de Tableau de bord', dt: 0, dnt: 0, link: '#' },
    { jobIcon: 'restaurant', titre: 'Restaurants et assimilés', description: 'Tableau de bord Tableau de Tableau de bord', dt: 0, dnt: 0, link: '#' },
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
    constructor(private jobService: JobService) { }

    filtreForm = new FormGroup({
        start_date: new FormControl('', [Validators.required, this.passValidator]),
        end_date: new FormControl('', [Validators.required,this.passValidator]),
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
        console.log(new Date(startDate) < new Date(endDate))
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
        console.log(new Date(endDate) < today)
        if (new Date(endDate) > today) {
            return { endDate: true };
        }
        else {
            return { endDate: false };
        }
        return null;
    }

    stat(status: string): void {
        this.jobService.stat_by_demande_job(status).subscribe((data: Array<Job>) => {
            if (status == 'traitee') {
                for (let index = 0; index < data['data'].length; index++) {
                    const mt = data['data'][index].split(',');
                    const metier = mt[0];
                    switch (metier) {
                        case 'HEB':
                            this.jobItems[1].dt = mt[1]
                            break;
                        case 'AGV':
                            this.jobItems[0].dt = mt[1]
                            break;
                        case 'RES':
                            this.jobItems[2].dt = mt[1]
                            break;
                        case 'GUI':
                            this.jobItems[3].dt = mt[1]
                            break;
                    }
                }
                this.treated = data['data'];
            }
            else {
                for (let index = 0; index < data['data'].length; index++) {
                    const mt = data['data'][index].split(',');
                    const metier = mt[0];
                    switch (metier) {
                        case 'HEB':
                            this.jobItems[1].dnt = mt[1]
                            break;
                        case 'AGV':
                            this.jobItems[0].dnt = mt[1]
                            break;
                        case 'RES':
                            this.jobItems[2].dnt = mt[1]
                            break;
                        case 'GUI':
                            this.jobItems[3].dnt = mt[1]
                            break;
                    }
                }
                this.untreated = data['data'];
            }
            console.log(data['data']);
        }, (error: HttpErrorResponse) => {
            console.log("Error while retrieving data");
        }
        )
    }

    ngOnInit() {
        this.jobItems = METIERS.filter(menuItem => menuItem);
        this.stat('traitee');
        this.stat('non traitee');
    }

    onClickSubmit(): void {
        if (!this.filtreForm.invalid) {
            this.spinner = true;

            const formData = this.filtreForm.value;
            const data = new FormData();

            data.append('startDate', formData.start_date);
            data.append('endDate', formData.end_date);

            this.jobService.filtre(data)
                .subscribe(response => {
                    this.spinner = false;

                }, (error: HttpErrorResponse) => {
                    console.log("Error while retrieving data");
                    this.spinner = false;
                })


        }
    }


    get start_date(): any {
        return this.filtreForm.get('start_date');
    }
    get end_date(): any {
        return this.filtreForm.get('end_date');
    }
}
