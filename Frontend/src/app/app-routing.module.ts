import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { authGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';
import { PhoneRechargeComponent } from './components/phone-recharge/phone-recharge.component';
import { ViewMoovementComponent } from './components/view-moovement/view-moovement.component';
import { ProfileComponent } from './components/profile/profile.component';
import { HomeRedirectComponent } from './components/home-redirect/home-redirect.component';

const routes: Routes = [
  { path: '', component: HomeRedirectComponent, pathMatch: 'full' },
  {
    path: 'login',
    canActivate: [LoginGuard],
    component: LoginComponent,
  },
  { path: 'signin', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'register',
    canActivate: [LoginGuard],
    component: RegisterComponent,
  },
  { path: 'signup', redirectTo: 'register', pathMatch: 'full' },
  {
    path: 'app/dashboard',
    canActivate: [authGuard],
    component: DashboardComponent,
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    component: DashboardComponent,
  },
  // Ricarica telefono
  { path: 'app/dashboard/recharge', component: PhoneRechargeComponent },
  { path: 'app/dashboard/view', component: ViewMoovementComponent },
  { path: 'app/dashboard/profile', component: ProfileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
