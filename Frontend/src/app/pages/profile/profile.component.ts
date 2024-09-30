import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { AuthService } from '../../services/auth.service';
import { User } from '../../entities/user.entity';
import { UserService } from '../../services/user.service';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private titleSrv: Title
  ) {
    Chart.register(...registerables);
  }
  currentUser: any;
  users: User[] = [];
  balance: number = 0;
  email: string = '';
  passwordForm: FormGroup | undefined;
  modalReference: NgbModalRef | undefined;
  showAlert: boolean = false;
  showSuccess: boolean = false;
  touchAlert: boolean = false;
  isPasswordVisible = false;
  eightAlert: boolean = false;
  passwordAlert: boolean = false;

  ngOnInit() {
    this.titleSrv.setTitle('Profilo');
    this.authService.currentUser$.subscribe((user) => (this.currentUser = user));
    this.passwordForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
    });
    this.authService.fetchUsername().subscribe((email) => {
      this.email = email;
    });
  }

  openChangePasswordModal(content: any) {
    this.modalReference = this.modalService.open(content);
    this.modalReference.result.finally(() => {
      this.passwordForm!.reset();
      this.showAlert = false;
      this.showSuccess = false;
      this.touchAlert = false;
    });
  }

  closeModal() {
    if (this.modalReference) {
      this.modalReference.close();
    }
    this.passwordForm!.reset();
  }

  submitChangePassword() {
    if(this.passwordForm!.value.newPassword.length < 8) {
      this.eightAlert = true;
      setTimeout(() => {
        this.eightAlert = false;
      }, 10000);
      return;
    }

    const password = this.passwordForm!.value.newPassword;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (!hasUpperCase || !hasLowerCase || !hasNumber || !hasSpecialChar) {
      this.passwordAlert = true;
      setTimeout(() => {
      this.passwordAlert = false;
      }, 10000);
      return;
    }
    if (this.passwordForm!.invalid) {
      this.touchAlert = true;
      setTimeout(() => {
        this.touchAlert = false;
      }, 10000);
      return;
    }

    const newPassword = this.passwordForm!.value.newPassword;
    const confirmPassword = this.passwordForm!.value.confirmPassword;

    if (newPassword !== confirmPassword) {
      this.showAlert = true;
      setTimeout(() => {
        this.showAlert = false;
      }, 10000);
      return;
    }
    this.userService.changePassword(newPassword).subscribe(
      () => {
        this.showSuccess = true;
        setTimeout(() => {
          this.showSuccess = false;
          this.closeModal();
          this.authService.logout();
        }, 5000);
      },
      (error) => {
        alert('Errore: ' + error.error.message);
        console.log(error);
      }
    );
  }

  togglePasswordVisibility(id: string) {
    this.isPasswordVisible = !this.isPasswordVisible;
    const passwordField = document.getElementById(id) as HTMLInputElement;
    passwordField.type = this.isPasswordVisible ? 'text' : 'password';
  }

  closeAlert() {
    this.showAlert = false;
    this.showSuccess = false;
    this.touchAlert = false;
  }
}
