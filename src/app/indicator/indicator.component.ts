import {Component,OnInit} from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { OperateurTouristiqueService } from 'app/services/operateur-touristique.service';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
    selector: 'indicator',
    templateUrl: './indicator.component.html',
    styleUrls: ['./indicator.component.styl']
})

export class IndicatorComponent implements OnInit{
    spinner = false;
    statistique_by_date = [];
    all_stat=[];
    date_stat=[];
    init_stat_date:any;
    pass_stat_date:any;
    load_all_stat_spinner = true ;
    load_filters_stat_spinner = true ;

    filtreForm = new FormGroup({
        start_date: new FormControl('', [Validators.required, this.passValidator]),
        end_date: new FormControl('', [Validators.required, this.passValidator]),
    }
        ,
        { validators: [this.dateRangeValidator] }
    );


    constructor(private opService: OperateurTouristiqueService) { }


    passValidator(control: AbstractControl): ValidationErrors | null {
        const the_date = control.value;
        const today = new Date();
        if (new Date(the_date) > today) {
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

    onClickSubmit(): void {
        this.spinner = true;
        this.load_filters_stat_spinner= true;

        const formData = this.filtreForm.value;
        this.opService.op_stat_by_date({
            date_debut:formData.start_date,
            date_fin:formData.end_date
        }).subscribe((data: Array<any>) => {
                this.date_stat=data['data']
                this.spinner = false;
                this.load_filters_stat_spinner= false;
            }, (error: HttpErrorResponse) => {
                console.log("Error while retrieving data");
                this.spinner = false;
            })

    }

    filtre(start:any,end:any){
        this.opService.op_stat_by_date({
            date_debut:start,
            date_fin:end
        }).subscribe((data: Array<any>) => {
                this.date_stat=data['data']
                this.spinner = false;
                this.load_filters_stat_spinner= false;
            }, (error: HttpErrorResponse) => {
                console.log("Error while retrieving data");
                this.spinner = false;
            })
    }

    ngOnInit() {
        const date = new Date();
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        this.init_stat_date = `${year}-${month}-${day}`;
 

        const date1 = new Date();
        date1.setDate(date1.getDate() - 30)
        const year1 = date1.getFullYear();
        const month1 = (date1.getMonth() + 1).toString().padStart(2, '0');
        const day1 = date1.getDate().toString().padStart(2, '0');
        this.pass_stat_date = `${year1}-${month1}-${day1}`;
 
        this.filtreForm.patchValue({
         start_date:this.pass_stat_date ,
         end_date: this.init_stat_date
       });
       
       this.filtre(this.pass_stat_date,this.init_stat_date)
    }

     get start_date(): any {
        return this.filtreForm.get('start_date');
    }
    get end_date(): any {
        return this.filtreForm.get('end_date');
    }
}
