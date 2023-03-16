import { Component, Input } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { DemandVoyageService } from 'app/services/demand-voyage.service';
import { Demand } from 'app/models/demand';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FormControl, Validators, FormGroup } from '@angular/forms';


import { AbstractControl, ValidationErrors } from '@angular/forms';
export function requiredIfSpecificValueValidator(controlName: string, mustRequireFieldControlName: string) {
    return (control: AbstractControl): ValidationErrors | null => {

        const controlValue = control.get(controlName)?.value;

        if (controlValue == 0 && !mustRequireFieldControlName) {
            return { requiredIfSpecificValue: true };
        }
        return null;
    };
}

@Component({
    selector: 'detail-demand-voyage',
    templateUrl: './detail-demand-voyage.component.html',
    styleUrls: ['./detail-demand-voyage.component.styl'],
})
export class DetailDemandVoyageComponent {
    constructor(private demandVoyageService: DemandVoyageService, private activatedRoute: ActivatedRoute, private sanitizer: DomSanitizer) { }

    demand: Demand;
    id: number;
    fileUrl: SafeResourceUrl;
    the_url = '';
    data_pieces = [];
    etape_de_taitement_de_demande = [];
    typeNotificationForm: string;
    messageNotificationForm: string;
    isNotificationForm: boolean = false;

    display = "none";
    spinner = true;
    submitted = false;

    show_modal_0 = false;
    show_modal_1 = false;
    show_modal_2 = false;
    show_modal_3 = false;

    motif0_error = false;
    motif1_error = false;
    motif2_error = false;
    motif3_error = false;
    saving = false;

    steps = [
        {
            id: 0,
            title: 'Vérification de la complétude des pièces',
            date: '2016 - 2019',
            statut: true,
            fichier: [],
            display: true
        },
        {
            id: 1,
            title: 'Examen du dossier et fixation de la date d\'entretien',
            date: '2016 - 2019',
            statut: false,
            fichier: [],
            display: false
        },
        {
            id: 2,
            title: 'Complément de dossier après avis favorable',
            date: '2016 - 2019',
            statut: false,
            fichier: [],
            display: false
        },
        {
            id: 3,
            title: 'Complément de dossier après avis favorable',
            date: '2016 - 2019',
            statut: false,
            fichier: [],
            display: false
        },

    ];

    etap0Form = new FormGroup({
        statut_spet0: new FormControl('', Validators.required),
        cause0: new FormControl(''),
        motif0: new FormControl(''),
        file0: new FormControl(''),
    }, {
        validators: [requiredIfSpecificValueValidator('statut_spet0', 'cause0'), requiredIfSpecificValueValidator('statut_spet0', 'motif0')]
    });

    etap1Form = new FormGroup({
        statut_spet1: new FormControl('', Validators.required),
        cause1: new FormControl(''),
        motif1: new FormControl(''),
        file1: new FormControl(''),
    }, {
        validators: [requiredIfSpecificValueValidator('statut_spet1', 'cause1'), requiredIfSpecificValueValidator('statut_spet0', 'motif1')]
    });

    etap2Form = new FormGroup({
        statut_spet2: new FormControl('', Validators.required),
        cause2: new FormControl(''),
        motif2: new FormControl(''),
        file2: new FormControl(''),
    }, {
        validators: [requiredIfSpecificValueValidator('statut_spet2', 'cause2'), requiredIfSpecificValueValidator('statut_spet2', 'motif2')]
    });

    etap3Form = new FormGroup({
        statut_spet3: new FormControl('', Validators.required),
        cause3: new FormControl(''),
        motif3: new FormControl(''),
        file3: new FormControl(''),
    }, {
        validators: [requiredIfSpecificValueValidator('statut_spet2', 'cause3'), requiredIfSpecificValueValidator('statut_spet3', 'motif3')]
    });

    addDecision(id: number) {

    }

    getDemand(id: number): void {
        this.demandVoyageService.getById(id).subscribe((data: Array<Demand>) => {
            this.demand = data['data'];
            let str = this.demand.pieces;
            let newStr = str.substring(1, str.length - 1);
            let d_p = newStr.split(",");
            for (let i = 0; i < d_p.length - 1; i++) {
                var el = d_p[i].split(':');
                var el1 = el[1].slice(1)
                var el2 = el[2].slice(0, -1)
                this.data_pieces.push(
                    {
                        nom_fichier: el[0].substring(1, el[0].length - 1),
                        url: el1 + ':' + el2
                    }
                )
            }
            this.spinner = false;
        }, (error: HttpErrorResponse) => {
            console.log("Error while retrieving data");
        }
        )
    }

