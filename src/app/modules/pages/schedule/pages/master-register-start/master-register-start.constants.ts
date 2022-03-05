import { InputInterface } from '../../../../shared/interfaces/input-interface';
import { DefaultInput } from '../../../../shared/constants/default-input';

const titlePage: string = 'Empezar Programación Maestría';

const masterInput: InputInterface = JSON.parse(JSON.stringify(DefaultInput));
masterInput.placeholder = 'nombre de la maestría';
masterInput.value = 'shut up bitch';

const courseInput: InputInterface = JSON.parse(JSON.stringify(DefaultInput));
courseInput.placeholder = 'nombre de la maestría';
courseInput.value = 'shut up bitch2';

export const Constants = {
  titlePage,
  masterInput,
  courseInput,
};
