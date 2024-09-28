import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MovementService } from '../../services/movement.service';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { User } from '../../entities/user.entity';
import { Router } from '@angular/router';
import { getElementById, showContent } from '../../functions/utils.html';

@Component({
  selector: 'app-bank-transfer',
  templateUrl: './bank-transfer.component.html',
  styleUrls: ['./bank-transfer.component.css'],
})
export class BankTransferComponent implements OnInit {
  users: User[] = [];
  userIbans: string[] = [];
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
  ) {}

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
      this.getIbans();
    });
  }

  private getIbans() {
    this.userIbans = this.users.map((user) => user.iban);
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
        (err: any) => {
          const errorElement = getElementById('transfer-error');
          errorElement.innerText = err.error.error;
          showContent(errorElement);
        }
      );
  }

  validateFirstName() {
    const firstNameError = 'Nome non valido.';
    if (this.transferData.firstName.length === 0) {
      if (!this.errors.includes(firstNameError)) this.errors.push(firstNameError);
    } else {
      this.errors = this.errors.filter((error) => error !== firstNameError);
    }
  }

  validateLastName() {
    const lastNameError = 'Cognome non valido.';
    if (this.transferData.lastName.length === 0) {
      if (!this.errors.includes(lastNameError)) this.errors.push(lastNameError);
    } else {
      this.errors = this.errors.filter((error) => error !== lastNameError);
    }
  }

  validateIban() {
    const ibanErrorLenght = 'IBAN deve essere di 27 caratteri.';
    const sameIbanError = 'Non puoi fare un bonifico a te stesso.';
    const ibanNotFound = 'IBAN non trovato nel database.';
    if (this.transferData.iban.length !== 27)
      if (!this.errors.includes(ibanErrorLenght)) this.errors.push(ibanErrorLenght);
      else this.errors = this.errors.filter((error) => error !== ibanErrorLenght);
    if (!this.userIbans.includes(this.transferData.iban))
      if (!this.errors.includes(ibanNotFound)) this.errors.push(ibanNotFound);
      else this.errors = this.errors.filter((error) => error !== ibanNotFound);
    if (this.currentUser.iban === this.transferData.iban)
      if (!this.errors.includes(sameIbanError)) this.errors.push(sameIbanError);
      else this.errors = this.errors.filter((error) => error !== sameIbanError);
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
