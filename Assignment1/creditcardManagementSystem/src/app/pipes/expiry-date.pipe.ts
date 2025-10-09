import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'expiryDate',
  standalone: true
})
export class ExpiryDatePipe implements PipeTransform {
  transform(month: string, year: string): string {
    if (!month || !year) return 'N/A';
    const formattedMonth = month.padStart(2, '0');
    const formattedYear = year.padStart(2, '0');
    return `${formattedMonth}/${formattedYear}`;
  }
}
