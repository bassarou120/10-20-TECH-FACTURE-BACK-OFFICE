import {Component, OnInit} from '@angular/core';
import { Users } from 'app/models/users';
import { UsersService } from '../../services/users.service';

@Component({
    selector: 'users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.styl']
})
export class UsersComponent implements  OnInit{
    constructor(private usersService:UsersService) {}
    users: Users=[];

    ngOnInit(): void {
       this.getUser();
    }

    getUser(){
        this.usersService.list().subscribe(
            (data:any)=>{

                this.users=data
                // alert(JSON.stringify(data))
            },
            (error)=>{}
        );

    }

}
