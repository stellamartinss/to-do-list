import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private baseUrl = 'http://localhost:3000'

  constructor(private http: HttpClient) { }

  getAllTasks(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/list-tasks`)
  }

  createTask(taskData: Task): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/create-task`, taskData)
  }

  editTask(taskData: Task): Observable<any> {
    return this.http.put(`${this.baseUrl}/api/edit-task/${taskData.id}`, taskData)
  }

  deleteTask(taskId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/api/delete-task/${taskId}`)
  }



}
