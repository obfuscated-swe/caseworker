import { Pipe, PipeTransform } from '@angular/core';
import { DateTime } from 'luxon';

@Pipe({
  name: 'dynamicDate',
})
export class DatePipe implements PipeTransform {
  transform(value: Date, format: string = 'H:mm, MMM d y'): string {
    const pastFormat = 'MMM d, y';
    const soonFormat = 'H:mm, MMM d';

    const parsedDate = DateTime.fromJSDate(value);
    const now = DateTime.now();

    if (parsedDate < now) {
      return 'Overdue: ' + parsedDate.toFormat(pastFormat);
    }

    const diffInMonths = parsedDate.diff(now, 'months').months;

    if (diffInMonths < 12) {
      return parsedDate.toFormat(soonFormat);
    }
    // const diffInHours = parsedDate.diff(now, 'hours').hours;
    // const diffInDays = parsedDate.diff(now, 'days').days;

    // console.log('Parsed Date:', parsedDate.toString());
    // return diffInDays.toFixed(0) + ' Days';
    return parsedDate.toFormat(format);
  }
}
