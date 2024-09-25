import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { getElementById, hideContent, showContent } from '../../functions/utils.html';
import { debounceTime, delay, takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit, OnDestroy {
  constructor(
    private authService: AuthService,
    private router: Router,
    private titleSrv: Title,
    private fb: FormBuilder
  ) {}

  loginForm = this.fb.group({
    username: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  isPasswordVisible = false;
  passwordVisible: boolean = false;
  pageTitle = 'Login home banking';

  private destroyed$ = new Subject<void>();

  ngOnInit(): void {
    this.titleSrv.setTitle(this.pageTitle);
    this.initFormReset();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  private initFormReset() {
    this.loginForm.valueChanges
      .pipe(
        debounceTime(30000),
        takeUntil(this.destroyed$),
        tap((_) => this.showCustomAlert()),
        delay(2000),
        tap((_) => this.hideCustomAlert())
      )
      .subscribe((_) => {
        this.loginForm.reset({ username: '', password: '' }, { emitEvent: false });
      });
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

  login() {
    if (this.loginForm.invalid) return;
    const { username, password } = this.loginForm.value;
    this.authService.login(username!, password!).subscribe(
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
          
          console.log('Error element:', errorElement);
          console.log('Error message:', err.error.message);

          
          if (err.error && err.error.message) {
            errorElement.innerText = err.error.message;
          } else {
            errorElement.innerText = 'Errore sconosciuto. Riprova.';
          }
          
          if (err.error.message === 'username must be an email') {
            errorElement.innerText = 'L\'username deve essere un indirizzo email.';
          }

          
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
