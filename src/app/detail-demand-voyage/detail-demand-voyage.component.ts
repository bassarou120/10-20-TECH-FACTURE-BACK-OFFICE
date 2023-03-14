import { Component,Input } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { DemandVoyageService } from 'app/services/demand-voyage.service';
import { Demand } from 'app/models/demand';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
    selector: 'detail-demand-voyage',
    templateUrl: './detail-demand-voyage.component.html',
    styleUrls: ['./detail-demand-voyage.component.styl'],
})
export class DetailDemandVoyageComponent {
    constructor(private demandVoyageService: DemandVoyageService, private activatedRoute: ActivatedRoute,private sanitizer: DomSanitizer) { }

    demand: Demand;
    id: number;
    fileUrl: SafeResourceUrl;
    the_url='';
    data_pieces=[];
    typeNotificationForm: string;
    messageNotificationForm: string;
    isNotificationForm: boolean = false;

    display = "none";
    spinner=true ;
   
    steps = [
        {
          id: 0,
          title: 'Vérification de la complétude des pièces',
          date: '2016 - 2019',
          statut: true,
          fichier: [],
          display: true
        },
        {
            id: 1,
            title: 'Examen du dossier et fixation de la date d\'entretien',
            date: '2016 - 2019',
            statut: false,
            fichier: [],
            display: false
        },
        {
            id: 2,
            title: 'Complément de dossier après avis favorable',
            date: '2016 - 2019',
            statut: false,
            fichier: [],
            display: false
        },
        {
            id: 3,
            title: 'Complément de dossier après avis favorable',
            date: '2016 - 2019',
            statut: false,
            fichier: [],
            display: false
        },
     
      ];
   
    addDecision(id:number){
        
    }

    getDemand(id: number): void {
        this.demandVoyageService.getById(id).subscribe((data: Array<Demand>) => {
            this.demand = data['data'];
            let str = this.demand.pieces ;
            let newStr = str.substring(1, str.length - 1);           
            let d_p =newStr.split(",");
            for(let i =0;i<d_p.length-1;i++){
                var el=d_p[i].split(':');
                var el1 = el[1].slice(1)
                var el2 = el[2].slice(0,-1)
                this.data_pieces.push(
                   {
                    nom_fichier: el[0].substring(1, el[0].length - 1),
                    url:el1+':'+el2
                   }
                 )
            }
            this.spinner = false ;
        }, (error: HttpErrorResponse) => {
            console.log("Error while retrieving data");
        }
        )
    }
    formatDate(date: string) {
        const d = date.split("T");
        if(d.length>1){
            return d[0] + ' ' + d[1].substr(0, 8);
        }
        else{
            return '';
        }
    }
    
    ngOnInit() {
        this.activatedRoute.params.subscribe(params => {
            const id = params['id'];
            if (id) {
                this.getDemand(id);
            }
        })
    }
    previewFile(file: File) {
        const fileUrl = URL.createObjectURL(file);
        this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(fileUrl);
    }
    getSafeUrl(url: string): SafeResourceUrl {
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
    getTheUrl(event: MouseEvent,p:string){
        event.preventDefault(); 
        // const url = (event.target as HTMLAnchorElement).href;
        console.log(p)
        this.the_url= p; 
    }
        
    accept(){
        this.demandVoyageService.accept(this.id).subscribe(response => {
            this.notificationForm( "success", "Statut modifier avec succes !");
        },(error: HttpErrorResponse)=>{
            this.notificationForm( "danger", "Erreur de modification du statut !"+error);
        } )
    }
    denied(){
        this.demandVoyageService.denied(this.id).subscribe(response => {
            this.notificationForm( "success", "Statut modifier avec succes !");
        },(error: HttpErrorResponse)=>{
            this.notificationForm( "danger", "Erreur de modification du statut !"+error);
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

    onCloseHandled() {
        this.display = "none";
    }

    openModal(id_element: number) {
        // var el = this.demand.find(x => x.id == id_element);
        // this.selected_demand = el;
        this.display = "block";
        console.log(id_element)
        switch(id_element) {
            case 0:
              // code block
              break;
            case 1:
              // code block
              break;
            default:
              // code block
          }
    }


 
   
}
