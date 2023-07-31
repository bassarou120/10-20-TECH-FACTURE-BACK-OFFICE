import { Component, Renderer2, OnInit, Inject, ViewChild } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { Regulation } from 'app/models/regulation';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';


@Component({
    selector: 'app-pays-membre',
    templateUrl: './pays-membre.component.html',
    styleUrls: ['./pays-membre.component.styl']
})
export class PaysMembreComponent implements OnInit {
    constructor( private router: Router,
                private activeRoute: ActivatedRoute) { }



    messageNotificationForm: string;
    isNotificationForm: boolean = false;
    spinner = true;



    display = "none";
    displayShowModal = "none";

    titre_modal: string = "Ajouter un FAQ";
    action: string = "add";

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;




    ngOnInit() {

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
        this.router.navigate(['/regulation/add', { id: id }])
    }


    closeNotificationForm() {
        this.isNotificationForm = false;
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

