export type Task = {
  id: number;
  caseNumber: number;
  title: string;
  description: string;
  status: TaskStatus;
  dueDate: Date;
};

export enum TaskStatus {
  NotStarted = 'NotStarted',
  InProgress = 'InProgress',
  OnHold = 'OnHold',
  Completed = 'Completed',
  Cancelled = 'Cancelled',
}

export function StatusList() {
  return [
    TaskStatus.NotStarted,
    TaskStatus.InProgress,
    TaskStatus.OnHold,
    TaskStatus.Completed,
    TaskStatus.Cancelled,
  ];
}
