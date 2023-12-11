import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../utils/auth.service';
import {UserService} from '../services/user.service';
import {TokenStorage} from '../utils/token.storage';
import {LoginRequestService} from '../services/login-request.service';
import {HttpErrorResponse} from '@angular/common/http';
// import { NzModalService } from "ng-zorro-antd/modal";
import {UserSystem} from '../models/UserSystem';
// import {NzModalService} from 'ng-zorro-antd/modal';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.styl']
})
export class LoginComponent implements OnInit {
    validateForm: FormGroup;
    typeNotificationForm: string;
    messageNotificationForm: string;
    isNotificationForm: boolean = false;

    user: UserSystem;
    isFirstLogin: boolean = false;

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

        this.validateForm = this.fb.group({
            usernameOrEmail: [null, [Validators.required]],
            password: [null, [Validators.required]],
            remember: [false],
        });


      this.tokenStorage.signOut();

    }



    connexion(): void {

        if (this.validateForm.valid == true) {
            $('#spinner').removeClass('d-none');

            const formData = this.validateForm.value;
            console.log(formData);


            this.authService
                .attemptAuth(formData.usernameOrEmail, formData.password)
                .subscribe(
                    (data) => {
                        console.log(data);

                        if (data.success === false) {
                            console.log("Login ou mot de passe incorrect !");
                              this.notificationForm("danger", "Login ou mot de passe incorrect !");
                        } else {
                            this.tokenStorage.saveToken(data.data.token);
                            console.log(data);
                            console.log("Login OK OK  !");
                            console.log(this.tokenStorage.getToken());

                            this.tokenStorage.saveCurrentUser(JSON.stringify(data.data.user));

                            console.log(this.tokenStorage.getCurrentUser());

                            // this.user = JSON.parse(this.tokenStorage.getCurrentUser());
                            // this.user = JSON.parse(this.tokenStorage.getCurrentUser());

                            // location.href = "/dashboard";
                            this.router.navigate(['/dashboard']);

                            // this.storeCurrentUser();
                        }
                    },
                    (error) => {
                        console.log(error);
                        if(error == 'Bad credentials') {

                            console.log("Login ou mot de passe incorrect !");
                            this.notificationForm("danger", "Login ou mot de passe incorrect !");
                        } else {

                            console.log("Erreur système. Veuillez réessayer ultérieurement !");
                            this.notificationForm(
                                "danger",
                                "Erreur système. Veuillez réessayer ultérieurement !"
                            );

                            $('#spinner').addClass('d-none');
                        }
                    }
                );


        }
    }


    storeCurrentUser() {
        this.authService.retrieveCurrentUser().subscribe(
            (data) => {
                console.log(data);
                if (data === null) {

                    /*
                    this.modalService.info({
                        nzTitle: "Désolé !",
                        nzContent:
                            "<p> Votre compte est bloqué. Veuillez consulter l'administrateur du" +
                            " système en vue de l'activation de votre compte.</p>",
                        nzOkText: null,
                        nzCancelText: "Ok",
                        nzOnCancel: () => console.log(),
                    });

                    */
                } else {
                    if (this.tokenStorage.saveCurrentUser(JSON.stringify(data)) == true) {
                        this.user = JSON.parse(this.tokenStorage.getCurrentUser());
                        console.log(this.user.roles[0].name);
                        // location.href = "/dashboard";
                        this.router.navigate(['/dashboard']);

                        /*
                        if (this.user.roles[0].name == "ROLE_ADMIN") {
                            // location.href = "/dashboard";
                            this.router.navigate(['/dashboard']);
                        }
                        if (this.user.roles[0].name == "ROLE_USER_EXTERNE") {
                            // location.href = "/dashboard";
                            this.router.navigate(['/dashboard']);
                        }else {
                            // location.href = "/dashboard";
                            this.router.navigate(['/dashboard']);
                        }

                        if(this.user.firstLogin == false) {
                            if (this.user.roles[0].name == "ROLE_ADMIN") {
                                // location.href = "dashboard";
                                this.router.navigate(['/dashboard']);
                            }
                            if (this.user.roles[0].name == "ROLE_USER_EXTERNE") {
                                // location.href = "/dashboard";
                                this.router.navigate(['/dashboard']);
                            }

                        } else
                            {

                            /*
                            this.modalService.info({
                                nzTitle: "Bienvenue M/M(e) " + this.user.firstName,
                                nzContent:
                                    "<p> Veuillez réinitialiser votre mot de passe pour la toute première fois " +
                                    " de votre accès à la plateforme Tourisme.</p>",
                                nzOkText: null,
                                nzCancelText: "Ok",
                                nzOnCancel: () => console.log(),
                            });

                            */
                        /*
                            this.notificationForm(
                                "info",
                                " Veuillez réinitialiser votre mot de passe pour la toute première fois " +
                                " de votre accès à la plateforme Tourisme !"
                            );
                            this.isFirstLogin = true;
                        }

                        */

                    }
                }
                //window.l();
            },
            (error: HttpErrorResponse) => {
                // console.log('An error is occured ' + error.message);
            }
        );
    }


//fonctionde notification
    notificationForm(type: string, msg: string) {
        this.typeNotificationForm = type;
        this.messageNotificationForm = msg;
        this.isNotificationForm = true;
    }

    closeNotificationForm() {
        this.isNotificationForm = false;
    }



}
