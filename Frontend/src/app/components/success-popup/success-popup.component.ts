import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-success-popup',
  templateUrl: './success-popup.component.html',
  styleUrls: ['./success-popup.component.css'],
})
export class SuccessPopupComponent {
  @Input() show: boolean = false; // Per controllare se mostrare il popup
  @Input() message: string = 'Ricarica effettuata con successo!'; // Messaggio personalizzato
  @Output() closed = new EventEmitter<void>(); // Evento emesso quando si chiude il popup

  closePopup() {
    this.show = false; // Nasconde il popup
    this.closed.emit(); // Emette l'evento di chiusura
  }
}
