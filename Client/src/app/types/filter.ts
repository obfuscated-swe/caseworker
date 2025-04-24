import { TaskStatus } from './task';

export type Filter = {
  order: 'closest';
  search: string;
  statuses: TaskStatus[];
};
