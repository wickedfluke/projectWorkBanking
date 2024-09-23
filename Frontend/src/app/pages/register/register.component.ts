import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  constructor(private router: Router, private authService: AuthService) {}
  isPasswordVisible = false;
  registerData: any = {
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    checkPassword: '',
  };

  onRegister(form: NgForm) {
    if (form.invalid) return;
    this.authService.register(this.registerData).subscribe(
      (response) => {
        alert("Registrazione avvenuta con successo, controlla la casella email per confermare l'account");
        this.router.navigate(['/login']);
      },
      (error) => {
        if (error.error === 'Email già in uso') {
          alert('Username already exists');
        }
        console.log(error);
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
