import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { RegulationsComponent } from '../../regulations/regulations.component';
import { TrendingsComponent } from '../../trendings/trendings.component';
import { InvestorsComponent } from '../../investors/investors.component';
import { InfosComponent } from '../../infos/infos.component';
import {ComplaintsComponent } from '../../complaints/complaints.component';
import { JobsComponent } from '../../jobs/jobs.component';
import { FaqComponent } from '../../faq/faq.component';
import { AddRegulationComponent } from '../../add-regulation/add-regulation.component';
import { DetailRegulationComponent } from '../../detail-regulation/detail-regulation.component';

import { AddTrendingComponent } from '../../add-trending/add-trending.component';
import { DetailTrendingComponent } from '../../detail-trending/detail-trending.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'complaints',     component: ComplaintsComponent },
    { path: 'infos',     component: InfosComponent },
    { path: 'trendings',          component: TrendingsComponent },
    { path: 'regulations',component: RegulationsComponent },
    { path: 'regulation/add',   component: AddRegulationComponent },
    { path: 'regulations/:id', component: DetailRegulationComponent },
    { path: 'trending/add',   component: AddTrendingComponent },
    { path: 'trendings/:id', component: DetailTrendingComponent },
    { path: 'investors',        component: InvestorsComponent },
    { path: 'jobs',        component: JobsComponent },
    { path: 'faq',        component: FaqComponent }, 
];
