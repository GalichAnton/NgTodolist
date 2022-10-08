import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { CoreModule } from '@core/core.module';

import { TaskComponent } from './components/tasks/task/task.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { TodoComponent } from './components/todos/todo/todo.component';
import { TodosComponent } from './components/todos/todos.component';
import { TodosRoutingModule } from './todos-routing.module';

@NgModule({
  declarations: [TodosComponent, TodoComponent, TasksComponent, TaskComponent],
  imports: [
    CommonModule,
    TodosRoutingModule,
    HttpClientModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatDividerModule,
    MatCheckboxModule,
    MatButtonToggleModule,
  ],
  providers: [],
})
export class TodosModule {}
