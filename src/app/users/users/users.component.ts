import {Component} from '@angular/core';
import { Users } from 'app/models/users';
import { UsersService } from '../../services/users.service';

@Component({
    selector: 'users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.styl']
})
export class UsersComponent {
    constructor(private usersService:UsersService) {}
    user: Users=[];  
}
