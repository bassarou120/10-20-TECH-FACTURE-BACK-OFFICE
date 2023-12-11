import {NgModule, OnInit} from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';

import { DashboardComponent } from '../../dashboard/dashboard.component';

import { ClientComponent } from '../../clients/client/client.component';
import { AddClientComponent } from '../../clients/add-client/add-client.component';
import { DetailActualiteComponent } from '../../clients/detail-client/detail-actualite.component';




 

import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatRippleModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatRadioModule} from '@angular/material/radio';



import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { PdfViewerModule } from 'ng2-pdf-viewer';
// import * as pdfjsLib from 'pdfjs-dist/build/pdf';
// import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';

import { BrowserModule } from '@angular/platform-browser';

import {MatSlideToggle, MatSlideToggleModule} from '@angular/material/slide-toggle';



import {HttpClientModule} from '@angular/common/http';

import {ProduitComponent} from '../../produits/produit';
import {AddProduitComponent} from '../../produits/add-produit';
import {FactureComponent} from '../../factures/facture';
import {AddFactureComponent} from '../../factures/add-facture';



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

    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    PdfViewerModule,
    MatSlideToggleModule,

    HttpClientModule

    //DataTablesModule
  ],
  declarations: [
    DashboardComponent,


    ClientComponent,
    AddClientComponent,

    ProduitComponent,
    AddProduitComponent,

    FactureComponent,
    AddFactureComponent











  ]
})

export class AdminLayoutModule {}
