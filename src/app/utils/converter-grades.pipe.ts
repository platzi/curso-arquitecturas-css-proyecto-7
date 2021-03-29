import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'converterGrades',
})
export class ConverterGradesPipe implements PipeTransform {
  transform(temperature: number, metric: string): string {
    let convertTemp = '';
    switch (metric) {
      case 'F':
        convertTemp = `${((temperature - 273.15) * 1.8 + 32).toFixed(
          2
        )} °${metric}`;
        break;
      default:
        convertTemp = `${(temperature - 273.15).toFixed(2)} °C`; //temperature - 273.15;
        break;
    }
    return convertTemp;
  }
}
