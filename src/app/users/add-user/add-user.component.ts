import {Component} from '@angular/core';
import { Users } from 'app/models/users';
import { UsersService } from '../../services/users.service';

@Component({
    selector: 'add-user',
    templateUrl: './add-user.component.html',
    styleUrls: ['./add-user.component.styl']
})
export class AddUserComponent {


    constructor(private usersService:UsersService) {}
    user: Users=[];  
  
}
