import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { FormBuilder, Validators } from '@angular/forms';
import { debounceTime, delay, takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'], // Corretto: 'styleUrl' => 'styleUrls'
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm = this.fb.group({
    username: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  isPasswordVisible = false;
  pageTitle = 'Login home banking';
  errorMessage: string | null = null;

  private destroyed$ = new Subject<void>();

  constructor(
    private authService: AuthService,
    private router: Router,
    private titleSrv: Title,
    private fb: FormBuilder
  ) {}

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
        tap(() => this.showCustomAlert()),
        delay(2000),
        tap(() => this.hideCustomAlert())
      )
      .subscribe(() => {
        this.loginForm.reset({ username: '', password: '' }, { emitEvent: false });
      });
  }

  showCustomAlert() {
    this.errorMessage = 'Tempo scaduto per il login';
  }

  hideCustomAlert() {
    this.errorMessage = null;
  }

  login() {
    if (this.loginForm.invalid) return;
    let { username, password } = this.loginForm.value;
    username = username!.trim().toLowerCase();
    this.authService.login(username!, password!).subscribe(
      () => {
        this.errorMessage = null;
        this.router.navigate(['/dashboard']);
      },
      (err: any) => {
        if (err.error.message === 'username must be an email')
          this.errorMessage = "L'username deve essere un indirizzo email.";
        else this.errorMessage = 'Credenziali non valide. Riprova.';
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
