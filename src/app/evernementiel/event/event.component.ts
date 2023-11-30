import { Component, Renderer2, OnInit, Inject, ViewChild } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ActualiteService } from '../../services/actualite.service';
import { Regulation } from 'app/models/regulation';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {Actualite} from '../../models/Actualite';
import {environment} from '../../../environments/environment';

@Component({
    selector: 'app-event',
    templateUrl: './event.component.html',
    styleUrls: ['./event.component.styl']
})
export class EventComponent implements OnInit {
    constructor(private actualiteService: ActualiteService, private router: Router,
                private activeRoute: ActivatedRoute) { }


    listJourneeHospitaliere: Array<Actualite> = [];
    listJourneeCooperation: Array<Actualite> = [];
    listAutreEvent: Array<Actualite> = [];
    listJournee: Array<Actualite> = [];
    listJourneeScientifique: Array<Actualite> = [];
    url: string = environment.accet_url

    typeNotificationForm: string;
    messageNotificationForm: string;
    isNotificationForm: boolean = false;
    spinner = true;
    displayedColumnsActivite = [
        'id',
        'type',
        'titre',
        'action'
    ];
    dataSourceActivite: MatTableDataSource<Actualite>;
    dataSourceArticle: MatTableDataSource<Actualite>;
    dataSourceAgenda: MatTableDataSource<Actualite>;
    dataSourceJourne: MatTableDataSource<Actualite>;


    display = "none";
    displayShowModal = "none";

    titre_modal: string = "Ajouter un FAQ";
    action: string = "add";

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    listReservation


    ngOnInit() {
        this.getListJourneeHospitaliere();
        this.getListJourneeCooperation();
        this.getListJourneeScientifique();
        this.getListAutreEvent();

    }
    display1 = "none";
    display2 = "none";

    openModal1(id_element?: number,myaction?:any) {

        this.titre_modal = "Liste des reservations pour ce evernement";
        this.display2 = "block";
        this.actualiteService.getReservationByEvent(id_element).subscribe((response)=>{

            this.listReservation=response['data'];


        },(error => console.log("error")));

    }


    checkCheckBoxvalue(event,id){
        console.log(event.checked)
        this.spinner = true;
        this.actualiteService.updateIsVedete({
            'id':id,
            'isvedette':event.checked
        }).subscribe((data: any) => {
                // this.listActivite = data['data'];
                console.log(data)
            this.getListJourneeHospitaliere();
            this.getListJourneeCooperation();
            this.getListJourneeScientifique();
            this.getListAutreEvent();

            this.spinner = false;
            }, (error: HttpErrorResponse) => {
                console.log("Error while retrieving data");
            }
        )
    }


    getListJourneeHospitaliere(): void {
        this.actualiteService.getByType("JOURNEE-HOSPITALIERE").subscribe((data: Array<Actualite>) => {
                this.listJourneeHospitaliere = data['data'];

                //this.dataSource=data['data'];
                // this.dataSourceActivite = new MatTableDataSource(data['data']);

                // this.dataSourceActivite.paginator = this.paginator;
                // this.dataSourceActivite.sort = this.sort;
                // this.setPaginationLabelToFrench();
                this.spinner = false;
            }, (error: HttpErrorResponse) => {
                console.log("Error while retrieving data");
            }
        )
    }

    getListJourneeCooperation(): void {
        this.actualiteService.getByType("JOURNEE-COOPERATION").subscribe((data: Array<Actualite>) => {
                this.listJourneeCooperation = data['data'];

                //this.dataSource=data['data'];
                // this.dataSourceActivite = new MatTableDataSource(data['data']);

                // this.dataSourceActivite.paginator = this.paginator;
                // this.dataSourceActivite.sort = this.sort;
                // this.setPaginationLabelToFrench();
                this.spinner = false;
            }, (error: HttpErrorResponse) => {
                console.log("Error while retrieving data");
            }
        )
    }

