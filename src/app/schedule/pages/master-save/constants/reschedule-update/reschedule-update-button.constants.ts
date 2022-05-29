import { createUrlResolverWithoutPackagePrefix } from "@angular/compiler";
import { DefaultButton } from "src/app/shared/constants/default-button";
import { ButtonInterface } from "src/app/shared/interfaces/button-interface";

const saveButton: ButtonInterface = JSON.parse(JSON.stringify(DefaultButton));
saveButton.text = 'Guardar';

const cancelButton: ButtonInterface = JSON.parse(JSON.stringify(DefaultButton));
cancelButton.text = 'Cancelar';
cancelButton.url = '../';

export const ConstantsReUpBu = {
    saveButton,
    cancelButton,
  };