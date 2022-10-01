export interface TaskModel {
  description: string;
  title: string;
  completed: boolean;
  status: number;
  priority: number;
  startDate: string;
  deadline: string;
  id: string;
  todoListId: string;
  order: number;
  addedDate: string;
}

export interface TaskResponse {
  items: TaskModel[];
  totalCount: number;
  error: string;
}

export interface DomainTask {
  [key: string]: TaskModel[];
}
