import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AddUserComponent} from './add-user.component';
import { UsersService } from '../../services/users.service';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        //AddUserComponent
    ],
    exports: [ 
        //AddUserComponent
    ],
    providers: [UsersService],
})
export class AddUserModule {}
