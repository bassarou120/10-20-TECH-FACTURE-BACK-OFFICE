import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DemandVoyageService } from 'app/services/demand-voyage.service';
import { Demand } from 'app/models/demand';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
    selector: 'list-demand-voyage',
    templateUrl: './list-demand-voyage.component.html',
    styleUrls: ['./list-demand-voyage.component.styl']
})
export class ListDemandVoyageComponent {
    constructor(private demandVoyageService: DemandVoyageService, private router: Router) { }

    demand: Array<Demand> = [];
    spinner = true;
    displayedColumns = [
        '#',
        'demande',
        'nom_du_service',
        'demandeDate',
        'derniere_mise_a_jour',
        'status',
        'action'
    ];
    displayShowModal = "none";
    display = "none";
    dataSource: MatTableDataSource<Demand>;
    selected_demand: Demand

    openModal(id_element: number) {
        var el = this.demand.find(x => x.id == id_element);
        this.selected_demand = el;
        this.display = "block";
    }

    onCloseHandled() {
        this.display = "none";
    }

    onCloseHandledShowModal() {
        this.displayShowModal = "none";
    }
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    getList(): void {
        this.demandVoyageService.listByJob("AGV").subscribe((data: Array<Demand>) => {
            this.demand = data['data'];
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

    onRowClicked(id: any) {
        console.log('hello')
        this.router.navigate(['/detail-demand-voyage', id]);
    }

    ngOnInit() {
        this.getList();
    }


    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    }

    setPaginationLabelToFrench() {
        this.paginator._intl.itemsPerPageLabel = 'Demandes par page:';
        this.paginator._intl.nextPageLabel = 'Page suivante';
        this.paginator._intl.previousPageLabel = 'Page précédente';
        this.paginator._intl.getRangeLabel = this.frenchRangeLabel;
    }

    frenchRangeLabel(page: number, pageSize: number, length: number): string {
        if (length === 0 || pageSize === 0) {
            return `0 sur ${length}`;
        }

        length = Math.max(length, 0);

        const startIndex = page * pageSize;

        const endIndex = startIndex < length ?
            Math.min(startIndex + pageSize, length) :
            startIndex + pageSize;

        return `${startIndex + 1} - ${endIndex} sur ${length}`;
    }
}
