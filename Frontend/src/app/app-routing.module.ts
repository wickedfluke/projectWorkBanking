import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { authGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';
import { ProfileComponent } from './pages/profile/profile.component';
import { PhoneRechargeComponent } from './pages/phone-recharge/phone-recharge.component';
import { BankTransferComponent } from './pages/bank-transfer/bank-transfer.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: 'animation',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: 'login',
    canActivate: [LoginGuard],
    component: LoginComponent,
  },
  {
    path: 'register',
    canActivate: [LoginGuard],
    component: RegisterComponent,
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    component: DashboardComponent,
  },
  {
    path: 'profile',
    canActivate: [authGuard],
    component: ProfileComponent,
  },
  {
    path: 'recharge',
    canActivate: [authGuard],
    component: PhoneRechargeComponent,
<<<<<<< Updated upstream
=======
  },
  {
    path: 'view',
    canActivate: [authGuard],
    component: ViewMovementComponent,
>>>>>>> Stashed changes
  },
  {
    path: 'transfer',
    canActivate: [authGuard],
    component: BankTransferComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
