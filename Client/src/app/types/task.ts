export type Task = {
  id: number;
  caseNumber: number;
  title: string;
  description: string;
  status: TaskStatus;
  dueDate: Date;
};

export enum TaskStatus {
  TODO = 'todo',
  IN_PROGRESS = 'in-progress',
  DONE = 'done',
}
