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
  constructor(private router: Router) {}
  visible: boolean = false;
  isBlurred: boolean = true;

  hydeTotal(): void {
    this.visible = !this.visible;
  }

  toggleBlur(): void {
    this.isBlurred = !this.isBlurred; // Alterna lo stato del blur
  }

  navigate(path: string) {
    this.router.navigate([path]);
  }
}
