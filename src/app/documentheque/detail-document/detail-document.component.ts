import {Component} from '@angular/core';
import { Regulation } from 'app/models/regulation';
import { ActualiteService } from '../../services/actualite.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';



@Component({
    selector: 'detail-regulation',
    templateUrl: './detail-document.component.html',
    styleUrls: ['./detail-document.component.styl']
})
export class DetailDocumentComponent {
    constructor(private regulationService:ActualiteService, private activatedRoute: ActivatedRoute) {}
    reg: Regulation;  

    getTrending(id:number): void {
        this.regulationService.getById(id).subscribe((data: Array<Regulation>) => {
          this.reg = data['data'];
        }, (error: HttpErrorResponse) => {
          console.log("Error while retrieving data");
        }
        )
      }
    
    ngOnInit() {
        this.activatedRoute.params.subscribe(params => {
            const id = params['id'];
            if(id){
              this.getTrending(id);
            }
        })
      }
}
