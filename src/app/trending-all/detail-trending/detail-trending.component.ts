import {Component} from '@angular/core';
import { Trending } from 'app/models/trending';
import { TrendingService } from '../../services/trending.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';


@Component({
    selector: 'detail-trending',
    templateUrl: './detail-trending.component.html',
    styleUrls: ['./detail-trending.component.styl']
})
export class DetailTrendingComponent {
    constructor(private trendingService:TrendingService,private activatedRoute: ActivatedRoute) {}
    trending: Trending;  
     id:number;


    getTrending(id:number): void {
        this.trendingService.getById(id).subscribe((data: Array<Trending>) => {
          this.trending = data['data'];
          console.log(this.trending );
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
