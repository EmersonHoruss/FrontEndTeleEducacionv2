import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'columTableProgramations',
})
export class ColumTableProgramationsPipe implements PipeTransform {
  transform(value: string, nameColumn: string): string {
    if (nameColumn === 'Estado')
      return value === 'P'
        ? 'Programado'
        : value === 'R'
        ? 'Reprogramado'
        : value === 'E'
        ? 'Ejecutado'
        : value === 'D'
        ? 'Dictado'
        : value === 'T'
        ? 'Terminado'
        : 'No encontrado';

    if (
      nameColumn === 'Fecha' ||
      nameColumn === 'Fecha de Inicio' ||
      nameColumn === 'Fecha de Fin'
    ) {
      const splitedValues = value.split('-');
      const reversedSplitedValue = splitedValues.reverse();

      return (
        reversedSplitedValue[0] +
        '/' +
        reversedSplitedValue[1] +
        '/' +
        reversedSplitedValue[2]
      );
    }

    if (nameColumn === 'Hora de Inicio' || nameColumn === 'Hora de Fin')
      return value.slice(0, 5);

    return value;
  }
}
