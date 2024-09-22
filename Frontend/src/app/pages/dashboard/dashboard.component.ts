import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../entities/user.entity';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  visible: boolean = false;
  isBlurred: boolean = true;
  users: User[] = [];
  currentUser: any;
  balance: number = 0;
  constructor(private router: Router, private authService: AuthService, private userService: UserService) {}

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('user')!);
  }

  hideTotal(): void {
    this.visible = !this.visible;
  }

  toggleBlur(): void {
    this.isBlurred = !this.isBlurred;
  }

  navigate(path: string) {
    this.router.navigate([path]);
  }
}
