import { DefaultInput } from "src/app/modules/shared/constants/default-input";
import { InputInterface } from "src/app/modules/shared/interfaces/input-interface";

const inputNombreCoordinador: InputInterface = JSON.parse(
    JSON.stringify(DefaultInput)
  );
  inputNombreCoordinador.value = 'Emerson Perales Villanueva';
  inputNombreCoordinador.label = 'Coordinador: ';
  
  const inputCorreoCoordinador: InputInterface = JSON.parse(
    JSON.stringify(DefaultInput)
  );
  inputCorreoCoordinador.value = 'dperalesv@unprg.edu.pe';
  inputCorreoCoordinador.label = 'Correo: ';

  export const ConstantsIn = {    
    inputNombreCoordinador,
    inputCorreoCoordinador
  };