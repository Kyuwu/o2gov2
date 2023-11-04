import { NgModule } from '@angular/core';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { ContractsComponent } from './components/user-profile/contracts/contracts.component';
import { ScootersComponent } from './components/user-profile/scooters/scooters.component';
import { ServicesComponent } from './components/user-profile/services/services.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { redirectUnauthorizedTo, canActivate } from '@angular/fire/auth-guard';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/user-profile/dashboard/dashboard.component';
import { ScooterListComponent } from './components/user-profile/dashboard/scooter-list/scooter-list.component';
import { PlannedServicesComponent } from './components/user-profile/dashboard/planned-services/planned-services.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['']);

const routes: Routes = [
  { path: '', redirectTo: '/log-in', pathMatch: 'full' },
  { path: 'log-in', component: SigninComponent },
  { path: 'sign-up', component: SignupComponent },
  { path: 'user-profile/:id', component: UserProfileComponent, ...canActivate(redirectUnauthorizedToLogin) },
  { path: 'user-profile/:id/scooters', component: ScootersComponent, ...canActivate(redirectUnauthorizedToLogin)  },
  { path: 'user-profile/:id/contracts', component: ContractsComponent, ...canActivate(redirectUnauthorizedToLogin)  },
  { path: 'user-profile/:id/services', component: ServicesComponent, ...canActivate(redirectUnauthorizedToLogin)  },
  { path: 'user-profile/:id/settings', component: EditUserComponent, ...canActivate(redirectUnauthorizedToLogin)  },
  { path: 'dashboard/:id', component: DashboardComponent, ...canActivate(redirectUnauthorizedToLogin)  },
  { path: 'dashboard/:id/scooters', component: ScooterListComponent, ...canActivate(redirectUnauthorizedToLogin)  },
  { path: 'dashboard/:id/services', component: PlannedServicesComponent, ...canActivate(redirectUnauthorizedToLogin)  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
