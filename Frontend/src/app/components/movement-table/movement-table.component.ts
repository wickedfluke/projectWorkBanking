import { Component } from '@angular/core';
import { MovementService } from '../../services/movement.service';
import { AuthService } from '../../services/auth.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-movement-table',
  templateUrl: './movement-table.component.html',
  styleUrl: './movement-table.component.css'
})
export class MovementTableComponent {
  currentUser: any;
  movements: any[] = [];
  selectedMovement: any = null;
  modalReference: NgbModalRef | undefined;
  constructor(private movementService: MovementService, private authService: AuthService, private modalService: NgbModal) { }


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

  goToMovementDetails(content: any, movementId: string): void {

    this.movementService.getMovementById(movementId).subscribe(
      (movement) => {
        this.selectedMovement = movement;
        console.log('Selected movement:', this.selectedMovement);
        this.modalReference = this.modalService.open(content);
      },
      (error) => {
        console.error('Error fetching movement details:', error);
      }
    );
  }
}

