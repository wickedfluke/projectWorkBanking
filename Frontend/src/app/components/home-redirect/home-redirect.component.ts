import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home-redirect',
  templateUrl: './home-redirect.component.html',
  styleUrl: './home-redirect.component.css',
})
export class HomeRedirectComponent {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      // Se l'utente è autenticato, reindirizzalo alla dashboard
      this.router.navigate(['/app/dashboard']);
    } else {
      // Se l'utente non è autenticato, reindirizzalo alla pagina di login
      this.router.navigate(['/signin']);
    }
  }
}
