import { Routes } from '@angular/router';
import {TrendingsComponent} from '../../trending-all/trendings';
import {FaqComponent} from '../../faq-all/faq';
import {AddInfoComponent} from '../../info-all/add-info';
import {InfosComponent} from '../../info-all/infos';
import {UserProfileComponent} from '../../users/user-profile/user-profile.component';
import {DetailTrendingComponent} from '../../trending-all/detail-trending';
import {RegulationsComponent} from '../../regulations-all/regulations';
import {AddRegulationComponent} from '../../regulations-all/add-regulation';
import {DetailRegulationComponent} from '../../regulations-all/detail-regulation';
import {AddUserComponent} from '../../users/add-user';
import {JobsComponent} from '../../jobs';
import {DetailCompetitionComponent} from '../../competitions-all/detail-competition';
import {DetailComplaintComponent} from '../../complaints-all/detail-complaint';
import {AddTrendingComponent} from '../../trending-all/add-trending';
import {UsersComponent} from '../../users/users';
import {DetailInfoComponent} from '../../info-all/detail-info';
import {AddCompetitionComponent} from '../../competitions-all/add-competition';
import {DashboardComponent} from '../../dashboard/dashboard.component';
import {ComplaintsComponent} from '../../complaints-all/complaints/complaints.component';
import {CompetitionsComponent} from '../../competitions-all/competions';
import {AuthGuard} from '../../utils/AuthGuard';
import {ReclamationsComponent} from '../../reclamations-all/reclamations';
import {DetailReclamationComponent} from '../../reclamations-all/detail-reclamation';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent,
    canActivate:   [ AuthGuard]
    },
    // users
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'users',   component: UsersComponent },
    { path: 'user/add',   component: AddUserComponent },
   
    //complaints
    { path: 'complaints',     component: ComplaintsComponent,
        canActivate:   [ AuthGuard]
    },
    { path: 'complaints/:id', component: DetailComplaintComponent },

    { path: 'infos',     component: InfosComponent,
        canActivate:   [ AuthGuard]
    },
    { path: 'info/add',   component: AddInfoComponent }, 
    { path: 'infos/:id',   component: DetailInfoComponent }, 
    { path: 'trendings',          component: TrendingsComponent },
    { path: 'trending/add',   component: AddTrendingComponent },
    { path: 'trendings/:id', component: DetailTrendingComponent },
    { path: 'regulations',component: RegulationsComponent },
    { path: 'regulation/add',   component: AddRegulationComponent },
    
    { path: 'regulations/:id', component: DetailRegulationComponent },

    { path: 'competitions',component: CompetitionsComponent ,
        canActivate:   [ AuthGuard]
    },

    { path: 'reclamations',     component: ReclamationsComponent },
    { path: 'reclamations/:id', component: DetailReclamationComponent },

    { path: 'competition/add',   component: AddCompetitionComponent },
    { path: 'competitions/:id', component: DetailCompetitionComponent },

    { path: 'jobs',        component: JobsComponent },
    { path: 'faq',        component: FaqComponent }, 
];
