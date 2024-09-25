import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { authGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';
import { ProfileComponent } from './pages/profile/profile.component';
import { PhoneRechargeComponent } from './pages/phone-recharge/phone-recharge.component';
import { BankTransferComponent } from './pages/bank-transfer/bank-transfer.component';
<<<<<<< Updated upstream
=======
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { EmailConfirmationComponent } from './pages/email-confirmation/email-confirmation.component';
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
<<<<<<< Updated upstream
=======
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
  },
  {
    path: 'view',
    canActivate: [authGuard],
    component: ViewMovementComponent,
<<<<<<< Updated upstream
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
  },
  {
    path: 'transfer',
    canActivate: [authGuard],
    component: BankTransferComponent,
  },
<<<<<<< Updated upstream
=======
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
  },
>>>>>>> Stashed changes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
