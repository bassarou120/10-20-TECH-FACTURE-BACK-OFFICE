import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';

import { UsersComponent } from '../../users/users/users.component';
import { UserProfileComponent } from '../../users/user-profile/user-profile.component';
import { AddUserComponent } from '../../users/add-user/add-user.component';

import { RegulationsComponent } from '../../regulations-all/regulations/regulations.component';
import { AddRegulationComponent } from '../../regulations-all/add-regulation/add-regulation.component';
import { DetailRegulationComponent } from '../../regulations-all/detail-regulation/detail-regulation.component';

import { TrendingsComponent } from '../../trending-all/trendings/trendings.component';
import { AddTrendingComponent } from '../../trending-all/add-trending/add-trending.component';
import { DetailTrendingComponent } from '../../trending-all/detail-trending/detail-trending.component';


import { InfosComponent } from '../../info-all/infos/infos.component';
import { AddInfoComponent } from '../../info-all/add-info/add-info.component';
import { DetailInfoComponent } from '../../info-all/detail-info/detail-info.component';

import {ComplaintsComponent } from '../../complaints-all/complaints/complaints.component';
import {DetailComplaintComponent } from '../../complaints-all/detail-complaint/detail-complaint.component';
import { JobsComponent } from '../../jobs/jobs.component';
import { FaqComponent } from '../../faq-all/faq/faq.component';

import { CompetionsComponent } from '../../competions-all/competions/competions.component';
import { AddCompetionComponent } from '../../competions-all/add-competion/add-competion.component';
import { DetailCompetionComponent } from '../../competions-all/detail-competion/detail-competion.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    // users
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'users',   component: UsersComponent },
    { path: 'user/add',   component: AddUserComponent },
   
    //complaints
    { path: 'complaints',     component: ComplaintsComponent },
    { path: 'complaints/:id', component: DetailComplaintComponent },

    { path: 'infos',     component: InfosComponent },
    { path: 'info/add',   component: AddInfoComponent }, 
    { path: 'trendings',          component: TrendingsComponent },
    { path: 'trending/add',   component: AddTrendingComponent },
    { path: 'trendings/:id', component: DetailTrendingComponent },
    { path: 'regulations',component: RegulationsComponent },
    { path: 'regulation/add',   component: AddRegulationComponent },
    { path: 'regulations/:id', component: DetailRegulationComponent },

    { path: 'competions',component: CompetionsComponent },
    { path: 'competion/add',   component: AddCompetionComponent },
    { path: 'competions/:id', component: DetailCompetionComponent },

    { path: 'jobs',        component: JobsComponent },
    { path: 'faq',        component: FaqComponent }, 
];
