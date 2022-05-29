import { DefaultButton } from "src/app/shared/constants/default-button";
import { ButtonInterface } from "src/app/shared/interfaces/button-interface";
import { ConstantsTaIc } from "./table-icons.buttons";


const icons  = ConstantsTaIc;

const updateButton: ButtonInterface = JSON.parse(JSON.stringify(DefaultButton));
updateButton.tooltipText = 'Modificar';
updateButton.icon = icons.updateIcon;
updateButton.style = {'border-radius': '50%','width': '75%'};

const deleteButton: ButtonInterface = JSON.parse(JSON.stringify(DefaultButton));
deleteButton.tooltipText = 'Eliminar';
deleteButton.icon = icons.deleteIcon;
deleteButton.style = {'border-radius': '50%','width': '75%'};

const saveButton: ButtonInterface = JSON.parse(JSON.stringify(DefaultButton));
saveButton.tooltipText = 'Guardar Sesión';
saveButton.icon = icons.saveIcon;
saveButton.url = 'guardar';
saveButton.style = {'border-radius': '50%','width': '75%'};

export const ConstantsTaBu = {
    updateButton,
    deleteButton,
    saveButton,
  };