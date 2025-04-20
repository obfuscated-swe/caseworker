import { Pipe, PipeTransform } from '@angular/core';
import { DateTime } from 'luxon';

@Pipe({
  name: 'dynamicDate',
})
export class DatePipe implements PipeTransform {
  transform(value: Date, format: string = 'MMM d, y, h:mm a'): string {
    const parsedDate = DateTime.fromJSDate(value);
    const now = DateTime.now();

    if (parsedDate < now) {
      return parsedDate.toFormat(format);
    }

    const diffInHours = parsedDate.diff(now, 'hours').hours;
    const diffInDays = parsedDate.diff(now, 'days').days;

    console.log('Parsed Date:', parsedDate.toString());
    return diffInDays.toString();
  }
}