    getListJourneeScientifique(): void {
        this.actualiteService.getByType("JOURNEE-SCIENTIFIQUE").subscribe((data: Array<Actualite>) => {
                this.listJourneeScientifique = data['data'];

                //this.dataSource=data['data'];
                // this.dataSourceActivite = new MatTableDataSource(data['data']);

                // this.dataSourceActivite.paginator = this.paginator;
                // this.dataSourceActivite.sort = this.sort;
                // this.setPaginationLabelToFrench();
                this.spinner = false;
            }, (error: HttpErrorResponse) => {
                console.log("Error while retrieving data");
            }
        )
    }


    getListAutreEvent(): void {
        this.actualiteService.getByType("AUTRE-EVERNEMENT").subscribe((data: Array<Actualite>) => {
                this.listAutreEvent = data['data'];
                this.spinner = false;
            }, (error: HttpErrorResponse) => {
                console.log("Error while retrieving data");
            }
        )
    }





    openModal(id_element?: number) {
        if (id_element) {
            this.action = "edit";
            this.titre_modal = "Editer un FAQ";

            // var el = this.faq.find(x => x.id == id_element);
            // this.selected_faq = el;

            // this.question.reset({ value: el.question })
            // this.answer.reset({ value: el.content })

            // this.faqForm.patchValue({
            //     question: el.question,
            //     answer: el.content,
            //     job: el.job,
            // });

        }
        else {
            this.titre_modal = "Ajouter un FAQ";
            this.action = "add";
            // this.faqForm.patchValue({
            //     question: '',
            //     answer:'',
            //     job: '',
            // });

        }
        this.display = "block";
    }



    onCloseHandled() {
        this.display = "none";
        this.display1 = "none";
        this.display2 = "none";
    }

    openShowModal(id: number) {
        // this.selected_faq = this.faq.find(x => x.id == id);
        this.displayShowModal = "block";
    }

    onCloseHandledShowModal() {
        this.displayShowModal = "none";
    }

    // getList(): void {
    //     this.actualiteService.list().subscribe((data: Array<Regulation>) => {
    //         this.actu = data['data'];
    //         //this.dataSource =  data['data'];
    //         this.dataSource = new MatTableDataSource(data['data']);
    //
    //         this.dataSource.paginator = this.paginator;
    //         this.dataSource.sort = this.sort;
    //         this.setPaginationLabelToFrench();
    //         this.spinner = false;
    //     }, (error: HttpErrorResponse) => {
    //         console.log("Error while retrieving data");
    //     }
    //     )
    // }

    setPaginationLabelToFrench() {
        this.paginator._intl.itemsPerPageLabel = 'Elements par page:';
        this.paginator._intl.nextPageLabel = 'Page suivante';
        this.paginator._intl.previousPageLabel = 'Page précédente';
        this.paginator._intl.getRangeLabel = this.frenchRangeLabel;
    }

    edit(id: number) {
        // this.router.navigate(['/regulation/add'], { queryParams: {
        //     id: id
        // }});
        this.router.navigate(['/regulation/add', { id: id }])
    }

    deleteElement(id: number) {


        this.actualiteService.delete(id).subscribe(response => {
            this.notificationForm("success", "Supression réussi !");
            // this.getList();
            this.ngOnInit()
        }, (error: HttpErrorResponse) => {
            console.log("Error while deleting data");
        })
    }

    hideElement(id: number) {
        this.actualiteService.hide(id).subscribe(response => {
            this.notificationForm("success", "Statut modifier avec succes !");
            // this.getList();
        }, (error: HttpErrorResponse) => {
            console.log("Error while hidden data");
            this.notificationForm("danger", "Error de modification du statut !");
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

    ngAfterViewInit() {
         this.dataSourceActivite.paginator = this.paginator;
        this.dataSourceActivite.sort = this.sort;
    }
    
    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
        this.dataSourceActivite.filter = filterValue;
    }

    frenchRangeLabel(page: number, pageSize: number, length: number): string {
        if (length === 0 || pageSize === 0) {
            return `0 sur ${length}`;
        }

        length = Math.max(length, 0);

        const startIndex = page * pageSize;

        // If the start index exceeds the list length, do not try and fix the end index to the end.
        const endIndex = startIndex < length ?
            Math.min(startIndex + pageSize, length) :
            startIndex + pageSize;

        return `${startIndex + 1} - ${endIndex} sur ${length}`;
    }
}

