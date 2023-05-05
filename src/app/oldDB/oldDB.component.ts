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
    selector: 'oldDB',
    templateUrl: './oldDB.component.html',
    styleUrls: ['./oldDB.component.styl']
})
export class OldDbComponent {
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
    show_filter = false;
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
    
    getJobList(): void {

        this.jobService.list().subscribe((data: Array<Job>) => {
            this.jobs = data['data'];
        }, (error: HttpErrorResponse) => {
            console.log("Error while retrieving data");
        }
        )
    }

    getList(): void {
        this.opService.list_ol_db(this.id).subscribe((data: Array<OperateurTouristique>) => {
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
        this.getJobList();
        this.getList();
        this.getDepartment();
        this.searchForm = new FormGroup({
            job: new FormControl(''),
            rccm: new FormControl('', [Validators.maxLength(20)]),
            raison_sociale: new FormControl(''),
            ifu: new FormControl('', [Validators.pattern("^[0-9]*$"), Validators.maxLength(13), Validators.minLength(13)]),
            site_web: new FormControl('', [Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]),
            telephone: new FormControl('', [Validators.pattern("^[0-9]*$")]),
            npi_promoteur: new FormControl('', [Validators.pattern("^[0-9]*$"), Validators.maxLength(10), Validators.minLength(10)]),
            omt: new FormControl('', [Validators.pattern("^[0-9]*$"), Validators.maxLength(13), Validators.minLength(13)]),
            adresse: new FormControl(''),
            nom_promoteur: new FormControl(''),
            prenom_promoteur: new FormControl(''),
            nom_directeur: new FormControl(''),
            prenom_directeur: new FormControl(''),
            nationalite_promoteur:new FormControl(''),
            commune:new FormControl(''), 
            departement:new FormControl(''),
            type_etablissement:new FormControl(''),
            capacite_hebergement:new FormControl(''),
            nbre_etoile:new FormControl(''),
            type_guide:new FormControl(''),
            categorie_guide:new FormControl('')
        });
    }

    search(){
   
        if(this.searchForm.valid){
            this.show_filter= false ;
            var data = this.searchForm.value;
            var seach_var = [];
            
            data['job'] ?  seach_var['id_job'] = data['id_job'] : '' ;
            data['departement'] ?  seach_var['departement'] = data['departement'].split(',')[0] : '' ;
            data['commune'] ?  seach_var['commune'] = data['commune'] : '' ;
            data['raison_sociale'] ?  seach_var['raison_sociale'] = data['raison_sociale'].toUpperCase() : '' ;
            data['rccm'] ?  seach_var['rccm'] = data['rccm'] : '' ;
            data['ifu'] ?  seach_var['ifu'] = data['ifu'] : '' ;
            data['site_web'] ?  seach_var['site_web'] = data['site_web'] : '' ;
            data['omt'] ?  seach_var['omt'] =data['omt'] : '' ;
            data['adresse'] ?  seach_var['adresse'] = data['adresse'] : '' ;
            data['nom_promoteur'] ?  seach_var['nom_promoteur'] = data['nom_promoteur'] : '' ;
            data['prenom_promoteur'] ?  seach_var['prenom_promoteur'] = data['prenom_promoteur'] : '' ;
            data['nationalite_promoteur'] ?  seach_var['nationalite_promoteur'] = data['nationalite_promoteur'] : '' ;
            data['nom_directeur'] ?  seach_var['nom_directeur'] = data['nom_directeur'] : '' ;
            data['prenom_directeur'] ?  seach_var['prenom_directeur'] = data['prenom_directeur'] : '' ; 
            data['type_etablissement'] ?  seach_var['type_etablissement'] = data['type_etablissement'] : '' ;
            data['nbre_etoile'] ?  seach_var['nombre_etoile'] = data['nbre_etoile'] : '' ;
            data['capacite_hebergement'] ?  seach_var['capacite_hebergement'] = data['capacite_hebergement'] : '' ;
            data['type_guide'] ?  seach_var['type_guide'] = data['type_guide'] : '' ;
            data['categorie_guide'] ?  seach_var['categorie_guide'] = data['categorie_guide'] : '' ;
            seach_var['status']="ancien";
            
            this.spinner = true ;
            this.opService.multi_critere_search(seach_var).subscribe((data:Array<OperateurTouristique>)=>{
                this.operateurs = data;
                this.dataSource = new MatTableDataSource(data);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
                this.setPaginationLabelToFrench();
                this.spinner = false;
            },(error: HttpErrorResponse)=>{console.log(error) } 
            )
        }
    }
    onOptionsSelected(value: string) {
        this.commune_spinner = true;
        if(value !='Aucun'){
            var id = value.split(',')[1];
            this.departement_search = value.split(',')[0]
            this.opService.get_commune(id).subscribe((data: any) => {
                this.communes = data;
                this.commune_spinner = false;
            }, (error: HttpErrorResponse) => {
                console.log("Error while retrieving data");
            }
            )
        }
        else{
            this.communes=new Array();
            this.commune_spinner = false;
        }
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
    
    get job(): any {
        return this.searchForm.get('job');
    }
    get raison_sociale(): any {
        return this.searchForm.get('raison_sociale');
    }
    get type_hebergement(): any {
        return this.searchForm.get('type_hebergement');
    }
    get nbre_etoile(): any {
        return this.searchForm.get('nbre_etoile');
    }
    get capacite_hebergement(): any {
        return this.searchForm.get('capacite_hebergement');
    }
    get rccm(): any {
        return this.searchForm.get('rccm');
    }
    get ifu(): any {
        return this.searchForm.get('ifu');
    }
    get omt(): any {
        return this.searchForm.get('omt');
    }
    
    get site_web(): any {
        return this.searchForm.get('site_web');
    }
    get telephone(): any {
        return this.searchForm.get('telephone');
    }
    get departement(): any {
        return this.searchForm.get('departement');
    }
    get commune(): any {
        return this.searchForm.get('commune');
    }
    get adresse(): any {
        return this.searchForm.get('adresse');
    }
    
    get nom_promoteur(): any {
        return this.searchForm.get('nom_promoteur');
    }
    get prenom_promoteur(): any {
        return this.searchForm.get('prenom_promoteur');
    }
    
    get nationalite_promoteur(): any {
        return this.searchForm.get('nationalite_promoteur');
    }
    get npi_promoteur(): any {
        return this.searchForm.get('npi_promoteur');
    }
    get nom_directeur(): any {
        return this.searchForm.get('nom_directeur');
    }
    get prenom_directeur(): any {
        return this.searchForm.get('prenom_promoteur');
    }
    get type_guide(): any {
        return this.searchForm.get('type_guide');
    }
    get categorie_guide(): any {
        return this.searchForm.get('categorie_guide');
    }

}
