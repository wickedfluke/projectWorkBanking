import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { authGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: 'login signin',
    canActivate: [LoginGuard],
    component: LoginComponent
  },
  {
    path: 'register signup',
    canActivate: [LoginGuard],
    component: RegisterComponent
  },
  {
    path: 'app/dashboard',
    canActivate: [authGuard],
    component: DashboardComponent
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    component: DashboardComponent
  },
  { path: 'signin', component: LoginComponent },
  { path: 'login', redirectTo: 'signin' },

  { path: 'signup', component: RegisterComponent },
  { path: 'register', redirectTo: 'signup' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
