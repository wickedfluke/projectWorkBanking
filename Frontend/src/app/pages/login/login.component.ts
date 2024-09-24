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
        this.router.navigate(['/home']);
      }, 3000); 
    }, 30000); 
  }

  showCustomAlert() {
    const alertElement = getElementById('custom-alert');
    const overlayElement = getElementById('page-overlay');
    alertElement.style.display = 'block';
    overlayElement.style.display = 'block';
  }

  hideCustomAlert() {
    const alertElement = getElementById('custom-alert');
    const overlayElement = getElementById('page-overlay');
    alertElement.style.display = 'none';
    overlayElement.style.display = 'none';
  }


  login(form: NgForm) {
    this.authService.login(this.loginData.username, this.loginData.password).subscribe(
      () => {
        hideContent(getElementById('login-error'));
        this.router.navigate(['/dashboard']);
      },
      (err: any) => {
        const errorElement = getElementById('login-error');
        errorElement.innerText = err.error.message;
        showContent(errorElement);
        console.log(err.message);
      }
    );
  }

  togglePasswordVisibility(id: string) {
    this.isPasswordVisible = !this.isPasswordVisible;
    const passwordField = document.getElementById(id) as HTMLInputElement;
    passwordField.type = this.isPasswordVisible ? 'text' : 'password';
  }

  navigate(path: string) {
    this.router.navigate([path]);
  }
}
