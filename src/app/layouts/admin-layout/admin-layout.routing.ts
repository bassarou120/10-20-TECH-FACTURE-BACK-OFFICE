import { Routes } from '@angular/router';



import { ActualiteComponent } from '../../actualites/actualite';
import { AddActualiteComponent } from '../../actualites/add-actualite';
import { DetailActualiteComponent } from '../../actualites/detail-actualite';


import { DashboardComponent } from '../../dashboard/dashboard.component';


import { AuthGuard } from '../../utils/AuthGuard';


import { RepertoireComponent } from 'app/repertoire/repertoire.component';
import { OldDbComponent } from 'app/oldDB';
import { IndicatorComponent } from 'app/indicator';

import { SsocallbackComponent } from '../../sso-callback/ssocallback.component';
import {RedirectGuard} from '../../RedirectGuard/RedirectGuard';

import {ReshaocComponent} from '../../reshaoc';
import {PaysMembreComponent} from '../../pays-membre';
import {EventComponent} from '../../evernementiel/event';
import {AddEventComponent} from '../../evernementiel/add-event';
import {PartenariatComponent} from '../../partenariats/partenariat';
import {AddPartenariatComponent} from '../../partenariats/add-partenariat';
import {ParamettreImageComponent} from '../../paramettre-image';
import {ParamettreGeneralComponent} from '../../paramettre-generale';
import {AddFromationComponent} from '../../formations/add-formation';
import {FromationComponent} from '../../formations/fromation';
import {DocumentComponent} from '../../documentheque/document';
import {AddDocumentComponent} from '../../documentheque/add-document';

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

  { path: 'partenariat', component: PartenariatComponent },
    { path: 'add-partenariat/:type', component: AddPartenariatComponent },
    { path: 'edit-partenariat/:id', component: AddPartenariatComponent },

    { path: 'event', component: EventComponent},
    { path: 'add-event/:type', component: AddEventComponent },
    { path: 'edit-event/:id', component: AddEventComponent },

    { path: 'reshaoc', component: ReshaocComponent },
    { path: 'paramettre-image', component: ParamettreImageComponent },
    { path: 'pays-membre', component: PaysMembreComponent },
    { path: 'paramettre-generale', component: ParamettreGeneralComponent},


    { path: 'formation', component: FromationComponent },
    { path: 'add-formation/:type', component: AddFromationComponent },
    { path: 'edit-formation/:id', component: AddFromationComponent },

    { path: 'document', component:  DocumentComponent },
    { path: 'add-document/:type', component: AddDocumentComponent },
    // { path: 'edit-formation/:id', component: AddFromationComponent },





    // users

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
