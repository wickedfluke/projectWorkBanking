// Angular imports
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MatIconModule } from '@angular/material/icon';
import { EyesIconComponent } from './components/eyes-icon/eyes-icon.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { AuthInterceptor } from './utils/auth.interceptor';
import { IfAuthenticatedDirective } from './directives/if-authenticated.directive';
import { MovementTableComponent } from './components/movement-table/movement-table.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { PhoneRechargeComponent } from './pages/phone-recharge/phone-recharge.component';
import { ViewMovementComponent } from './pages/view-movement/view-movement.component';
import { LoadingComponent } from './components/loading/loading.component';
import { BankTransferComponent } from './pages/bank-transfer/bank-transfer.component';
import { SuccessPopupComponent } from './components/success-popup/success-popup.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    EyesIconComponent,
    NavBarComponent,
    IfAuthenticatedDirective,
    MovementTableComponent,
    ProfileComponent,
    PhoneRechargeComponent,
    ViewMovementComponent,
    LoadingComponent,
    BankTransferComponent,
    SuccessPopupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatIconModule,
    NgbModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
