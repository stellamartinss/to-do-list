import { Component } from '@angular/core';
import { User } from './models/user';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'to-do-list';
  token: string | null = null

  constructor() {
    this.getToken()
  }

  getToken(): void {
    this.token = localStorage.getItem('token');
  }
}
