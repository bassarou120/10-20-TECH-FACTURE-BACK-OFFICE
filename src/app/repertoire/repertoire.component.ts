import { Component,ViewChild } from '@angular/core';
import { OperateurTouristiqueService } from 'app/services/operateur-touristique.service';
import { OperateurTouristique } from 'app/models/operateur-touristique';
import { JobService } from 'app/services/job.service';
import { Job } from 'app/models/job';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
    selector: 'repertoire',
    templateUrl: './repertoire.component.html',
    styleUrls: ['./repertoire.component.styl']
})
export class RepertoireComponent {

    constructor(private opService: OperateurTouristiqueService, private jobService: JobService) { }
    operateurs: Array<OperateurTouristique> = [];
    jobs: Array<Job> = [];
    departements: any[] = [];
    communes: any[] = [];
    commune_spinner: boolean = false;
    formatted_phone = '';
    departement_search = '';
    loading_elemnt = true;
    id: number
    searchForm: FormGroup;
    public isCollapsed = true;

    typeNotificationForm: string;
    messageNotificationForm: string;
    isNotificationForm: boolean = false;
    spinner = true;
    selected_op:OperateurTouristique

    display = "none";
    displayShowModal = "none";
    displayedColumns = [
        'id',
        'metier',
        'denomination',
        'ifu',
        'telephone',
        'npi_promoteur',
        'action'
    ];
    dataSource: MatTableDataSource<OperateurTouristique>;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    getList(): void {
        this.opService.list(this.id).subscribe((data: Array<OperateurTouristique>) => {
            this.operateurs = data["data"];
            this.dataSource = new MatTableDataSource(data['data']);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.setPaginationLabelToFrench();
            this.spinner = false;
            this.loading_elemnt = false;
        }, (error: HttpErrorResponse) => { console.log(error) }
        )
    }

    getDepartment(): void {
        this.opService.get_department().subscribe((data: any) => {
            this.departements = data;
        }, (error: HttpErrorResponse) => {
            console.log("Error while retrieving data");
        }
        )
    }

    ngOnInit() {
        this.getList();
        this.getDepartment();
    }

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    }
    
    setPaginationLabelToFrench() {
        this.paginator._intl.itemsPerPageLabel = 'Elements par page:';
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

        // If the start index exceeds the list length, do not try and fix the end index to the end.
        const endIndex = startIndex < length ?
            Math.min(startIndex + pageSize, length) :
            startIndex + pageSize;

        return `${startIndex + 1} - ${endIndex} sur ${length}`;
    }

 
    
      openShowModal(id: number) {
        this.selected_op = this.operateurs.find(x => x.id == id);
        this.displayShowModal = "block";
      }
    
      onCloseHandledShowModal() {
        this.displayShowModal = "none";
      }
    
}
