import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtService } from './jwt.service';
import { BehaviorSubject, map, tap } from 'rxjs';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  iban: string;
  openDate: Date;
  isActive: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _currentUser$ = new BehaviorSubject<User | null>(null);
  username: string = '';

  currentUser$ = this._currentUser$.asObservable();

  constructor(
    protected http: HttpClient,
    protected jwt: JwtService,
    protected router: Router
  ) {
    if (this.isLoggedIn()) {
      this.fetchUser(); 
    }
  }

  isLoggedIn() {
    return this.jwt.hasToken();
  }

  login(username: string, password: string) {
    return this.http.post<{ user: User, token: string }>('/api/login', { username, password })
      .pipe(
        tap(res => this.jwt.setToken(res.token)),
        tap(res => this._currentUser$.next(res.user)),
        map(res => res.user)
      );
  }

  register(data: { firstName: string, lastName: string, username: string, password: string, picture: string }) {
    return this.http.post('/api/register', data);
  }

  logout() {
    this.jwt.removeToken();
    this._currentUser$.next(null);
    this.router.navigate(['/login']);
  }

  fetchUser() {
    this.http.get<User>('/api/users/me')
      .subscribe(user => this._currentUser$.next(user));
  }

  fetchUsername(): Observable<string> {
    return this.http.get<string>('/api/users/username');
  }
}
