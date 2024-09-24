import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MovementService } from '../../services/movement.service';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { User } from '../../entities/user.entity';
import { first } from 'rxjs';

@Component({
  selector: 'app-bank-transfer',
  templateUrl: './bank-transfer.component.html',
  styleUrls: ['./bank-transfer.component.css'], // Corrected to "styleUrls"
})
export class BankTransferComponent {
  constructor(
    private titleSrv: Title,
    private movementSrv: MovementService,
    private userService: UserService,
    private authService: AuthService
  ) {}
  users: User[] = [];
  currentUser: User | any = {};
  showCheckTransfer = false; // Initially hide the confirmation section
  showDataInsert = true; // Initially show the form
  transferData = {
    firstName: '',
    lastName: '',
    iban: '',
    amount: 0,
    description: '',
  };
  get fullName(): string {
    return `${this.transferData.firstName} ${this.transferData.lastName}`.trim();
  }

  ngOnInit() {
    this.titleSrv.setTitle('Effettua bonifico');
    this.getCurrentUserAndUsers();
  }

  getCurrentUserAndUsers() {
    this.authService.currentUser$.subscribe((user) => (this.currentUser = user));
    this.userService.getUsers().subscribe((users) => {
      this.users = users;
    });
  }

  onSubmit() {
    // Show confirmation section and hide form
    this.showCheckTransfer = true;
    this.showDataInsert = false;
  }

  confirmTransfer() {
    this.movementSrv
      .createTransferMovement(this.transferData.iban, this.transferData.amount, this.transferData.description)
      .subscribe(
        (res) => {
          console.log('Transfer successful', res);
          // Handle success, e.g., show a success message
        },
        (err) => {
          console.error('Transfer failed', err);
          // Handle error, e.g., show an error message
        }
      );
  }

  editTransfer() {
    // Reset and show the data insert form again
    this.showCheckTransfer = false;
    this.showDataInsert = true;
  }
}
