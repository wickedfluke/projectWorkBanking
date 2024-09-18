import { Component } from '@angular/core';
import { EyeStateService } from '../../services/eyes-icon.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  constructor(private eyeStateService: EyeStateService, private router: Router) {}

  // Metodo per gestire il clic sull'icona dell'occhio
  onEyeClick(isOpen: boolean): void {
    console.log('Occhio stato:', isOpen); // Per debugging
  }

  navigate(path: string) {
    this.router.navigate([path]);
  }
}
