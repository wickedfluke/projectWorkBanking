import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';
import { getElementById, hydeContent, showContent } from '../../functions/utils.html';

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
        hydeContent(getElementById('login-error'));
        this.router.navigate(['/app/dashboard']);
      },
      (err: any) => {
        showContent(getElementById('login-error'));
      }
    );
  }

  navigate(path: string) {
    this.router.navigate([path]);
  }
}
