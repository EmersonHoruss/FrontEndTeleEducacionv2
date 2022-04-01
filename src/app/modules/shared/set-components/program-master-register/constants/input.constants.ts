import { DefaultInput } from '../../../constants/default-input';
import { InputInterface } from '../../../interfaces/input-interface';

// DEFINITIONS
const inputMaster: InputInterface = JSON.parse(JSON.stringify(DefaultInput));
const inputCourse: InputInterface = JSON.parse(JSON.stringify(DefaultInput));
const inputCoordinator: InputInterface = JSON.parse(
  JSON.stringify(DefaultInput)
);

const inputLinkTeleEducacion: InputInterface = JSON.parse(
  JSON.stringify(DefaultInput)
);
const inputLinkTeacher: InputInterface = JSON.parse(
  JSON.stringify(DefaultInput)
);

const cursoLS: any = localStorage.getItem('cursoPrograma');
const cursoData = JSON.parse(cursoLS);
// console.log(cursoData);
// INPUTS
inputMaster.placeholder = 'Ingrese maestría';
inputMaster.disabled = true;
inputMaster.value = cursoData.programa.Nombre;
inputMaster.label = 'Maestría';

inputCourse.placeholder = 'Ingrese curso';
inputCourse.disabled = true;
inputCourse.value = cursoData.curso.Nombre;
inputCourse.label = 'Curso';

inputCoordinator.placeholder = 'Ingrese nombre coordinador';
inputCoordinator.disabled = true;
inputCoordinator.value =
  cursoData.coordinador.Nombre +
  ' ' +
  cursoData.coordinador.ApellidoPaterno +
  ' ' +
  cursoData.coordinador.ApellidoMaterno;
inputCoordinator.label = 'Nombre coordinador';

inputLinkTeleEducacion.placeholder = 'Ingrese link brindado por TeleEducación';
inputLinkTeleEducacion.disabled = false;
inputLinkTeleEducacion.label = 'Link TeleEducación';

inputLinkTeacher.placeholder = 'Ingrese link brindado por el docente';
inputLinkTeacher.disabled = false;
inputLinkTeacher.label = 'Link docente';

export const constantsInput = {
  inputMaster,
  inputCourse,
  inputCoordinator,
  inputLinkTeleEducacion,
  inputLinkTeacher,
  
};
