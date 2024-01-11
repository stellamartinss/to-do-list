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
  message = ''

  tasks: Task[] = [];
  errorList: Error[] = []
  tasksBackup: Task[] = []

  constructor(private taskService: TasksService) {}

  ngOnInit(): void {
    this.getAllTasks()
  }

  getAllTasks(): void {
    this.taskService.getAllTasks().subscribe((tasks) => {
      if(tasks.length === 0) {
        this.message = 'Nothing to display! If you login you can see your tasks'
      }

      this.tasks = tasks
      this.tasksBackup = this.tasks

    }, error => {
      this.addError(error)
    })
  }

  toggleTask(task: Task) {
    this.toggleAddTaskForm('close');
    this.toggleEditTaskForm()

    task.completed = !task.completed
    this.taskService.editTask(task).subscribe(async response => {
      this.tasks = await this.taskService.getAllTasks().toPromise()
    })
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

  toggleFilter(status?: string) {

    this.tasks = this.tasksBackup

    if(!status) return

    this.tasks = this.tasks.filter(item => status === 'complete' ? item.completed : !item.completed)
  }

}
