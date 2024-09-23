import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from './services/auth.service';
import { JwtService } from './services/jwt.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Home banking';
  currentUser$ = this.authSrv.currentUser$;
  private tokenCheckInterval: any;

  constructor(
    private titleSrv: Title,
    private authSrv: AuthService,
    private jwtSrv: JwtService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.titleSrv.setTitle(this.title);
    this.startTokenCheck();
  }

  logout(): void {
    this.authSrv.logout();
    this.router.navigate(['/login']);
  }

  startTokenCheck(): void {
    this.tokenCheckInterval = setInterval(() => {
      const token = this.jwtSrv.getToken();
      if (token && this.jwtSrv.isTokenExpired(token)) {
        this.logout();
      }
    }, 10000);
  }

  ngOnDestroy(): void {
    if (this.tokenCheckInterval) {
      clearInterval(this.tokenCheckInterval);
    }
  }
}