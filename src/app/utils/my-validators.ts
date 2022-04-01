import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function atLeastOneLinkProgram(link: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const valueControl = control.value;
    return link !== '' || valueControl !== ''
      ? null
      : { atLeastOneLikProgram: 'Debe ingresar al menos un link' };
  };
}
