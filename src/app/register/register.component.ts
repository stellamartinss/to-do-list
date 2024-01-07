import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Auth } from '../models/auth';
import { Error } from '../models/error';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  auth: Auth = { email: '', username: '', password: '' };
  error: Error = { message: '', open: false };

  constructor(
    public dialogRef: MatDialogRef<RegisterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onRegister(): void {
    this.authService.register(this.auth).subscribe(
      (response) => {
        localStorage.setItem('token', response.token);
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
