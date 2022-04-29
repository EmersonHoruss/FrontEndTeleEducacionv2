import { DefaultButton } from 'src/app/modules/shared/constants/default-button';
import { ButtonInterface } from 'src/app/modules/shared/interfaces/button-interface';
import { ConstantsTaIc } from './table-icons.constants';

const icons = ConstantsTaIc;

const updateButton: ButtonInterface = JSON.parse(JSON.stringify(DefaultButton));
updateButton.tooltipText = 'Modificar';
updateButton.icon = icons.updateIcon;
updateButton.style = { 'border-radius': '50%', width: '75%' };

const deleteButton: ButtonInterface = JSON.parse(JSON.stringify(DefaultButton));
deleteButton.tooltipText = 'Eliminar';
deleteButton.icon = icons.deleteIcon;
deleteButton.style = { 'border-radius': '50%', width: '75%' };

const managementButton: ButtonInterface = JSON.parse(JSON.stringify(DefaultButton));
managementButton.tooltipText = 'Gestionar';
managementButton.icon = icons.managementIcon;
managementButton.style = { 'border-radius': '50%', width: '75%' };

const seeButton: ButtonInterface = JSON.parse(JSON.stringify(DefaultButton));
seeButton.tooltipText = 'Ver';
seeButton.icon = icons.seeIcon;
seeButton.style = { 'border-radius': '50%', width: '75%' };

const saveButton: ButtonInterface = JSON.parse(JSON.stringify(DefaultButton));
saveButton.tooltipText = 'Guardar Sesión';
saveButton.icon = icons.saveIcon;
saveButton.style = { 'border-radius': '50%', width: '75%' };

const rescheduleButton: ButtonInterface = JSON.parse(
  JSON.stringify(DefaultButton)
);
rescheduleButton.tooltipText = 'Reprogramar';
rescheduleButton.icon = icons.rescheduleIcon;
rescheduleButton.style = { 'border-radius': '50%', width: '75%' };

const listButton: ButtonInterface = JSON.parse(JSON.stringify(DefaultButton));
listButton.text = 'Listar';

export const ConstantsTaBu = {
  buttons: [
    // updateButton,
    managementButton,
    deleteButton,
    // seeButton,
    // saveButton,
    // rescheduleButton,
    // listButton,
  ],
};
