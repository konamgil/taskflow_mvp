
export enum TaskStatus {
  Todo = 'Todo',
  Doing = 'Doing',
  Done = 'Done',
}

export enum DependencyType {
  Dependent = 'Dependent',
  NonDependent = 'NonDependent',
}

export interface Person {
  id: string;
  name: string;
  title: string;
  avatar: string;
}

export interface Task {
  id: string;
  name: string;
  assigneeId: string | null;
  status: TaskStatus;
  memo?: string;
}
