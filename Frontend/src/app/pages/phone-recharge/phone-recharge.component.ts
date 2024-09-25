import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { User } from '../../entities/user.entity';
import { MovementService } from '../../services/movement.service';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { getElementById, showContent } from '../../functions/utils.html';

@Component({
  selector: 'app-phone-recharge',
  templateUrl: './phone-recharge.component.html',
  styleUrl: './phone-recharge.component.css'
})
export class PhoneRechargeComponent {
  showSuccessAlert: boolean = false;
  currentUser: any;
  users: User[] = [];
  balance: number = 0;
  phoneNumber: string = '';
  operator: string = '';
  amount: number = 0;
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private movementService: MovementService,
    private titleSrv: Title,
    private router: Router

  ) { }

  ngOnInit() {
    this.titleSrv.setTitle('Ricarica Cellulare');
    this.getCurrentUserAndUsers();
    this.getBalance();
  }


  getCurrentUserAndUsers() {
    this.authService.currentUser$.subscribe((user) => (this.currentUser = user));
    this.userService.getUsers().subscribe((users) => {
      this.users = users;
    });
  }

  getBalance() {
    this.userService.getBalance().subscribe((balance) => {
      this.balance = balance.balance;
    });
  }

  isPhoneNumberValid(): boolean {
    const phoneRegex = /^\d{9,10}$/;
    return phoneRegex.test(this.phoneNumber);
  }

  isFormValid(): boolean {
    return this.isPhoneNumberValid() && this.operator.trim() !== '' && this.amount > 0;
  }

  createPhoneMovement(phoneNumber: string, operator: string, rechargeAmount: number, event: Event) {
    event.preventDefault();
    if (!this.isFormValid()) {
      return;
    }
    this.movementService.createPhoneMovement(phoneNumber, operator, rechargeAmount).subscribe(() => {
      this.userService.getBalance().subscribe((balance) => {
        this.balance = balance.balance;
      });
      this.showSuccessAlert = true;
      setTimeout(() => {
        this.showSuccessAlert = false;
      }, 10000);
    },
    (err: any) => {
      const errorElement = getElementById('recharge-error');
      errorElement.innerText = err.error.error;
      showContent(errorElement);
    }
  
  );
  }
  closeAlert() {
    this.showSuccessAlert = false;
    this.router.navigate(['/dashboard']);
  }


}
