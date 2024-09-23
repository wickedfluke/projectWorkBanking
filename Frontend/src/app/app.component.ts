import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  constructor(private titleSrv: Title, private authSrv: AuthService) {}
  title = 'Home banking';
  currentUser$ = this.authSrv.currentUser$;

  ngOnInit(): void {
    this.titleSrv.setTitle(this.title);
  }

  logout() {
    this.authSrv.logout();
  }
}
