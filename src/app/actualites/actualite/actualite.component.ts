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
    selector: 'app-regulations',
    templateUrl: './actualite.component.html',
    styleUrls: ['./actualite.component.styl']
})
export class ActualiteComponent implements OnInit {
    constructor(private actualiteService: ActualiteService, private router: Router,
                private activeRoute: ActivatedRoute) { }


    listActivite: Array<Actualite> = [];
    listArticle: Array<Actualite> = [];
    listAgenda: Array<Actualite> = [];
    listJournee: Array<Actualite> = [];
    url: string = environment.base_url_backend

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




    ngOnInit() {
        this.getListActivite();
        this.getListArticle();
        this.getListAgenda();
        this.getListJourne();
    }


    getListActivite(): void {
        this.actualiteService.getByType("ACTIVITE-PHARRE").subscribe((data: Array<Actualite>) => {
                this.listActivite = data['data'];

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

    getListArticle(): void {
        this.actualiteService.getByType("ARTICLE").subscribe((data: Array<Actualite>) => {
                this.listArticle = data['data'];

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


    getListAgenda(): void {
        this.actualiteService.getByType("AGENDA").subscribe((data: Array<Actualite>) => {
                this.listAgenda = data['data'];
                this.spinner = false;
            }, (error: HttpErrorResponse) => {
                console.log("Error while retrieving data");
            }
        )
    }

    getListJourne(): void {
        this.actualiteService.getByType("JOURNEE-SCIENTIFIQUE").subscribe((data: Array<Actualite>) => {
                this.listJournee = data['data'];
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

