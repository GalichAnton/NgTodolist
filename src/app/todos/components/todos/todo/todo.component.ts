import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Todo } from '@todos/models/todos.models';

@Component({
  selector: 'todo-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  constructor() {}
  isEditMode = false;
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
}
