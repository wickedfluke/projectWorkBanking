import { Component, EventEmitter, Output, Input } from '@angular/core';
import { EyeStateService } from '../../services/eyes-icon.service';

@Component({
  selector: 'app-eyes-icon',
  templateUrl: './eyes-icon.component.html',
  styleUrls: ['./eyes-icon.component.css'],
})
export class EyesIconComponent {
  @Output() click = new EventEmitter<boolean>();
  @Input() size: string = '32px'; // Dimensione predefinita

  isOpen: boolean = true;

  constructor(private eyeStateService: EyeStateService) {}

  // Metodo per gestire il clic e emettere l'evento
  onClick(): void {
    this.isOpen = !this.isOpen; // Alterna lo stato
    this.eyeStateService.setOpenState(this.isOpen);
    this.click.emit(this.isOpen); // Emette l'evento
  }
}
