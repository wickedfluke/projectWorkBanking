import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';
import { getElementById, hideContent, showContent } from '../../functions/utils.html';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router, private titleSrv: Title) {}
  loginData: any = {
    username: '',
    password: '',
  };
  isPasswordVisible = false;
  passwordVisible: boolean = false;
  pageTitle = 'Login home banking';

  ngOnInit(): void {
    this.titleSrv.setTitle(this.pageTitle);
    this.startLoginTimeout();
  }

  startLoginTimeout() {
    setTimeout(() => {
      this.showCustomAlert();

      setTimeout(() => {
        window.location.reload();
      }, 3000); 
    }, 30000); 
  }

  showCustomAlert() {
    const alertElement = getElementById('custom-alert');
    const overlayElement = getElementById('page-overlay');
    if (alertElement && overlayElement) {
      alertElement.style.display = 'block';
      overlayElement.style.display = 'block';
    }
  }

  hideCustomAlert() {
    const alertElement = getElementById('custom-alert');
    const overlayElement = getElementById('page-overlay');
    if (alertElement && overlayElement) {
      alertElement.style.display = 'none';
      overlayElement.style.display = 'none';
    }
  }

  login(form: NgForm) {
    this.authService.login(this.loginData.username, this.loginData.password).subscribe(
      () => {
        const errorElement = getElementById('login-error');
        if (errorElement) {
          hideContent(errorElement);
        }
        this.router.navigate(['/dashboard']);
      },
      (err: any) => {
        const errorElement = getElementById('login-error');
        if (errorElement) {
          // Debugging
          console.log('Error element:', errorElement);
          console.log('Error message:', err.error.message);

          // Gestione del messaggio d'errore
          if (err.error && err.error.message) {
            errorElement.innerText = err.error.message;
          } else {
            errorElement.innerText = 'Errore sconosciuto. Riprova.';
          }
          // Se l'errore riguarda l'email non valida
          if (err.error.message === 'username must be an email') {
            errorElement.innerText = 'L\'username deve essere un indirizzo email.';
          }

          // Visualizza l'errore
          showContent(errorElement);
        }
      }
    );
  }

  togglePasswordVisibility(id: string) {
    this.isPasswordVisible = !this.isPasswordVisible;
    const passwordField = document.getElementById(id) as HTMLInputElement;
    if (passwordField) {
      passwordField.type = this.isPasswordVisible ? 'text' : 'password';
    }
  }

  navigate(path: string) {
    this.router.navigate([path]);
  }
}
