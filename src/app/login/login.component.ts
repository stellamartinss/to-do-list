import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { AuthService } from '../services/auth.service';
import { Auth } from '../models/auth';
import { Error } from '../models/error';
import { User } from '../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  auth: Auth = { email: '', username: '', password: '' };
  error: Error = { id: -1, message: '', open: false };
  userData: User = { email: '', username: '' };

  constructor(
    public dialogRef: MatDialogRef<LoginComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onLogin(): void {
    this.authService.login(this.auth).subscribe(
      async (response) => {
        localStorage.setItem('token', response.token)
        this.dialogRef.close({ saved: true, token: response.token });
      },
      (error) => {
        this.error = { message: error.error.error, open: true };
        this.dialogRef.close({ saved: false });
      }
    );
  }

  closeError() {
    this.error.open = false;
    this.dialogRef.close({ saved: false });
  }
}
