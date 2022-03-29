import { DefaultSelect } from 'src/app/modules/shared/constants/default-select';
import { SelectInterface } from 'src/app/modules/shared/interfaces/select-interface';

const maestrias: SelectInterface = JSON.parse(JSON.stringify(DefaultSelect));
maestrias.itemValue = 'Codigo';
maestrias.viewValue = 'Nombre';
maestrias.label = 'Maestrias';
maestrias.isAsync = true;

const curriculas: SelectInterface = JSON.parse(JSON.stringify(DefaultSelect));
curriculas.itemValue = 'Codigo';
curriculas.viewValue = 'Nombre';
curriculas.label = 'Curricula';
curriculas.isAsync = true;
curriculas.disabled = true;
curriculas.autoload = true;

const cursos: SelectInterface = JSON.parse(JSON.stringify(DefaultSelect));
cursos.itemValue = 'Codigo';
cursos.viewValue = 'Nombre';
cursos.label = 'Curso';
cursos.isAsync = true;
cursos.disabled = true;
cursos.autoload = true;

export const ConstantsSe = {
  maestrias,
  curriculas,
  cursos,
};
