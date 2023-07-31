import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../users/user-profile/user-profile.component';
import { UsersComponent } from '../../users/users/users.component';
import { AddUserComponent } from '../../users/add-user/add-user.component';
import { ActualiteComponent } from '../../actualites/actualite/actualite.component';
import { AddActualiteComponent } from '../../actualites/add-actualite/add-actualite.component';
import { DetailActualiteComponent } from '../../actualites/detail-actualite/detail-actualite.component';




import { EditorComponent } from '../../components/editor/editor.component';
 

import { RepertoireComponent } from 'app/repertoire/repertoire.component';
import { OldDbComponent } from 'app/oldDB';
import { IndicatorComponent } from 'app/indicator';

import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatRippleModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatRadioModule} from '@angular/material/radio';
import { NgxQuillModule } from '@dimpu/ngx-quill';


import {SsocallbackComponent} from '../../sso-callback/ssocallback.component';

import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { PdfViewerModule } from 'ng2-pdf-viewer';
// import * as pdfjsLib from 'pdfjs-dist/build/pdf';
// import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';

import { BrowserModule } from '@angular/platform-browser';
import {AddActivitePharreComponent} from '../../actualites/add-activite-pharre';
import {ReshaocComponent} from '../../reshaoc';
import {PaysMembreComponent} from '../../pays-membre/pays-membre.component';


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
    MatRadioModule,
    NgxQuillModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    PdfViewerModule,

    //DataTablesModule
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    AddUserComponent,
    ActualiteComponent,
    AddActualiteComponent,
    DetailActualiteComponent,
    EditorComponent,
    UsersComponent,
    RepertoireComponent,
    OldDbComponent,
    IndicatorComponent,
      AddActivitePharreComponent,
      ReshaocComponent,
    PaysMembreComponent



  ]
})

export class AdminLayoutModule {}
