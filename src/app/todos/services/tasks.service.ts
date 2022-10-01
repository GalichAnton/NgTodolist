import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonResponse } from '@core/models/core.models';
import { environment } from '@env/environment';
import { DomainTask, TaskModel, TaskResponse } from '@todos/models/task.model';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  constructor(private http: HttpClient) {}

  tasks$ = new BehaviorSubject<DomainTask>({});

  getTasks(todoId: string) {
    return this.http
      .get<TaskResponse>(`${environment.baseUrl}/todo-lists/${todoId}/tasks`)
      .pipe(
        map((res: TaskResponse): DomainTask => {
          return { ...this.tasks$.getValue(), [todoId]: res.items };
        })
      )
      .subscribe(res => this.tasks$.next(res));
  }

  addTask(data: { todoId: string; title: string | null }) {
    return this.http
      .post<CommonResponse<{ item: TaskModel }>>(
        `${environment.baseUrl}/todo-lists/${data.todoId}/tasks`,
        {
          title: data.title,
        }
      )
      .pipe(
        map((res): DomainTask => {
          return {
            ...this.tasks$.getValue(),
            [data.todoId]: [res.data.item, ...this.tasks$.getValue()[data.todoId]],
          };
        })
      )
      .subscribe(res => this.tasks$.next(res));
  }
}
