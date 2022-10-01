import { Component, OnInit } from '@angular/core';
import { Todo } from '@todos/models/todos.models';
import { TodosService } from '@todos/services/todos.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'todo-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
})
export class TodosComponent implements OnInit {
  constructor(private todoService: TodosService) {}

  todos$!: Observable<Todo[]>;
  todoTitle = '';

  ngOnInit(): void {
    this.todos$ = this.todoService.todos$;
    this.todoService.getTodos();
  }

  addTodoHandler() {
    this.todoService.addTodo(this.todoTitle);
    this.todoTitle = '';
  }

  deleteTodoHandler(id: string) {
    this.todoService.deleteTodo(id);
  }

  editTodo(data: { todoId: string; title: string }) {
    this.todoService.editTodoTitle(data);
  }
}
