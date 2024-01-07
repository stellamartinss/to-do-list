import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private baseUrl = 'http://localhost:3000/tasks';
  private headers: {};

  constructor(private http: HttpClient) {
    this.headers = { headers: this.getRequestHeaders() };
  }

  private getRequestHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `${token}`,
    });

    return headers;
  }

  getAllTasks(): Observable<any> {
    return this.http.get(`${this.baseUrl}/list-tasks`, this.headers);
  }

  createTask(taskData: Task): Observable<any> {
    return this.http.post(`${this.baseUrl}/create-task`, taskData, this.headers);
  }

  editTask(taskData: Task): Observable<any> {
    return this.http.put(`${this.baseUrl}/edit-task/${taskData.id}`, taskData, this.headers);
  }

  deleteTask(taskId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete-task/${taskId}`, this.headers);
  }
}
