import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { Filter, Todo } from '@todos/models/todos.models';
import { TasksService } from '@todos/services/tasks.service';
import { BehaviorSubject, map, filter } from 'rxjs';

@Component({
  selector: 'todo-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  constructor(private tasksService: TasksService) {}
  isEditMode = false;
  filter: Filter = 'all';
  @Input() todo!: Todo;
  @Output() deleteTodoEvent = new EventEmitter<string>();
  @Output() editTodoHandler = new EventEmitter<{ todoId: string; title: string }>();
  ngOnInit(): void {}

  deleteTodoHandler() {
    this.deleteTodoEvent.emit(this.todo.id);
  }

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
  }

  changeTitleHandler() {
    this.editTodoHandler.emit({ todoId: this.todo.id, title: this.todo.title });
    this.toggleEditMode();
  }

  filterTasks(event: MatButtonToggleChange) {
    this.filter = event.value;
    this.tasksService.tasks$
      .pipe(
        map(tasks => tasks[this.todo.id]),
        map(tasks => {
          if (this.filter === 'active') {
            return tasks.filter(task => task.status !== 2);
          } else if (this.filter === 'completed') {
            return tasks.filter(task => task.status === 2);
          }
          return tasks;
        }),
        map(tasks => {
          return { ...this.tasksService.tasks$.getValue(), [this.todo.id]: tasks };
        })
      )
      .subscribe(tasks => {
        this.tasksService.filteredTasks$.next(tasks);
      });
  }
}
