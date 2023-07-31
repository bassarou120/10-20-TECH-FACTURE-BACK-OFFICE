import { Routes } from '@angular/router';

import { UserProfileComponent } from '../../users/user-profile/user-profile.component';

import { ActualiteComponent } from '../../actualites/actualite';
import { AddActualiteComponent } from '../../actualites/add-actualite';
import { DetailActualiteComponent } from '../../actualites/detail-actualite';
import { AddUserComponent } from '../../users/add-user';


import { UsersComponent } from '../../users/users';

import { DashboardComponent } from '../../dashboard/dashboard.component';


import { AuthGuard } from '../../utils/AuthGuard';


import { RepertoireComponent } from 'app/repertoire/repertoire.component';
import { OldDbComponent } from 'app/oldDB';
import { IndicatorComponent } from 'app/indicator';

import { SsocallbackComponent } from '../../sso-callback/ssocallback.component';
import {RedirectGuard} from '../../RedirectGuard/RedirectGuard';
import {AddActivitePharreComponent} from '../../actualites/add-activite-pharre';
import {ReshaocComponent} from '../../reshaoc';
import {PaysMembreComponent} from '../../pays-membre';

export const AdminLayoutRoutes: Routes = [

    {
        path: 'dashboard', component: DashboardComponent,
        canActivate: [
            AuthGuard
        ]
    },

    { path: 'actualite', component: ActualiteComponent },
    { path: 'add-actualite/:type', component: AddActualiteComponent },
    { path: 'edit-actualite/:id', component: AddActualiteComponent },
    { path: 'reshaoc', component: ReshaocComponent },
    { path: 'pays-membre', component: PaysMembreComponent },





    // users
    { path: 'user-profile/:id', component: UserProfileComponent },
    { path: 'users', component: UsersComponent },
    { path: 'user/add', component: AddUserComponent },
    { path: 'actualite/:id', component: DetailActualiteComponent },

    {
        path: 'operateurs', component: RepertoireComponent,
        canActivate: [
            // AuthGuard
        ]
    },
    {
        path: 'old_db', component: OldDbComponent,
        canActivate: [
            AuthGuard
            //AuthGuard
        ]
    },
    {
        path: 'indicator', component: IndicatorComponent,
        canActivate: [
            //AuthGuard
        ]
    },
    {
        path: 'evaluation',
        canActivate: [RedirectGuard],
        component: RedirectGuard,
        data: {
            externalUrl: 'https://tourisme-app.star-labs.bj/evaluation/hotel/100'
        }
    }
];
