import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MovementService } from '../../services/movement.service';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { User } from '../../entities/user.entity';
import { Router } from '@angular/router';


@Component({
  selector: 'app-bank-transfer',
  templateUrl: './bank-transfer.component.html',
  styleUrls: ['./bank-transfer.component.css'],
})
export class BankTransferComponent implements OnInit {
  users: User[] = [];
  currentUser: User | any = {};
  showCheckTransfer = false;
  showDataInsert = true;
  showSuccessComponent = false;

  transferData = {
    firstName: '',
    lastName: '',
    iban: '',
    amount: 0,
    description: '',
  };

  
  errors: string[] = [];

  constructor(
    private titleSrv: Title,
    private router: Router,
    private movementSrv: MovementService,
    private userService: UserService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.titleSrv.setTitle('Bonifici');
    this.getCurrentUserAndUsers();
  }

  get fullName(): string {
    return `${this.transferData.firstName} ${this.transferData.lastName}`.trim();
  }

  private getCurrentUserAndUsers() {
    this.authService.currentUser$.subscribe((user) => {
      this.currentUser = user;
      this.loadUsers();
    });
  }

  private loadUsers() {
    this.userService.getUsers().subscribe((users) => {
      this.users = users;
    });
  }

  onSubmit() {
    this.errors = []; 

    this.validateIban();
    this.validateAmount();

    
    if (this.errors.length === 0) {
      this.showCheckTransfer = true;
      this.showDataInsert = false;
    }

  }

  confirmTransfer() {
    this.movementSrv
      .createTransferMovement(this.transferData.iban, this.transferData.amount, this.transferData.description)
      .subscribe(
        () => {
          this.showSuccessComponent = true;
        },
        (err) => {
          console.error('Transfer failed', err);
        }
      );
  }

  validateIban() {
    const ibanError = 'IBAN deve essere di 27 caratteri.';
    if (this.transferData.iban.length !== 27) {
      if (!this.errors.includes(ibanError)) {
        this.errors.push(ibanError); 
      }
    } else {
      
      this.errors = this.errors.filter((error) => error !== ibanError);
    }
  }

  validateAmount() {
    const amountError = "L'importo deve essere maggiore di 0.";
    if (this.transferData.amount <= 0) {
      if (!this.errors.includes(amountError)) {
        this.errors.push(amountError); 
      }
    } else {
      
      this.errors = this.errors.filter((error) => error !== amountError);
    }
  }

  editTransfer() {
    this.showCheckTransfer = false;
    this.showDataInsert = true;
  }

  closeAlert() {
    this.showSuccessComponent = false;
    this.router.navigate(['/dashboard']); 
  }
}
