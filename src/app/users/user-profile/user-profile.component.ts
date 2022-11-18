import { Component, OnInit } from '@angular/core';
import { Users } from 'app/models/users';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(private usersService:UsersService) {}
  user: Users=[];  

  ngOnInit() {
  }

}
