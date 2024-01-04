import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { Task } from '../models/task';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
})
export class TaskFormComponent implements OnInit, OnChanges {
  @Output() addTask = new EventEmitter<Task>();
  @Output() editTask = new EventEmitter<Task>();
  @Output() toggleAddTaskForm = new EventEmitter();
  @Output() toggleEditTaskForm = new EventEmitter();

  @Input() task?: Task;
  @Input() tasks: Task[] = [];

  title = '';

  constructor() {}

  ngOnChanges(): void {
    if (this.task) {
      this.tasks?.map((item) => {
        if (item.id === this.task?.id) {
          this.title = item.title;
        }
      });
    }
  }

  ngOnInit(): void {}

  save(): void {
    this.task ? this.edit() : this.add();
  }

  add() {
    const id = this.tasks?.length + 1
    const task: Task = {
      id: id,
      title: this.title,
      completed: false,
      checked: false,
    };

    this.addTask.emit(task);

    console.log(this.tasks)
  }

  edit() {
    if (this.task) {
      this.task.title = this.title;

      this.editTask.emit(this.task);
    }
  }

  cancel(): void {
    this.task ? this.toggleEditTaskForm.emit() : this.toggleAddTaskForm.emit();
  }
}
