import { Component, Renderer2, OnInit, Inject, ViewChild } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { RegulationService } from '../../services/regulation.service';
import { Regulation } from 'app/models/regulation';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
    selector: 'app-regulations',
    templateUrl: './regulations.component.html',
    styleUrls: ['./regulations.component.styl']
})
export class RegulationsComponent implements OnInit {
    constructor(private regulationService: RegulationService, private router: Router,
        private activeRoute: ActivatedRoute) { }
    regs: Array<Regulation> = [];

    typeNotificationForm: string;
    messageNotificationForm: string;
    isNotificationForm: boolean = false;
    spinner = true;
    displayedColumns = [
        'id',
        'type',
        'titre',
        'job',
        'isDisplayed',
        'action'
    ];
    dataSource: MatTableDataSource<Regulation>;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;


    ngOnInit() {
        this.getList();
    }

    getList(): void {
        this.regulationService.list().subscribe((data: Array<Regulation>) => {
            this.regs = data['data'];
            //this.dataSource =  data['data'];
            this.dataSource = new MatTableDataSource(data['data']);

            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.setPaginationLabelToFrench();
            this.spinner = false;
        }, (error: HttpErrorResponse) => {
            console.log("Error while retrieving data");
        }
        )
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

    deleteElement(id: number) {
        this.regulationService.delete(id).subscribe(response => {
            this.notificationForm("success", "Supression réussi !");
            this.getList();
        }, (error: HttpErrorResponse) => {
            console.log("Error while deleting data");
        })
    }

    hideElement(id: number) {
        this.regulationService.hide(id).subscribe(response => {
            this.notificationForm("success", "Statut modifier avec succes !");
            this.getList();
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
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }
    
    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
        this.dataSource.filter = filterValue;
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

