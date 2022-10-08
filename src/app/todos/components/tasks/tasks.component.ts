import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { TaskModel, UpdateTaskModel } from '@todos/models/task.model';
import { TasksService } from '@todos/services/tasks.service';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'todo-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  constructor(private tasksService: TasksService) {}
  @Input() todoId!: string;
  taskTitle = new FormControl('', [Validators.required]);
  tasks$!: Observable<TaskModel[]>;

  ngOnInit(): void {
    this.tasksService.getTasks(this.todoId);
    this.tasks$ = this.tasksService.filteredTasks$.pipe(map(tasks => tasks[this.todoId]));
  }

  addTaskHandler() {
    this.tasksService.addTask({ todoId: this.todoId, title: this.taskTitle.value });
    this.taskTitle.setValue('');
  }

  removeTask(data: { taskId: string; todoId: string }) {
    this.tasksService.removeTask(data);
  }

  changeTaskStatus(data: { taskId: string; todoId: string; model: UpdateTaskModel }) {
    this.tasksService.updateTask(data);
  }
}
