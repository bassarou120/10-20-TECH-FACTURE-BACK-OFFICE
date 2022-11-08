import { Routes } from '@angular/router';

import { LoginComponent } from '../../login/login.component';
import { ForgetPasswordComponent } from '../../forget-password/forget-password.component';
import { ResetPasswordComponent } from '../../reset-password/reset-password.component';

export const AuthLayoutRoutes: Routes = [
    { path: 'login',      component: LoginComponent },
    { path: 'forgetpassword',      component: ForgetPasswordComponent },
    { path: 'resetpassword',      component: ResetPasswordComponent },
];
