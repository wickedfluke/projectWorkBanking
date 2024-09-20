import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  // Dashboard
  { path: 'app/dashboard', canActivate: [authGuard], component: DashboardComponent },
  // Login
  { path: 'signin', component: LoginComponent },
  { path: 'login', redirectTo: 'signin' },
  // Register
  { path: 'signup', component: RegisterComponent },
  { path: 'register', redirectTo: 'signup' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
