import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-email-confirmation-failded',
  templateUrl: './email-confirmation-failded.component.html',
  styleUrl: './email-confirmation-failded.component.css',
})
export class EmailConfirmationFaildedComponent {
  constructor(private router: Router) {}

  navigateToRegister() {
    this.router.navigate(['/register']);
  }
}
