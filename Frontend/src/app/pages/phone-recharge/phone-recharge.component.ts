import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { User } from '../../entities/user.entity';
import { MovementService } from '../../services/movement.service';
import { Movement } from '../../entities/movement.entity';
import { fixWidth, getElementById, getWidth } from '../../functions/utils.html';
import { Title } from '@angular/platform-browser';


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
    private titleSrv: Title
  ) { }

ngOnInit() {
  this.titleSrv.setTitle('Ricarica telefono');
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

createPhoneMovement(phoneNumber: string, operator: string, rechargeAmount: number, event: Event) {
  event.preventDefault();
  this.movementService.createPhoneMovement(phoneNumber, operator, rechargeAmount).subscribe(() => {
    this.userService.getBalance().subscribe((balance) => {
      this.balance = balance.balance;
    });
    this.showSuccessAlert = true;
    setTimeout(() => {
      this.showSuccessAlert = false;
    }, 10000);
  });
}
closeAlert() {
  this.showSuccessAlert = false;
}
}
