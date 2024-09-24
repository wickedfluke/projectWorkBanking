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
  passwordVisible: boolean = false;
  pageTitle = 'Login home banking';

  ngOnInit(): void {
    this.titleSrv.setTitle(this.pageTitle);
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

  navigate(path: string) {
    this.router.navigate([path]);
  }
}
