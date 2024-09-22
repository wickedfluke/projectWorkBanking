import { Component } from '@angular/core';
import { Movement } from '../../entities/movement.entity';
import { MovementService } from '../../services/movement.service';

@Component({
  selector: 'app-view-moovement',
  templateUrl: './view-moovement.component.html',
  styleUrl: './view-moovement.component.css',
})
export class ViewMoovementComponent {
  constructor(private movementService: MovementService) {}
  movements: Movement[] = [];
  filtro = {
    numeroMovimenti: 8,
    dataInizio: '',
    dataFine: '',
  };

  esportaCSV() {
    // Implementa qui la logica per esportare i dati in formato CSV
    console.log('Esportazione in CSV...');
  }

  handleMovementsLoaded(movements: Movement[]) {
    this.movements = movements;
  }
}
