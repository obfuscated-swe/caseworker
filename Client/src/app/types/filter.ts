import { TaskStatus } from './task';

export type Filter = {
  order: OrderType;
  search: SearchObject;
  statuses: TaskStatus[];
};

export type SearchType = 'id' | 'caseNumber';

export type SearchObject = {
  type: SearchType;
  value: string;
};

export type OrderType = 'ascending' | 'descending';
