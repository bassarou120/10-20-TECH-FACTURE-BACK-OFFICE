import { Component, Renderer2, OnInit, Inject, ViewChild } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ClientService } from '../../services/client.service';
import { Regulation } from 'app/models/regulation';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {Actualite} from '../../models/Actualite';
import {environment} from '../../../environments/environment';
import {ThemePalette} from '@angular/material/core';
import {ProduitService} from '../../services/produit.service';

@Component({
    selector: 'app-regulations',
    templateUrl: './produit.component.html',
    styleUrls: ['./produit.component.styl']
})
export class ProduitComponent implements OnInit {
    constructor(private produitService: ProduitService, private router: Router,
                private activeRoute: ActivatedRoute) { }

    color: ThemePalette = 'accent';
    checked = false;
    disabled = false;

    listProduit: Array<any> = [];

    listlistProduitPoint: Array<Actualite> = [];
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




    ngOnInit() {
        this.getlistProduits();

    }



    getlistProduits(): void {
        this.produitService.list().subscribe((data: any) => {
                this.listProduit = data['data'].data;

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
        // this.router.navigate(['/regulation/add', { id: id }])
    }

    deleteElement(id: number) {

        let text;
        if (confirm("Voulez vous vraiment supprimer ? ") == true) {

            this.produitService.delete(id).subscribe(response => {
                this.notificationForm("success", "Supression réussi !");
                this.getlistProduits();
                this.ngOnInit()
            }, (error: HttpErrorResponse) => {
                console.log("Error while deleting data");
            })


        } else {

        }

        // this.actualiteService.delete(id).subscribe(response => {
        //     this.notificationForm("success", "Supression réussi !");
        //     // this.getList();
        //     this.ngOnInit()
        // }, (error: HttpErrorResponse) => {
        //     console.log("Error while deleting data");
        // })
    }

    hideElement(id: number) {
        // this.actualiteService.hide(id).subscribe(response => {
        //     this.notificationForm("success", "Statut modifier avec succes !");
        //     // this.getList();
        // }, (error: HttpErrorResponse) => {
        //     console.log("Error while hidden data");
        //     this.notificationForm("danger", "Error de modification du statut !");
        // })
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
        //  this.dataSourceActivite.paginator = this.paginator;
        // this.dataSourceActivite.sort = this.sort;
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

