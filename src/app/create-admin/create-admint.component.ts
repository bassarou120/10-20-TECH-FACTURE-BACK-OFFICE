import {Component, OnInit} from '@angular/core';
import {UserSystem} from '../models/UserSystem';
import {Role} from '../models/Role';
import {User} from '../models/User';
import {FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../utils/auth.service';
import {UserService} from '../services/user.service';
import {TokenStorage} from '../utils/token.storage';
import {LoginRequestService} from '../services/login-request.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
    selector: 'create-admin',
    templateUrl: './create-admin.component.html',
    styleUrls: ['./create-admin.component.styl']
})
export class CreateAdminComponent   implements OnInit{


    newUser: UserSystem
    constructor(
        private fb: FormBuilder,
        private router: Router,
        private authService: AuthService,
        private userService: UserService,
        private tokenStorage: TokenStorage,
        private loginRequestService: LoginRequestService,
        // private modalService: NzModalService,

    ) {
        // this.loginRequestService.header.next(this.h);
    }




    ngOnInit(): void {
        this.newUser= new  UserSystem("admin@admin.com","admin","admin",[new Role(1,"ROLE_ADMIN","ROLE_ADMIN")],"admin","admin",true);


        this.userService.list( ).subscribe(
            (data: User) => {
                console.log("skhdksjd")
                console.log(data)

                // location.href = "/dashboard";
            },
            (error: HttpErrorResponse) => {

                console.log(error.message)
                // location.href = "/dashboard";
                // this.createMessage('error', 'Echec de l\'enregistrement de l\'utilisateur !');
            });

    }
    
}
