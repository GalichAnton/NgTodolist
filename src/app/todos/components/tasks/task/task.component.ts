import { Component, Input, OnInit } from '@angular/core';
import { TaskModel } from '@todos/models/task.model';

@Component({
  selector: 'todo-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {
  constructor() {}
  @Input() task!: TaskModel;
  ngOnInit(): void {}
}
