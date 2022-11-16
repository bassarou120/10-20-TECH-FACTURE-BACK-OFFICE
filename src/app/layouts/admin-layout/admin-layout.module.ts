import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';

import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatRippleModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { QuillModule } from 'ngx-quill';
import { NgxQuillModule } from '@dimpu/ngx-quill';
import {CompetionsComponent} from '../../competions-all/competions';
import {AddInfoComponent} from '../../info-all/add-info';
import {InvestorsComponent} from '../../investors';
import {AddUserComponent} from '../../users/add-user';
import {EditorComponent} from '../../components/editor';
import {DetailCompetionComponent} from '../../competions-all/detail-competion';
import {JobsComponent} from '../../jobs';
import {AddCompetionComponent} from '../../competions-all/add-competion';
import {DetailComplaintComponent} from '../../complaints-all/detail-complaint';
import {DetailInfoComponent} from '../../info-all/detail-info';
import {UsersComponent} from '../../users/users';
import {DashboardComponent} from '../../dashboard/dashboard.component';
import {UserProfileComponent} from '../../users/user-profile/user-profile.component';
import {AddRegulationComponent} from '../../regulations-all/add-regulation';
import {ComplaintsComponent} from '../../complaints-all/complaints/complaints.component';
import {InfosComponent} from '../../info-all/infos';
import {FaqComponent} from '../../faq-all/faq';
import {DetailTrendingComponent} from '../../trending-all/detail-trending';
import {TrendingsComponent} from '../../trending-all/trendings';
import {AddTrendingComponent} from '../../trending-all/add-trending';
import {DetailRegulationComponent} from '../../regulations-all/detail-regulation';
import {RegulationsComponent} from '../../regulations-all/regulations';

//  import { DataTablesModule } from "angular-datatables";


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
    MatDatepickerModule,
    NgxQuillModule
    //DataTablesModule
      //
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    AddUserComponent,
    RegulationsComponent,
    AddRegulationComponent,
    DetailRegulationComponent,
    TrendingsComponent,
    AddTrendingComponent,
    DetailTrendingComponent,
    JobsComponent,
    FaqComponent,
    ComplaintsComponent,
    DetailComplaintComponent,
    InfosComponent,
    InvestorsComponent,
    EditorComponent,
    AddInfoComponent,
    DetailInfoComponent,
    UsersComponent,
    CompetionsComponent,
    AddCompetionComponent,
    DetailCompetionComponent,
  ]
})

export class AdminLayoutModule {}
