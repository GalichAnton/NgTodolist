export interface Todo {
  id: string;
  title: string;
  addedDate: string;
  order: number;
}

export type Filter = 'all' | 'active' | 'completed';

export interface DomainTodo extends Todo {
  filter: Filter;
}
