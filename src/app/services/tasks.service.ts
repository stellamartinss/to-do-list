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
    const headers = this.getRequestHeaders();
    return this.http.get(`${this.baseUrl}/list-tasks`, {headers});
  }

  createTask(taskData: Task): Observable<any> {
    const headers = this.getRequestHeaders();
    return this.http.post(`${this.baseUrl}/create-task`, taskData, {headers});
  }

  editTask(taskData: Task): Observable<any> {
    const headers = this.getRequestHeaders();
    return this.http.put(`${this.baseUrl}/edit-task/${taskData.id}`, taskData, {headers});
  }

  deleteTask(taskId: number): Observable<any> {
    const headers = this.getRequestHeaders();
    return this.http.delete(`${this.baseUrl}/delete-task/${taskId}`, {headers});
  }
}