    getDemandeEtape(id: number): void {

        this.demandVoyageService.getDemandeEtape(id).subscribe((data: any) => {
            this.etape_de_taitement_de_demande = data['data'];

            //Réécrie le timeline comme je pourrais le réutiliser
            this.spinner = false;
        }, (error: HttpErrorResponse) => {
            console.log("Error while retrieving data");
        }
        )
    }
    formatDate(date: string) {
        const d = date.split("T");
        if (d.length > 1) {
            return d[0] + ' ' + d[1].substr(0, 8);
        }
        else {
            return '';
        }
    }
    ngOnInit() {
        this.activatedRoute.params.subscribe(params => {
            const id = params['id'];
            this.id=id;
            if (id) {
                this.getDemand(id);
            }
        })
    }
    previewFile(file: File) {
        const fileUrl = URL.createObjectURL(file);
        this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(fileUrl);
    }
    getSafeUrl(url: string): SafeResourceUrl {
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
    getTheUrl(event: MouseEvent, p: string) {
        event.preventDefault();
        // const url = (event.target as HTMLAnchorElement).href;
        console.log(p)
        this.the_url = p;
    }
    accept() {
        this.demandVoyageService.accept(this.id).subscribe(response => {
            this.notificationForm("success", "Statut modifier avec succes !");
        }, (error: HttpErrorResponse) => {
            this.notificationForm("danger", "Erreur de modification du statut !" + error);
        })
    }
    denied() {
        this.demandVoyageService.denied(this.id).subscribe(response => {
            this.notificationForm("success", "Statut modifier avec succes !");
        }, (error: HttpErrorResponse) => {
            this.notificationForm("danger", "Erreur de modification du statut !" + error);
        })
    }

    notificationForm(type: string, msg: string) {
        this.typeNotificationForm = type;
        this.messageNotificationForm = msg;
        this.isNotificationForm = true;
    }

    closeNotificationForm() {
        this.isNotificationForm = false;
    }

    onCloseHandled() {
        this.display = "none";
    }

    statut_change(e) {
        console.log(e.target.value)
    }
    openModal(id_element: number) {
        this.display = "block";
        switch (id_element) {
            case 0:
                this.show_modal_0 = true
                this.show_modal_1 = false
                this.show_modal_2 = false
                this.show_modal_3 = false
                break;
            case 1:
                this.show_modal_0 = false
                this.show_modal_1 = true
                this.show_modal_2 = false
                this.show_modal_3 = false
                break;
            case 2:
                this.show_modal_0 = false
                this.show_modal_1 = false
                this.show_modal_2 = true
                this.show_modal_3 = false
                break;
            case 3:
                this.show_modal_0 = false
                this.show_modal_1 = false
                this.show_modal_2 = false
                this.show_modal_3 = true
                break;
            default:
            // code block
        }
    }

    motif_ipt_change(e: string) {
        switch (e) {
            case 'motif0':
                this.motif0_error = this.motif0.value == '' ? true : false;
                break;
            case 'motif1':
                this.motif1_error = this.motif1.value == '' ? true : false;
                break;
            case 'motif2':
                this.motif2_error = this.motif2.value == '' ? true : false;
                break;
            case 'motif3':
                this.motif3_error = this.motif3.value == '' ? true : false;
                break;

            default:
            // code block
        }
    }

    onClickSubmit(step: number) {
        this.submitted = true;
        switch (step) {
            case 0:
                // if(this.motif0.value == ''){
                //     this.motif0_error = true;
                //     return
                // }
                if (!this.statut_spet0.invalid && this.statut_spet0.value == 0 && this.motif0.value == '') {
                    this.motif0_error = true;
                    return
                }

                this.saving = true
                const formData = this.etap0Form.value;
                const data = JSON.stringify(formData);
                this.demandVoyageService.addDemandeEtape({
                    id_demande:this.id ,
                    etape:0,
                    data:data
                }).subscribe((data: any) => {
                    this.notificationForm(
                        "success",
                        "Enregistrement réussi !"
                    );
                    this.getDemandeEtape(this.id);
                    this.display = "none";
                }, (error: HttpErrorResponse) => {
                    console.log("Error while retrieving data");
                }
                )
                this.saving = false
            
                break;
            case 1:
                console.log(this.etap1Form.invalid)
                break;
            case 2:
                console.log(this.etap2Form.invalid)
                break;
            case 3:
                console.log(this.etap1Form.invalid)
                break;
            default:
                console.log('default')

                $('html,body').animate({
                    scrollTop: $("#result-alert").offset().top
                }, 'slow');
        }
    }

    changeRadio(e) {
        console.log(e)
    }

    get statut_spet0(): any {
        return this.etap0Form.get('statut_spet0');
    }
    get cause0(): any {
        return this.etap0Form.get('cause0');
    }
    get motif0(): any {
        return this.etap0Form.get('motif0');
    }
    get file0(): any {
        return this.etap0Form.get('file0');
    }

    get statut_spet1(): any {
        return this.etap1Form.get('statut_spet1');
    }
    get cause1(): any {
        return this.etap1Form.get('cause1');
    }
    get motif1(): any {
        return this.etap1Form.get('motif1');
    }
    get file1(): any {
        return this.etap1Form.get('file1');
    }

    get statut_spet2(): any {
        return this.etap2Form.get('statut_spet2');
    }
    get cause2(): any {
        return this.etap2Form.get('cause2');
    }
    get motif2(): any {
        return this.etap2Form.get('motif2');
    }
    get file2(): any {
        return this.etap2Form.get('file2');
    }

    get statut_spet3(): any {
        return this.etap3Form.get('statut_spet3');
    }
    get cause3(): any {
        return this.etap3Form.get('cause3');
    }
    get motif3(): any {
        return this.etap3Form.get('motif3');
    }
    get file3(): any {
        return this.etap3Form.get('file3');
    }

}
