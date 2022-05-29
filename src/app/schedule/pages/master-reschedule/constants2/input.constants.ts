import { DefaultInput } from "src/app/shared/constants/default-input";
import { InputInterface } from "src/app/shared/interfaces/input-interface";

const inputMaestria: InputInterface = JSON.parse(
    JSON.stringify(DefaultInput)
  );
  inputMaestria.value = 'Maestria Seleccionada';
  inputMaestria.label = 'Maestria';
  
  const inputCurso: InputInterface = JSON.parse(
    JSON.stringify(DefaultInput)
  );
  inputCurso.value = 'Curso Seleccionado';
  inputCurso.label = 'Curso: ';

  export const ConstantsIn = {    
    inputMaestria,
    inputCurso
  };