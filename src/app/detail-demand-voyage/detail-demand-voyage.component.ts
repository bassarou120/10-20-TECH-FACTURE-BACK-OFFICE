import { Component, Input } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { DemandVoyageService } from 'app/services/demand-voyage.service';
import { Demand } from 'app/models/demand';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FormControl, Validators, FormGroup } from '@angular/forms';

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
    typeNotificationForm: string;
    messageNotificationForm: string;
    isNotificationForm: boolean = false;

    display = "none";
    spinner = true;
    show_modal_0 = false;
    show_modal_1 = false;
    show_modal_2 = false;
    show_modal_3 = false;

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
        cause0: new FormControl('', Validators.required),
    });

    etap1Form = new FormGroup({
        statut_spet1: new FormControl('', Validators.required),
        cause1: new FormControl('', Validators.required),
    });

    etap2Form = new FormGroup({
        statut_spet2: new FormControl('', Validators.required),
        cause2: new FormControl('', Validators.required),
    });

    etap3Form = new FormGroup({
        statut_spet3: new FormControl('', Validators.required),
        cause3: new FormControl('', Validators.required),
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

    statut_change(e){
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


    onClickSubmit(step: number) {

    }

    changeRadio(e){
        console.log(e)
    }

    get statut_spet0(): any {
        return this.etap0Form.get('statut_spet0');
    }
    get cause0(): any {
        return this.etap0Form.get('cause0');
    }

    get statut_spet1(): any {
        return this.etap0Form.get('statut_spet1');
    }
    get cause1(): any {
        return this.etap0Form.get('cause1');
    }
    
    get statut_spet2(): any {
        return this.etap0Form.get('statut_spet2');
    }
    get cause2(): any {
        return this.etap0Form.get('cause2');
    }

    get statut_spet3(): any {
        return this.etap0Form.get('statut_spet3');
    }
    get cause3(): any {
        return this.etap0Form.get('cause3');
    }
    
}
