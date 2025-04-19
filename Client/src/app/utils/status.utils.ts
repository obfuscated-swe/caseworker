import { TaskStatus } from '../types/task';

// Pretty print the task status
export function seperateByCase(taskStatus: TaskStatus) {
  const result: string[] = [];
  for (let i = 0; i < taskStatus.length; i++) {
    const char = taskStatus[i];
    if (i > 0 && char === char.toUpperCase()) {
      result.push(' ');
    }
    result.push(char);
  }
  return result.join('');
}
