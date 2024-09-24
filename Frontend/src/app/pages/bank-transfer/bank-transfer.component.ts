import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MovementService } from '../../services/movement.service';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { User } from '../../entities/user.entity';

@Component({
  selector: 'app-bank-transfer',
  templateUrl: './bank-transfer.component.html',
  styleUrls: ['./bank-transfer.component.css'], 
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
  showCheckTransfer = false; 
  showDataInsert = true; 
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
    
    this.showCheckTransfer = true;
    this.showDataInsert = false;
  }

  confirmTransfer() {
    this.movementSrv
      .createTransferMovement(this.transferData.iban, this.transferData.amount, this.transferData.description)
      .subscribe(
        (res) => {
          console.log('Transfer successful', res);
          
        },
        (err) => {
          console.error('Transfer failed', err);
          
        }
      );
  }

  editTransfer() {
    
    this.showCheckTransfer = false;
    this.showDataInsert = true;
  }
}
