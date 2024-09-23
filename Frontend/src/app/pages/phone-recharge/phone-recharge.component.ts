import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { User } from '../../entities/user.entity';
import { MovementService } from '../../services/movement.service';
import { Movement } from '../../entities/movement.entity';
import { fixWidth, getElementById, getWidth } from '../../functions/utils.html';

@Component({
  selector: 'app-phone-recharge',
  templateUrl: './phone-recharge.component.html',
  styleUrl: './phone-recharge.component.css',
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
    private movementService: MovementService
  ) {}

  ngOnInit() {
    this.authService.currentUser$.subscribe((user) => (this.currentUser = user));
    this.userService.getUsers().subscribe((users) => {
      this.users = users;
    });
    this.userService.getBalance().subscribe((balance) => {
      this.balance = balance.balance;
    });
    this.centerBtnSubmit();
  }

  centerBtnSubmit() {
    fixWidth('btn-submit', 'phoneNumber', 30);
    const formEl = getElementById('form');
    formEl!.style.position = 'relative';
    const widthForm = getWidth('form'); // Larghezza del form
    const btnSubmitEl = getElementById('btn-submit');
    const widthButton = getWidth('btn-submit'); // Larghezza del pulsante
    btnSubmitEl!.style.position = 'absolute';
    btnSubmitEl!.style.left = `${(widthForm - widthButton) / 2}px`; // Centra esattamente
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
