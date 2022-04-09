import { DefaultButton } from "src/app/modules/shared/constants/default-button";
import { ButtonInterface } from "src/app/modules/shared/interfaces/button-interface";

const saveButton: ButtonInterface = JSON.parse(JSON.stringify(DefaultButton));
saveButton.text = 'Guardar';

const cancelButton: ButtonInterface = JSON.parse(JSON.stringify(DefaultButton));
cancelButton.text = 'Cancelar';
cancelButton.url = '../';

export const ConstantsReUpBu = {
    saveButton,
    cancelButton,
  };