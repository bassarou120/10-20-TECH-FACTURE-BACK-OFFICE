import {Component,OnInit,ViewChild} from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { CompetitionService } from '../../services/competition.service';
import { Competition } from 'app/models/competition';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
    selector: 'competitions',
    templateUrl: './competitions.component.html',
    styleUrls: ['./competitions.component.styl']
})
export class CompetitionsComponent {
    
    constructor(private competitionService:CompetitionService,private router: Router,
        private activeRoute: ActivatedRoute) {}
        competitions:  Array<Competition>=[];

    typeNotificationForm: string;
    messageNotificationForm: string;
    isNotificationForm: boolean = false;
    spinner = true;
    displayedColumns = [
        'id',
        'titre',
        'startDate',
        'endDate',
        'isDisplayed',
        'action'
    ];
    dataSource: MatTableDataSource<Competition>;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    ngOnInit() {
        this.getList();
    }

    getList():void{
        this.competitionService.list().subscribe((data:Array<Competition>)=>{
            this.competitions=data['data'];
            this.dataSource = new MatTableDataSource(data['data']);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.setPaginationLabelToFrench();
            this.spinner = false;
        },(error: HttpErrorResponse)=>{
            console.log("Error while retrieving data");   
        } 
        )
    }
   
    edit(id:number){
      
        this.router.navigate(['/competition/add',{id:id}])
    }

    deleteElement(id:number){
        this.competitionService.delete(id).subscribe(response => {
          this.notificationForm( "success", "Supression réussi !");
          this.getList();
         },(error: HttpErrorResponse)=>{
          console.log("Error while deleting data");   
        } ) 
     }

      hideElement(id:number){
        this.competitionService.hide(id).subscribe(response => {
            console.log('hide');
          this.notificationForm( "success", "Statut modifier avec succes !");
          this.getList();
         },(error: HttpErrorResponse)=>{
          console.log("Error while hidden data");   
          this.notificationForm( "danger", "Error de modification du statut !");
        } )
      }


    notificationForm(type: string, msg: string) {
        this.typeNotificationForm = type;
        this.messageNotificationForm = msg;
        this.isNotificationForm = true;
    }
  
      closeNotificationForm() {
          this.isNotificationForm = false;
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
}
