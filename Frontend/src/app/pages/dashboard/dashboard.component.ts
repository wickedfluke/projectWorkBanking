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
  visible: boolean = false;

  toggleVisible() {
    this.visible = !this.visible;
    console.log(this.visible);
  }

  navigate(path: string) {
    this.router.navigate([path]);
  }
}
