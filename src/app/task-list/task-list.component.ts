import { Component, OnInit } from '@angular/core';
import { Task } from '../models/task';
import { TasksService } from '../services/tasks.service';
import { Error } from '../models/error';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {
  showAddTaskForm: boolean = false;
  taskToEdit: Task = {
    id: -1,
    title: '',
    completed: false,
    checked: false,
  };

  tasks: Task[] = [];
  errorList: Error[] = []

  constructor(private taskService: TasksService) {}

  ngOnInit(): void {
    this.getAllTasks()
  }

  getAllTasks(): void {
    this.taskService.getAllTasks().subscribe((tasks) => {
      this.tasks = tasks
    }, error => {
      this.addError(error)
    })
  }

  toggleTask(task: Task) {
    this.toggleAddTaskForm('close');
    this.toggleEditTaskForm()

    this.tasks.map((item) => {
      if (item.id == task.id) {
        item.completed = !item.completed;
      }
    });
  }

  toggleAddTaskForm(open?: string): void {
    if (open === 'close') {
      this.showAddTaskForm = false;
      return;
    }

    this.showAddTaskForm = !this.showAddTaskForm;
  }

  toggleEditTaskForm(task?: Task): void {
    if (!task) {
      this.taskToEdit = {
        id: -1,
        title: '',
        completed: false,
        checked: false,
      };
      return;
    }

    this.taskToEdit = task;
  }

  addTask(task: Task) {
    if (task.title !== '') {
      this.taskService.createTask(task).subscribe(async (response) => {
        this.tasks = await this.taskService.getAllTasks().toPromise()
      }, error => {
        this.addError(error)
      })
    }

    this.toggleAddTaskForm()
  }

  editTask(task: Task) {

    this.taskService.editTask(task).subscribe(async (response) => {
      this.tasks = await this.taskService.getAllTasks().toPromise()
    })

    this.toggleEditTaskForm()
  }

  removeTask(task: Task) {
    this.taskService.deleteTask(task.id).subscribe(async (response) => {
      this.tasks = await this.taskService.getAllTasks().toPromise()
    })
  }

  addError(error: any): void {
    this.errorList.push({id: this.errorList.length + 1, message: error.error.error, open: true})
  }

  closeError(error: Error): void {
    this.errorList = this.errorList.filter(item => item.id !== error.id)
  }
}
