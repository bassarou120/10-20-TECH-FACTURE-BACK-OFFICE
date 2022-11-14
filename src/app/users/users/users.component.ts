import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../utils/auth.service';
import {UserService} from '../../services/user.service';
import {TokenStorage} from '../../utils/token.storage';
import {LoginRequestService} from '../../services/login-request.service';
import {User} from '../../models/User';

@Component({
    selector: 'users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.styl']
})
export class UsersComponent implements  OnInit{



    listUser: any;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private authService: AuthService,
        private userService: UserService,
        private tokenStorage: TokenStorage,
        private loginRequestService: LoginRequestService,


    ){

    }



    getAllUser(){

        this.userService.list().subscribe(

            (data) =>{
                this.listUser=data
                console.log(this.listUser);
            },
            (error) =>{
                console.log(error);

            }
        );


    }

    ngOnInit(): void {
        this.getAllUser();
    }
    
}
