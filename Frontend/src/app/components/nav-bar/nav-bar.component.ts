import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent {
  constructor(private authService: AuthService) {}
  nav_items = ['Ricarica cellulare', 'Visualizza Movimenti', 'Effettua Bonifico', 'Visualizza profilo'];

  logout() {
    this.authService.logout();
  }
}
