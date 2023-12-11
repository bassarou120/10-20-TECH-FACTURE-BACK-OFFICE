import {Component} from '@angular/core';
import { Regulation } from 'app/models/regulation';
import { ClientService } from '../../services/client.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';



@Component({
    selector: 'detail-regulation',
    templateUrl: './detail-actualite.component.html',
    styleUrls: ['./detail-actualite.component.styl']
})
export class DetailActualiteComponent {
    constructor(private regulationService:ClientService, private activatedRoute: ActivatedRoute) {}
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
