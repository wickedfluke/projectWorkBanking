import { Component, Output, EventEmitter } from '@angular/core';
import { MovementService } from '../../services/movement.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movement-table',
  templateUrl: './movement-table.component.html',
  styleUrl: './movement-table.component.css',
})
export class MovementTableComponent {
  constructor(private movementService: MovementService, private authService: AuthService, private router: Router) {}
  currentUser: any;
  movements: any[] = [];
  @Output() movementsLoaded = new EventEmitter<any[]>();

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('user')!);
    this.getMovements();
  }

  getMovements(): void {
    if (!this.currentUser) {
      console.error('Current user is not defined');
      return;
    }
    const userId = this.currentUser.id;
    const numberOfMovements = 5;
    this.movementService.listMovementsWithBalance(userId, numberOfMovements).subscribe(
      (data) => {
        this.movements = data.movements;
        // Emissione dell'evento output con i movimenti caricati
        this.movementsLoaded.emit(this.movements);
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
