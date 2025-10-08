import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'expirationDate',
  standalone: true
})
export class ExpirationDatePipe implements PipeTransform {
  transform(month: number, year: number): string {
    if (!month || !year) {
      return 'N/A';
    }
    
    const monthStr = month.toString().padStart(2, '0');
    const yearStr = year.toString().slice(-2);
    
    return `${monthStr}/${yearStr}`;
  }
}
