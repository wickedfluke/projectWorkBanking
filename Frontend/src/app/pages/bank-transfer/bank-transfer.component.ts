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

<<<<<<< Updated upstream
  // Error tracking
=======
>>>>>>> Stashed changes
  errors: string[] = [];

  constructor(
    private titleSrv: Title,
    private router: Router,
    private movementSrv: MovementService,
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.titleSrv.setTitle('Effettua bonifico');
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
<<<<<<< Updated upstream
    this.errors = []; // Clear previous errors
=======
    this.errors = [];
>>>>>>> Stashed changes

    this.validateIban();
    this.validateAmount();

<<<<<<< Updated upstream
    // Check if there are any errors
=======
>>>>>>> Stashed changes
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
          setTimeout(() => {
            this.router.navigate(['/dashboard']);
          }, 5000);
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
<<<<<<< Updated upstream
        this.errors.push(ibanError); // Add error if it doesn't already exist
      }
    } else {
      // Remove the error if IBAN is valid
=======
        this.errors.push(ibanError);
      }
    } else {
>>>>>>> Stashed changes
      this.errors = this.errors.filter((error) => error !== ibanError);
    }
  }

  validateAmount() {
    const amountError = "L'importo deve essere maggiore di 0.";
    if (this.transferData.amount <= 0) {
      if (!this.errors.includes(amountError)) {
<<<<<<< Updated upstream
        this.errors.push(amountError); // Add error if it doesn't already exist
      }
    } else {
      // Remove the error if amount is valid
=======
        this.errors.push(amountError);
      }
    } else {
>>>>>>> Stashed changes
      this.errors = this.errors.filter((error) => error !== amountError);
    }
  }

  editTransfer() {
    this.showCheckTransfer = false;
    this.showDataInsert = true;
  }

  closeAlert() {
    this.showSuccessComponent = false;
<<<<<<< Updated upstream
=======
    this.router.navigate(['/dashboard']);
>>>>>>> Stashed changes
  }
}
