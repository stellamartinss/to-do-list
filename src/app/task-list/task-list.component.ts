import { Component, OnInit } from '@angular/core';
import { Task } from '../models/task';

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

  tasks: Task[] = [
    { id: 1, title: 'Buy groceries', completed: false, checked: false },
    { id: 2, title: 'Write Angular tutorial', completed: true, checked: true },
    { id: 3, title: 'Walk the dog', completed: false, checked: false },
  ];

  constructor() {}

  ngOnInit(): void {}

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
      this.tasks.push(task);
    }

    this.toggleAddTaskForm()
  }

  editTask(task: Task) {
    this.tasks.map((item) => {
      if (item.id == task.id) {
        item = task;
      }
    });

    this.toggleEditTaskForm()
  }
}
