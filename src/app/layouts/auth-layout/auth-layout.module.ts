import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthLayoutRoutes } from './auth-layout.routing';

// import {AuthLayoutComponent} from './auth-layout.component';
import { LoginComponent } from '../../login/login.component';
import { ForgetPasswordComponent } from '../../forget-password/forget-password.component';
import { ResetPasswordComponent } from '../../reset-password/reset-password.component';

@NgModule({
    imports: [
        CommonModule, 
        RouterModule.forChild(AuthLayoutRoutes),
    ],
    declarations: [
        // LoginComponent,
        ResetPasswordComponent,
        ForgetPasswordComponent,

    ]
})
export class AuthLayoutModule {}
