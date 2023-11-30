import {NgModule, OnInit} from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';

import { DashboardComponent } from '../../dashboard/dashboard.component';

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

import {ReshaocComponent} from '../../reshaoc';
import {PaysMembreComponent} from '../../pays-membre/pays-membre.component';
import {EventComponent} from '../../evernementiel/event';
import {AddEventComponent} from '../../evernementiel/add-event';
import {MatSlideToggle, MatSlideToggleModule} from '@angular/material/slide-toggle';
import {PartenariatComponent} from '../../partenariats/partenariat';
import {AddPartenariatComponent} from '../../partenariats/add-partenariat';
import {ParamettreImageComponent} from '../../paramettre-image';
import {ParamettreGeneralComponent} from '../../paramettre-generale';
import {FromationComponent} from '../../formations/fromation';
import {AddFromationComponent} from '../../formations/add-formation';

import {HttpClientModule} from '@angular/common/http';
import {QuillModule} from 'ngx-quill';
import {DocumentComponent} from '../../documentheque/document';
import {AddDocumentComponent} from '../../documentheque/add-document';



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
    MatSlideToggleModule,
    QuillModule.forRoot(),
    HttpClientModule

    //DataTablesModule
  ],
  declarations: [
    DashboardComponent,

    DetailActualiteComponent,
    EditorComponent,
    RepertoireComponent,
    OldDbComponent,
    IndicatorComponent,

    ActualiteComponent,
    AddActualiteComponent,

      ReshaocComponent,
    PaysMembreComponent,

      EventComponent,
    AddEventComponent,

      PartenariatComponent,
      AddPartenariatComponent,

      ParamettreImageComponent,
    ParamettreGeneralComponent,

    FromationComponent,
    AddFromationComponent,
    DocumentComponent,
  AddDocumentComponent







  ]
})

export class AdminLayoutModule {}
