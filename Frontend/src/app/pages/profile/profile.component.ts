import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { AuthService } from '../../services/auth.service';
import { User } from '../../entities/user.entity';
import { UserService } from '../../services/user.service';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements AfterViewInit {
  @ViewChild('lineChart') lineChart!: ElementRef;
  @ViewChild('pieChart') pieChart!: ElementRef;
  currentUser: any;
  users: User[] = [];
  balance: number = 0;
  email: string = '';
  passwordForm: FormGroup | undefined;
  modalReference: NgbModalRef | undefined;
  showAlert: boolean = false;
  showSuccess: boolean = false;
  touchAlert: boolean = false;

  constructor(private authService: AuthService, private userService: UserService, private fb: FormBuilder, private modalService: NgbModal) {
    Chart.register(...registerables);
  }

  ngOnInit() {
    this.authService.currentUser$.subscribe((user) => (this.currentUser = user));
    this.passwordForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
    });
    this.authService.fetchUsername().subscribe((email) => {
      this.email = email;
    });
  }

  usciteMensili = [20, 30, 40, 50, 60, 70, 80, 90, 3000, 50, 30, 20];
  distribuzioneSpese = [10, 15, 20, 25, 30];

  ngAfterViewInit() {
    this.createLineChart();
    this.createPieChart();
  }

  createLineChart() {
    new Chart(this.lineChart.nativeElement, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            label: 'Uscite Mensili',
            data: this.usciteMensili,
            borderColor: 'orange',
            fill: false,
            tension: 0.1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  createPieChart() {
    new Chart(this.pieChart.nativeElement, {
      type: 'pie',
      data: {
        labels: ['Cibo', 'Serata', 'Sigarette', 'Macchina', 'Appuntamenti'],
        datasets: [
          {
            data: this.distribuzioneSpese,
            backgroundColor: ['#FFA07A', '#FF7F50', '#FFD700', '#DAA520', '#FF6347'],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
          },
        },
      },
    });
  }

  openChangePasswordModal(content: any) {
    this.modalReference = this.modalService.open(content);
  }

  closeModal() {
    if (this.modalReference) {
      this.modalReference.close();
    }
  }

  submitChangePassword() {
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
        alert('Errore:' + error.error);
      }
    );
  }

  closeAlert() {
    this.showAlert = false;
    this.showSuccess = false;
    this.touchAlert = false;
  }
}