import { Component } from '@angular/core';
import { EyeStateService } from '../../services/eyes-icon.service';
import { Router } from '@angular/router';
import { getElementById } from '../../functions/utils.html';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  constructor(private eyeStateService: EyeStateService, private router: Router) {}

  // Metodo per gestire il clic sull'icona dell'occhio
  onEyeClick(): void {
    const eyes = document.getElementById('eyes') as HTMLInputElement;
    console.log('Occhio stato:', eyes.checked); // Per debugging
  }

  navigate(path: string) {
    this.router.navigate([path]);
  }
}
