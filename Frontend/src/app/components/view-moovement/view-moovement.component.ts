import { Component } from '@angular/core';
import { Movement } from '../../entities/movement.entity';

@Component({
  selector: 'app-view-moovement',
  templateUrl: './view-moovement.component.html',
  styleUrl: './view-moovement.component.css',
})
export class ViewMoovementComponent {
  movimenti: Movement[] = [];

  filtro = {
    numeroMovimenti: 8,
    dataInizio: '',
    dataFine: '',
  };

  esportaCSV() {
    // Implementa qui la logica per esportare i dati in formato CSV
    console.log('Esportazione in CSV...');
  }
}
