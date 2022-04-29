import { DefaultButton } from "src/app/modules/shared/constants/default-button";
import { ButtonInterface } from "src/app/modules/shared/interfaces/button-interface";

const buttonRegistar: ButtonInterface = JSON.parse(
    JSON.stringify(DefaultButton)
  );
  buttonRegistar.text = 'Registrar';
  buttonRegistar.url = 'registrar';
  
  const buttonVerCoordinador: ButtonInterface = JSON.parse(
    JSON.stringify(DefaultButton)
  );
  buttonVerCoordinador.text = 'Ver Coordinador';
  
  export const ConstantsBu = {
    buttonRegistar,
    buttonVerCoordinador,
  };