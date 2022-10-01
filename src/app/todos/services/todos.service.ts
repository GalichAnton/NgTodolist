import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonResponse } from '@core/models/core.models';
import { environment } from '@env/environment';
import { Todo } from '@todos/models/todos.models';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  todos$ = new BehaviorSubject<Todo[]>([]);
  constructor(private http: HttpClient) {}
  getTodos() {
    this.http.get<Todo[]>(`${environment.baseUrl}/todo-lists`).subscribe(todos => {
      this.todos$.next(todos);
    });
  }

  addTodo(title: string) {
    this.http
      .post<CommonResponse<{ item: Todo }>>(`${environment.baseUrl}/todo-lists`, { title })
      .pipe(map(res => [res.data.item, ...this.todos$.getValue()]))
      .subscribe(todos => {
        this.todos$.next(todos);
      });
  }

  deleteTodo(id: string) {
    this.http
      .delete(`${environment.baseUrl}/todo-lists/${id}`)
      .pipe(map(() => this.todos$.getValue().filter(todo => todo.id !== id)))
      .subscribe(todos => {
        this.todos$.next(todos);
      });
  }

  editTodoTitle(data: { todoId: string; title: string }) {
    this.http
      .put<CommonResponse<{ item: Todo }>>(`${environment.baseUrl}/todo-lists/${data.todoId}`, {
        title: data.title,
      })
      .pipe(
        map(res => {
          return this.todos$.getValue().map(todo => {
            if (data.todoId === res.data.item.id) {
              todo.title = res.data.item.title;
            }
            return todo;
          });
        })
      )
      .subscribe(todos => {
        this.todos$.next(todos);
      });
  }
}
