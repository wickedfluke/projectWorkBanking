import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { authGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';
import { ProfileComponent } from './pages/profile/profile.component';
import { PhoneRechargeComponent } from './pages/phone-recharge/phone-recharge.component';
import { ViewMovementComponent } from './pages/view-movement/view-movement.component';
import { BankTransferComponent } from './pages/bank-transfer/bank-transfer.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { EmailConfirmationComponent } from './pages/email-confirmation/email-confirmation.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'login',
    canActivate: [LoginGuard],
    component: LoginComponent
  },
  {
    path: 'register',
    canActivate: [LoginGuard],
    component: RegisterComponent
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    component: DashboardComponent
  },
  {
    path: 'profile',
    canActivate: [authGuard],
    component: ProfileComponent
  },
  {
    path: 'recharge',
    canActivate: [authGuard],
    component: PhoneRechargeComponent
  },
  {
    path: 'view',
    canActivate: [authGuard],
    component: ViewMovementComponent
  },
  {
    path: 'transfer',
    canActivate: [authGuard],
    component: BankTransferComponent,
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'confirm-email',
    component: EmailConfirmationComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
