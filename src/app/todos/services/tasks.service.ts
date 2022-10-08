import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonResponse } from '@core/models/core.models';
import { environment } from '@env/environment';
import { DomainTask, TaskModel, TaskResponse, UpdateTaskModel } from '@todos/models/task.model';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  constructor(private http: HttpClient) {}

  tasks$ = new BehaviorSubject<DomainTask>({});
  filteredTasks$ = new BehaviorSubject<DomainTask>({});

  getTasks(todoId: string) {
    return this.http
      .get<TaskResponse>(`${environment.baseUrl}/todo-lists/${todoId}/tasks`)
      .pipe(
        map((res: TaskResponse): DomainTask => {
          return { ...this.tasks$.getValue(), [todoId]: res.items };
        })
      )
      .subscribe(res => {
        this.filteredTasks$.next(res);
        this.tasks$.next(res);
      });
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

  removeTask(data: { taskId: string; todoId: string }) {
    return this.http
      .delete(`${environment.baseUrl}/todo-lists/${data.todoId}/tasks/${data.taskId}`)
      .pipe(
        map(() => {
          return {
            ...this.tasks$.getValue(),
            [data.todoId]: this.tasks$
              .getValue()
              [data.todoId].filter(task => task.id !== data.taskId),
          };
        })
      )
      .subscribe(res => this.tasks$.next(res));
  }

  updateTask(data: { taskId: string; todoId: string; model: UpdateTaskModel }) {
    this.http
      .put(`${environment.baseUrl}/todo-lists/${data.todoId}/tasks/${data.taskId}`, data.model)
      .pipe(
        map(() => {
          const state = this.tasks$.getValue();
          const tasks = state[data.todoId];
          const newTasks = tasks.map(task => {
            if (task.id === data.taskId) {
              return { ...task, ...data.model };
            }
            return task;
          });
          return { ...state, [data.todoId]: newTasks };
        })
      )
      .subscribe(res => this.tasks$.next(res));
  }
}
