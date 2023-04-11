import {Component, OnInit} from '@angular/core';
import { Users } from 'app/models/users';
import { UsersService } from '../../services/users.service';
import {TrendingService} from '../../services/trending.service';

import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.styl']
})
export class UsersComponent implements  OnInit{
    constructor(private usersService:UsersService,private router: Router) {}
    users: Users=[];
    spinner = true;
    ngOnInit(): void {
       this.getUser();
    }

    getUser(){
        this.usersService.list().subscribe(
            (data:any)=>{

                this.users=data
                this.spinner = false;
                // alert(JSON.stringify(data))
            },
            (error)=>{}
        );

    }


    edit(id:number){

        this.router.navigate(['user-profile/',{id:id}])
    }

}
