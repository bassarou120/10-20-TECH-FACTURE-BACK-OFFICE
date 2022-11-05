import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';

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
import {ComplaintsComponent } from '../../complaints/complaints.component';
import { JobsComponent } from '../../jobs/jobs.component';
import { FaqComponent } from '../../faq/faq.component';
import { EditorComponent } from '../../components/editor/editor.component';
 
import { AddInfoComponent } from '../../add-info/add-info.component';
import { DetailInfoComponent } from '../../detail-info/detail-info.component';


import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatRippleModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatCheckboxModule,
    
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    RegulationsComponent,
    AddRegulationComponent,
    DetailRegulationComponent,
    TrendingsComponent,
    AddTrendingComponent,
    DetailTrendingComponent,
    JobsComponent,
    FaqComponent,
    ComplaintsComponent,
    InfosComponent,
    InvestorsComponent,
    EditorComponent,
    AddInfoComponent,
    DetailInfoComponent
  ]
})

export class AdminLayoutModule {}
