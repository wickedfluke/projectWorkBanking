import { Component } from '@angular/core';
import { MovementService } from '../../services/movement.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movement-table',
  templateUrl: './movement-table.component.html',
  styleUrl: './movement-table.component.css'
})
export class MovementTableComponent {
  currentUser: any;
  movements: any[] = [];
  constructor(private movementService: MovementService, private authService: AuthService, private router: Router) { }


  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
      if (this.currentUser) {
        this.getMovements();
      }
    });
  }

  getMovements(): void {
    if (!this.currentUser) {
      console.error('Current user is not defined');
      return;
    }
      const userId = this.currentUser.id;
      const numberOfMovements = 5;
      this.movementService.listMovementsWithBalance(numberOfMovements).subscribe(
        (data) => {
          this.movements = data.movements;
        },
        (error) => {
          console.error('Error fetching movements:', error);
        }
      );
  }

  goToMovementDetails(movementId: string): void {
    this.router.navigate(['/movements', movementId]);
  }
}

