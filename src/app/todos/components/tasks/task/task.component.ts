import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { TaskStatus } from '@core/enums/taskStatus.enum';
import { TaskModel, UpdateTaskModel } from '@todos/models/task.model';

@Component({
  selector: 'todo-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent {
  @Input() task!: TaskModel;
  @Output() removeTaskEvent = new EventEmitter<{ taskId: string; todoId: string }>();
  @Output() changeTaskEvent = new EventEmitter<{
    taskId: string;
    todoId: string;
    model: UpdateTaskModel;
  }>();
  isEditMode = false;
  taskStatus = TaskStatus;

  removeTaskHandler() {
    this.removeTaskEvent.emit({ taskId: this.task.id, todoId: this.task.todoListId });
  }

  changeTaskStatus(event: MatCheckboxChange) {
    const newStatus = event.checked;
    this.changeTask({ status: newStatus ? TaskStatus.completed : TaskStatus.active });
  }

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
  }

  changeTitleHandler() {
    this.toggleEditMode();
    this.changeTask({ title: this.task.title });
  }

  changeTask(patch: Partial<UpdateTaskModel>) {
    const model: UpdateTaskModel = {
      status: this.task.status,
      title: this.task.title,
      description: this.task.description,
      priority: this.task.priority,
      startDate: this.task.startDate,
      deadline: this.task.deadline,
      completed: this.task.completed,
      ...patch,
    };

    this.changeTaskEvent.emit({
      taskId: this.task.id,
      todoId: this.task.todoListId,
      model,
    });
  }
}
