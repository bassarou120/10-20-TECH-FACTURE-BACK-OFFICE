import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';

import { RegulationsComponent } from '../../regulations/regulations.component';
import { AddRegulationComponent } from '../../add-regulation/add-regulation.component';
import { DetailRegulationComponent } from '../../detail-regulation/detail-regulation.component';

import { TrendingsComponent } from '../../trendings/trendings.component';
import { AddTrendingComponent } from '../../add-trending/add-trending.component';
import { DetailTrendingComponent } from '../../detail-trending/detail-trending.component';

import { InvestorsComponent } from '../../investors/investors.component';

import { InfosComponent } from '../../infos/infos.component';
import { AddInfoComponent } from '../../add-info/add-info.component';
import { DetailInfoComponent } from '../../detail-info/detail-info.component';

import {ComplaintsComponent } from '../../complaints/complaints.component';
import { JobsComponent } from '../../jobs/jobs.component';
import { FaqComponent } from '../../faq/faq.component';


export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'complaints',     component: ComplaintsComponent },
    { path: 'infos',     component: InfosComponent },
    { path: 'info/add',   component: AddInfoComponent }, 
    { path: 'trendings',          component: TrendingsComponent },
    { path: 'trending/add',   component: AddTrendingComponent },
    { path: 'trendings/:id', component: DetailTrendingComponent },
    { path: 'regulations',component: RegulationsComponent },
    { path: 'regulation/add',   component: AddRegulationComponent },
    { path: 'regulations/:id', component: DetailRegulationComponent },
    { path: 'investors',        component: InvestorsComponent },
    { path: 'jobs',        component: JobsComponent },
    { path: 'faq',        component: FaqComponent }, 
];
