import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../entities/user.entity';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  eyeState: boolean = false;
  users: User[] = [];
  currentUser: User | any = {};
  balance: number | string = 0;
  loading = false;
  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private titleSrv: Title
  ) {}

  ngOnInit() {
    this.loading = true;
    this.getCurrentUserAndUsers();
    this.getBalance();
    this.loading = false;
  }

  getCurrentUser() {
    this.titleSrv.setTitle('Dashboard myBanking');
    this.getCurrentUserAndUsers();
    this.getBalance();
  }

  getCurrentUserAndUsers() {
    this.authService.currentUser$.subscribe((user) => (this.currentUser = user));
    this.userService.getUsers().subscribe((users) => {
      this.users = users;
    });
  }

  getBalance() {
    this.userService.getBalance().subscribe((balance) => {
      this.balance = balance.balance;
    });
  }

  toggleHyde(): void {
    this.eyeState = !this.eyeState;
  }

  navigate(path: string) {
    this.router.navigate([path]);
  }
}
