import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { MatDialog } from '@angular/material/dialog';
import { RegisterComponent } from '../register/register.component';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() checkToken = new EventEmitter<void>();

  user: User = { email: '', username: '' };
  token: string | null = localStorage.getItem('token');

  constructor(
    public dialog: MatDialog,
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  openLoginDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '350px',
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      this.token = this.authService.getToken();

      this.userService.getUserData().subscribe((result) => {
          this.user = result;
          this.checkToken.emit();

      });
    });
  }

  openRegisterDialog(): void {
    const dialogRef = this.dialog.open(RegisterComponent, {
      width: '350px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.token = this.authService.getToken();

      this.userService.getUserData().subscribe((result) => {
          this.user = result;
          this.checkToken.emit();
      });
    });
  }

  onLogout() {
    localStorage.removeItem('token');
    this.authService.logout();
    this.token = null;
    this.checkToken.emit();
  }
}
