import { TaskStatus } from '../types/task';
import { StatusPrinterPipe } from './status-printer.pipe';

describe('StatusPrinterPipe', () => {
  it('create an instance', () => {
    const pipe = new StatusPrinterPipe();
    expect(pipe).toBeTruthy();
  });

  it('should transform status to human-readable format', () => {
    const pipe = new StatusPrinterPipe();
    for (const status of Object.values(TaskStatus)) {
      expect(pipe.transform(status)).not.toBe('Unknown Status');
    }
  });
});
