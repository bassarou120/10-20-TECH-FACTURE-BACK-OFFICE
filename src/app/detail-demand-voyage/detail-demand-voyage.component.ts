import { Component, Input } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { DemandVoyageService } from 'app/services/demand-voyage.service';
import { Demand } from 'app/models/demand';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import * as pdfjsLib from 'pdfjs-dist';


import { AbstractControl, ValidationErrors } from '@angular/forms';
import * as e from 'express';
export function requiredIfSpecificValueValidator(controlName: string, mustRequireFieldControlName: string) {
    return (control: AbstractControl): ValidationErrors | null => {
        const controlValue = control.get(controlName)?.value;
        if (controlValue == 0 && !mustRequireFieldControlName) {
            return { requiredIfSpecificValue: true };
        }
        return null;
    };
}
export function requiredIfSpecificValueEqualToTrueValidator(controlName: string, mustRequireFieldControlName: string) {
    return (control: AbstractControl): ValidationErrors | null => {
        const controlValue = control.get(controlName)?.value;
        if (controlValue == 1 && !mustRequireFieldControlName) {
            return { requiredIfSpecificValueEqualToTrue: true };
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
    constructor(private demandVoyageService: DemandVoyageService, private activatedRoute: ActivatedRoute, private sanitizer: DomSanitizer, private http: HttpClient) { }

    demand: Demand;
    id: number;
    fileUrl: SafeResourceUrl;
    //  the_url = 'https://tourisme-api.herokuapp.com/api/v1/filemanager/files3/PS01279-230316-XqjprJ&&&2_CV_Cokou_ADJAFEFA.pdf';
    the_url = 'https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf';
    pdfSrc: any;

    data_pieces = [];
    etape_de_taitement_de_demande = [];     
    typeNotificationForm: string;
    messageNotificationForm: string;
    isNotificationForm: boolean = false;

    display = "none";
    spinner = true;
    spinner_pdf= false;
    submitted = false;

    show_modal_0 = false;
    show_modal_1 = false;
    show_modal_2 = false;
    show_modal_3 = false;
    show_modal_4 = false;
    show_modal_5 = false;

    motif0_error = false;
    motif1_error = false;
    motif2_error = false;
    motif3_error = false;
    motif4_error = false;
    motif5_error = false;
    saving = false;

    steps = [];
    current = [
        {
            id: 0,
            title: 'Vérification de la complétude des pièces (Secrétariat – UAT)',
            date: '2016 - 2019',
            statut: true,
            fichier: [],
            display: true
        },
        {
            id: 1,
            title: 'Examen du dossier et fixation de la date d’entretien (Organe Technique - UAT)',
            date: '2016 - 2019',
            statut: false,
            fichier: [],
            display: false
        },
        {
            id: 2,
            title: 'Entretien (Organe technique - UAT )',
            date: '2016 - 2019',
            statut: false,
            fichier: [],
            display: false
        },
        {
            id: 3,
            title: 'Entretien effectué avec succès',
            date: '2016 - 2019',
            statut: false,
            fichier: [],
            display: false
        },
        {
            id: 4,
            title: 'Demande acceptée',
            date: '2016 - 2019',
            statut: false,
            fichier: [],
            display: false
        }

    ];

    fileToUpload: File = null;

    etap0Form: FormGroup;

    etap1Form: FormGroup;

    etap2Form: FormGroup;

    etap4Form: FormGroup;

    etap5Form: FormGroup;
   
    formattedDate1 =''

    loadPdf_old() {
        this.http.get(this.the_url, { responseType: 'arraybuffer' })
            .subscribe((data) => {
                const blob = new Blob([data], { type: 'application/pdf' });
                const url = URL.createObjectURL(blob);
                this.the_url = url;
                
            });
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
            var s = [];
            const a = data['data'];
            console.log(a)
            for (let i = 0; i < a.length; i++) {
                var extra_data = JSON.parse(a[i].data);
                if (a[i].etape == 0) {
                    var title = 'Vérification de la complétude des pièces'
                }
                else if (a[i].etape == 1) {
                    var title = 'Examen du dossier et fixation de la date d\'entretien'
                }
                else if (a[i].etape == 2) {
                    var title = 'Entretien'
                }
                else if (a[i].etape == 3) {
                    var title = 'Complément des pièces'
                }
                else if (a[i].etape == 4) {
                    var title = 'Examen des pièces complémentaires et délibération'
                }
                else if (a[i].etape == 5) {
                    var title = 'Décision finale de l’autorité'
                }
                else {
                    console.log('ici')
                }
                s.push({
                    id: a[i].id,
                    title: title,
                    date: extra_data.date,
                    statut: a[i].status,
                    decision: extra_data[`statut_spet${a[i].etape}`],
                    fichier: a[i].piece,
                    etape: a[i].etape,
                    commentaire: extra_data[`motif${a[i].etape}`]
                })
            }
            const today = new Date();
            const day = String(today.getDate()).padStart(2, '0');
            const month = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
            const year = today.getFullYear().toString().substr(-2);

            const formattedDate = `${day}-${month}-${year}`;
            if(a.length > 0){
                if(s.length>0 &&  s[s.length - 1].decision =='1'){
                    const last_stored_step = a[a.length - 1].etape;
                    switch (a[a.length - 1].etape) {
                        case "0":
                            s.push({
                                id: '',
                                title: 'Examen du dossier et fixation de la date d\'entretien',
                                date: formattedDate,
                                statut: false,
                                decision:'',
                                fichier: [],
                                etape: 1
                            });
                            break;
                        case "1":
                            s.push({
                                id: '',
                                title: 'Entretien',
                                date: formattedDate,
                                statut: false,
                                decision: '',
                                fichier: [],
                                etape: 2
                            })
                            break;
                        case "2":
                            s.push({
                                id: '',
                                title: 'Complément des pièces',
                                date: formattedDate,
                                statut: false,
                                decision: '',
                                fichier: [],
                                etape: 3
                            });
                            break;
                        case "3":
                            s.push({
                                id: '',
                                title: 'Examen des pièces complémentaires et délibération',
                                date: formattedDate,
                                statut: false,
                                decision: '',
                                fichier: [],
                                etape: 4
                            });
                            break;
                        case "4":
                            s.push({
                                id: '',
                                title: 'Décision finale de l’autorité',
                                date: formattedDate,
                                statut: false,
                                decision: '',
                                fichier: [],
                                etape: 5
                            });
                            break;
                        default:
                            s.push({
                                id: 0,
                                title: 'Vérification de la complétude des pièces',
                                date: formattedDate,
                                statut: false,
                                fichier: [],
                                etape: 0
                            });
                    }
                }
            }
            else{
                s.push({
                    id: 0,
                    title: 'Vérification de la complétude des pièces',
                    date: formattedDate,
                    statut: false,
                    decision: '',
                    fichier: [],
                    etape: 0,
                    commentaire: ''
                });
            }

         /*    if (a.length > 0 && s.length>0 &&  s[s.length - 1].decision =='1') {
               
                if (a[a.length - 1].status) {
                    const last_stored_step = a[a.length - 1].etape;
                    switch (a[a.length - 1].etape) {
                        // decision: extra_data[`statut_spet${last_stored_step}`],

                        case "0":
                            s.push({
                                id: '',
                                title: 'Examen du dossier et fixation de la date d\'entretien',
                                date: formattedDate,
                                statut: false,
                                decision:'',
                                fichier: [],
                                etape: 1
                            });
                            break;
                        case "1":
                            s.push({
                                id: '',
                                title: 'Entretien',
                                date: formattedDate,
                                statut: false,
                                decision: '',
                                fichier: [],
                                etape: 2
                            })
                            break;
                        case "2":
                            s.push({
                                id: '',
                                title: 'Complément des pièces',
                                date: formattedDate,
                                statut: false,
                                decision: '',
                                fichier: [],
                                etape: 3
                            });
                            break;
                        case "3":
                            s.push({
                                id: '',
                                title: 'Examen des pièces complémentaires et délibération',
                                date: formattedDate,
                                statut: false,
                                decision: '',
                                fichier: [],
                                etape: 4
                            });
                            break;
                        case "4":
                            s.push({
                                id: '',
                                title: 'Décision finale de l’autorité',
                                date: formattedDate,
                                statut: false,
                                decision: '',
                                fichier: [],
                                etape: 5
                            });
                            break;
                        default:
                            s.push({
                                id: 0,
                                title: 'Vérification de la complétude des pièces',
                                date: formattedDate,
                                statut: false,
                                fichier: [],
                                etape: 0
                            });
                    }
                }
            }
            else {
                s.push({
                    id: 0,
                    title: 'Vérification de la complétude des pièces',
                    date: formattedDate,
                    statut: false,
                    decision: '',
                    fichier: [],
                    etape: 0,
                    commentaire: ''
                });
            } */
            
            this.steps = s;
            console.log(this.steps)
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
        const now = new Date();

        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');

        this.formattedDate1= `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
        this.activatedRoute.params.subscribe(params => {
            const id = params['id'];
            this.id = id;
            if (id) {
                this.getDemand(id);
                this.getDemandeEtape(id)

                this.etap0Form = new FormGroup({
                    etape: new FormControl(0),
                    date:new FormControl(this.formattedDate1) ,
                    id: new FormControl(this.id),
                    statut_spet0: new FormControl('', Validators.required),
                    cause0: new FormControl(''),
                    motif0: new FormControl(''),
                    file0: new FormControl(''),
                }, {
                    validators: [requiredIfSpecificValueValidator('statut_spet0', 'cause0'), requiredIfSpecificValueValidator('statut_spet0', 'motif0')]
                });

                this.etap1Form = new FormGroup({
                    etape: new FormControl(1),
                    id: new FormControl(this.id),
                    date:new FormControl(this.formattedDate1) ,
                    statut_spet1: new FormControl('', Validators.required),
                    motif1: new FormControl(''),
                    file1: new FormControl(''),
                    date_entretien: new FormControl(''),
                    heure_entretien: new FormControl(''),
                    lieu_entretien: new FormControl(''),
                }, {
                    validators: [
                        requiredIfSpecificValueValidator('statut_spet1', 'motif1'),
                        requiredIfSpecificValueEqualToTrueValidator('statut_spet1', 'date_entretien'),
                        requiredIfSpecificValueEqualToTrueValidator('statut_spet1', 'heure_entretien'),
                        requiredIfSpecificValueEqualToTrueValidator('statut_spet1', 'lieu_entretien'),
                    ]
                });

                this.etap2Form = new FormGroup({
                    etape: new FormControl(2),
                    id: new FormControl(this.id),
                    date:new FormControl(this.formattedDate1) ,
                    statut_spet2: new FormControl('', Validators.required),
                    cause2: new FormControl(''),
                    motif2: new FormControl(''),
                    file2: new FormControl(''),
                }, {
                    validators: [requiredIfSpecificValueValidator('statut_spet2', 'cause2'), requiredIfSpecificValueValidator('statut_spet2', 'motif2')]
                });

                this.etap4Form = new FormGroup({
                    etape: new FormControl(4),
                    id: new FormControl(this.id),
                    date:new FormControl(this.formattedDate1) ,
                    statut_spet4: new FormControl('', Validators.required),
                    cause4: new FormControl(''),
                    motif4: new FormControl(''),
                    file4: new FormControl(''),
                }, {
                    validators: [requiredIfSpecificValueValidator('statut_spet4', 'cause4'), requiredIfSpecificValueValidator('statut_spet3', 'motif3')]
                });

                this.etap5Form = new FormGroup({
                    etape: new FormControl(0),
                    id: new FormControl(this.id),
                    date:new FormControl(this.formattedDate1) ,
                    statut_spet5: new FormControl('', Validators.required),
                    cause5: new FormControl(''),
                    motif5: new FormControl(''),
                    file5: new FormControl(''),
                }, {
                    validators: [requiredIfSpecificValueValidator('statut_spet5', 'cause5'), requiredIfSpecificValueValidator('statut_spet5', 'motif5')]
                });

            }
        })
      //  this.loadPdf();
     // this.viewer.initialize();

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
        this.spinner_pdf = true ;
        this.the_url = p['url'];
        console.log(p['url'])
        this.spinner_pdf = false ;
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
        if(id_element==3){
            return
        }
        this.display = "block";
        console.log(id_element)
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
                // this.motif3_error = this.motif3.value == '' ? true : false;
                break;
            case 'motif4':
                this.motif4_error = this.motif4.value == '' ? true : false;
                break;
            case 'motif5':
                this.motif5_error = this.motif5.value == '' ? true : false;
                break; 

            default:
            // code block
        }
    }

    handleFileInput(event) {
        this.fileToUpload = event.target.files[0];
    }

    onClickSubmit(event: Event,step: number) {
        event.preventDefault();
        this.submitted = true;
        const now = new Date();

        const formattedDate = now.toLocaleString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });

        if(step !=2){
            if (!this[`statut_spet${step}`].invalid && this[`statut_spet${step}`].value == 0 && this[`motif${step}`].value == '') {
                this[`motif${step}_error`] = true
                return
            }
        }
       
        this.saving = true
      
        const formData = this[`etap${step}Form`].value;

        const data = new FormData();
        data.append('id_demande', formData.id);
        data.append('etape', formData.etape);
        data.append('data', JSON.stringify(formData));
        data.append('Content-Type', 'multipart/form-data');
        data.append('file', <File>this.fileToUpload);

        this.demandVoyageService.addDemandeEtape(data).subscribe((data: any) => {
            this.notificationForm(
                "success",
                "Enregistrement réussi !"
            );
            this.getDemandeEtape(formData.id);
            this.display = "none";
            this.saving = false
        }, (error: HttpErrorResponse) => {
            console.log("Error while retrieving data");
        }
        )
       
        // switch (step) {
        //     case 0:
        //         // if(this.motif0.value == ''){
        //         //     this.motif0_error = true;
        //         //     return
        //         // }
        //         if (!this.statut_spet0.invalid && this.statut_spet0.value == 0 && this.motif0.value == '') {
        //             this.motif0_error = true;
        //             return
        //         }

        //         this.saving = true
        //         var formData = this.etap0Form.value;
        //         formData.append('date0',formattedDate);
        //         const data0 = new FormData();
        //         data0.append('id_demande', formData.id);
        //         data0.append('etape', formData.etape);
        //         data0.append('data', JSON.stringify(formData));
        //         data0.append('Content-Type', 'multipart/form-data');
        //         data0.append('file', <File>this.fileToUpload);

        //         this.demandVoyageService.addDemandeEtape(data0).subscribe((data: any) => {
        //             this.notificationForm(
        //                 "success",
        //                 "Enregistrement réussi !"
        //             );
        //             this.getDemandeEtape(formData.id);
        //             this.display = "none";
        //         }, (error: HttpErrorResponse) => {
        //             console.log("Error while retrieving data");
        //         }
        //         )
        //         this.saving = false

        //         break;
        //     case 1:
        //         if (!this.statut_spet1.invalid && this.statut_spet1.value == 0 && this.motif1.value == '') {
        //             this.motif1_error = true;
        //             return
        //         }
        //         this.saving = true
        //         const formData1 = this.etap1Form.value;
        //         formData1.append('date1',formattedDate);

        //         const data1 = new FormData();
        //         data1.append('id_demande', formData1.id);
        //         data1.append('etape', formData1.etape);
        //         data1.append('data', JSON.stringify(formData1));
        //         data1.append('Content-Type', 'multipart/form-data');
        //         data1.append('file', <File>this.fileToUpload);

        //         this.demandVoyageService.addDemandeEtape(data1).subscribe((data: any) => {
        //             this.notificationForm(
        //                 "success",
        //                 "Enregistrement réussi !"
        //             );
        //             this.getDemandeEtape(formData1.id);
        //             this.display = "none";
        //         }, (error: HttpErrorResponse) => {
        //             console.log("Error while retrieving data");
        //         }
        //         )
        //         this.saving = false

        //         break;
        //     case 2:
        //         if (!this.statut_spet2.invalid && this.statut_spet2.value == 0 && this.motif2.value == '') {
        //             this.motif2_error = true;
        //             return
        //         }
        //         this.saving = true
        //         const formData2 = this.etap2Form.value;
        //         formData2.append('date2',formattedDate);

        //         const data2 = new FormData();
        //         data1.append('id_demande', formData2.id);
        //         data1.append('etape', formData2.etape);
        //         data1.append('data', JSON.stringify(formData2));
        //         data1.append('Content-Type', 'multipart/form-data');
        //         data1.append('file', <File>this.fileToUpload);

        //         this.demandVoyageService.addDemandeEtape(data2).subscribe((data: any) => {
        //             this.notificationForm(
        //                 "success",
        //                 "Enregistrement réussi !"
        //             );
        //             this.getDemandeEtape(formData2.id);
        //             this.display = "none";
        //         }, (error: HttpErrorResponse) => {
        //             console.log("Error while retrieving data");
        //         }
        //         )
        //         this.saving = false
        //         break;
        //     case 3:
        //         if (!this.statut_spet3.invalid && this.statut_spet3.value == 0 && this.motif3.value == '') {
        //             this.motif3_error = true;
        //             return
        //         }
        //         this.saving = true
        //         const formData3 = this.etap3Form.value;
        //         formData3.append('date3',formattedDate);

        //         const data3 = new FormData();
        //         data1.append('id_demande', formData3.id);
        //         data1.append('etape', formData3.etape);
        //         data1.append('data', JSON.stringify(formData3));
        //         data1.append('Content-Type', 'multipart/form-data');
        //         data1.append('file', <File>this.fileToUpload);

        //         this.demandVoyageService.addDemandeEtape(data3).subscribe((data: any) => {
        //             this.notificationForm(
        //                 "success",
        //                 "Enregistrement réussi !"
        //             );
        //             this.getDemandeEtape(formData3.id);
        //             this.display = "none";
        //         }, (error: HttpErrorResponse) => {
        //             console.log("Error while retrieving data");
        //         }
        //         )
        //         this.saving = false
        //         break;
        //     default:
        //         console.log('default')

        //         $('html,body').animate({
        //             scrollTop: $("#top").offset().top
        //         }, 'slow');
        // }
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

    get statut_spet4(): any {
        return this.etap4Form.get('statut_spet4');
    }
    get cause3(): any {
        return this.etap4Form.get('cause4');
    }
    get motif4(): any {
        return this.etap4Form.get('motif4');
    }
    get file4(): any {
        return this.etap4Form.get('file4');
    }

    get statut_spet5(): any {
        return this.etap5Form.get('statut_spet5');
    }
    get cause5(): any {
        return this.etap5Form.get('cause5');
    }
    get motif5(): any {
        return this.etap5Form.get('motif5');
    }
    get file5(): any {
        return this.etap5Form.get('file5');
    }

}
