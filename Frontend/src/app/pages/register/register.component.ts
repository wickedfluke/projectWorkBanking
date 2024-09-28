import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { getElementById, showContent } from '../../functions/utils.html';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  constructor(private router: Router, private authService: AuthService) {}
  isPasswordVisible = false;
  showSuccessAlert: boolean = false;
  registerData: any = {
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    checkPassword: '',
  };

  namePattern = /^[a-zA-ZÀ-ÿ'’-]+$/;

  onRegister(form: NgForm) {
    if (form.invalid) return;
    if (!this.namePattern.test(this.registerData.firstName) || !this.namePattern.test(this.registerData.lastName)) {
      const errorElement = getElementById('register-error');
      errorElement.innerText = "Il nome e il cognome possono contenere solo lettere, apostrofo (') e trattino (-).";
      showContent(errorElement);
      return;
    }

    this.registerData.firstName = this.registerData.firstName.trim();
    this.registerData.lastName = this.registerData.lastName.trim();
    this.registerData.username = this.registerData.username.trim().toLowerCase();

    this.authService.register(this.registerData).subscribe(
      (response) => {
        this.showSuccessAlert = true;
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 10000);
      },
      (err) => {
        const errorElement = getElementById('register-error');
        if (err.error.message) {
          let errorMessage = err.error.message;
          errorMessage = errorMessage.replace('username must be an email', "L'username deve essere un'email valida");
          errorMessage = errorMessage.replace('password must be longer than or equal to 8 characters', '');
          errorMessage = errorMessage.replace(/;/g, ';\n');
          errorElement.innerText = errorMessage;
          errorElement.classList.add('has-error');
          showContent(errorElement);
          return;
        }
        errorElement.innerText = err.error;
        showContent(errorElement);
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

  closeAlert() {
    this.showSuccessAlert = false;
    this.router.navigate(['/login']);
  }

  markFormTouched(form: NgForm) {
    if (form) {
      Object.keys(form.controls).forEach((control) => {
        form.controls[control].markAsTouched();
      });
    }
  }
}
