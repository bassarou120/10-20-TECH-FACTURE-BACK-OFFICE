import { Component, OnInit } from '@angular/core';
import { Users } from 'app/models/users';
import { UsersService } from '../../services/users.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TrendingService} from '../../services/trending.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(private usersService:UsersService,private router: Router,private activatedRoute: ActivatedRoute) {}
  user: any;
  id:number;
  typeNotificationForm: string;
  messageNotificationForm: string;
  isNotificationForm: boolean = false;
  spinner = true;



  userForm = new FormGroup({
    username: new FormControl('', Validators.required),
    firstName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    role: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required)
  });


  ngOnInit() {

    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      if(id){

        this. id=id;

        // alert(id)
      this.getUserById(id);
      }
    })


  }


  getUserById(id){
    this.usersService.getById(id).subscribe(
        (data:any)=>{

          this.user=data

          this.userForm.patchValue({
            username: this.user.username  ,
            firstName: this.user.firstName ,
            email:this.user.email,
            role: this.user.roles[0].name ,
            status: this.user.status,

          });
          this.spinner = false;
        // alert(JSON.stringify(data))
          console.log(data)
        },
        (error)=>{

        }

    );

  }


  onClickSubmit(): void {
    if(!this.userForm.invalid){
      $('#sbt_btn').addClass('disabled');
      $('#spinner').removeClass('d-none')

      const formData =  this.userForm.value ;

      this.spinner = true;

      // console.log(formData);

      const data = new FormData();

      data.append('status', formData.status);
      data.append('username', formData.username);
      data.append('firstName', formData.firstName);
      data.append('role', formData.role);

      // data.append('job', formData.job.id);

     // console.log(data)
     // console.log(formData)

      const userData:object={
        "email": formData.email,
          "name": formData.firstName,
          "role": formData.role,
          "status": formData.status,
          "username": formData.username
      }

      // const userData:object={
      //   'status': formData.status,
      // 'username': formData.username,
      // 'firstName': formData.firstName,
      //  'role': formData.role
      // }

       console.log(userData)

      this.usersService.updateBackofficeUser(userData, this.id).subscribe(response => {
            this.notificationForm(
                "success",
                "Modification réussi !"
            );

        this.spinner = false;

          }, (error: HttpErrorResponse) => {
            console.log("Error while retrieving data");
            this.notificationForm(
                "danger",
                "Erreur de la motification !"
            );
          })

      $('#sbt_btn').removeClass('disabled');
      $('#spinner').addClass('d-none')

      $('html,body').animate({
        scrollTop: $("#top").offset().top
      }, 'slow');



    }
  }


  notificationForm(type: string, msg: string) {
    this.typeNotificationForm = type;
    this.messageNotificationForm = msg;
    this.isNotificationForm = true;
  }

  closeNotificationForm() {
    this.isNotificationForm = false;
  }

}
