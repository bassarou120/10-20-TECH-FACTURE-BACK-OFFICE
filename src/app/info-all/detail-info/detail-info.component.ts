import {Component} from '@angular/core';
import { InfosService } from '../../services/infos.service';
import { Infos } from 'app/models/infos';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'detail-info',
    templateUrl: './detail-info.component.html',
    styleUrls: ['./detail-info.component.styl']
})
export class DetailInfoComponent {
    constructor(private infosService:InfosService,private activatedRoute: ActivatedRoute) {}
    info: Infos; 
    id:number;


    getInfo(id:number): void {
        this.infosService.getById(id).subscribe((data: Array<Infos>) => {
          this.info = data['data'];
        }, (error: HttpErrorResponse) => {
          console.log("Error while retrieving data");
        }
        )
      }
    
    ngOnInit() {
        this.activatedRoute.params.subscribe(params => {
            const id = params['id'];
            if(id){
              this.getInfo(id);
            }
        })
      }


}
