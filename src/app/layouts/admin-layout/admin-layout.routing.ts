import { Routes } from '@angular/router';



import { ClientComponent } from '../../clients/client';
import { AddClientComponent } from '../../clients/add-client';
import { DetailActualiteComponent } from '../../clients/detail-client';


import { DashboardComponent } from '../../dashboard/dashboard.component';


import { AuthGuard } from '../../utils/AuthGuard';
import {ProduitComponent} from '../../produits/produit';
import {AddProduitComponent} from '../../produits/add-produit';
import {FactureComponent} from '../../factures/facture';
import {AddFactureComponent} from '../../factures/add-facture';





export const AdminLayoutRoutes: Routes = [

    {
        path: 'dashboard', component: DashboardComponent,
        canActivate: [
            AuthGuard
        ]
    },

    { path: 'client', component: ClientComponent },
    { path: 'add-client/:type', component: AddClientComponent },
    { path: 'edit-client/:id', component: AddClientComponent },


    { path: 'produit', component: ProduitComponent },
    { path: 'add-produit/:type', component: AddProduitComponent },
    { path: 'edit-produit/:id', component: AddProduitComponent },



    { path: 'facture', component: FactureComponent },
    { path: 'add-facture/:type', component: AddFactureComponent },
    { path: 'edit-facture/:id', component: AddFactureComponent },






];
