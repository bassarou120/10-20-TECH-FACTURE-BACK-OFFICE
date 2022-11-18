import {Component,OnInit} from '@angular/core';
import { Trending } from 'app/models/trending';
import { TrendingService } from '../../services/trending.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router'; 



@Component({
    selector: 'app-trendings',
    templateUrl: './trendings.component.html',
    styleUrls: ['./trendings.component.styl']
})
export class TrendingsComponent implements OnInit  {
    constructor(private trendingService:TrendingService,private router: Router) {}
    
    trendings: Array<Trending> = [];
   

    getList():void{
        this.trendingService.list().subscribe((data:Array<Trending>)=>{
            this.trendings=data['data'];
        },(error: HttpErrorResponse)=>{
            console.log("Error while retrieving data");   
        } 
        )
    }
  
    edit(id:number){
        this.router.navigate(['/trending/add',{id:id}])
    } 

    ngOnInit() {
      this.getList();
    }
}
