import { DefaultButton } from 'src/app/shared/constants/default-button';
import { ButtonInterface } from 'src/app/shared/interfaces/button-interface';
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

const dictateButton: ButtonInterface = JSON.parse(
  JSON.stringify(DefaultButton)
);
dictateButton.tooltipText = 'Ejecutar';
dictateButton.icon = icons.dictateIcon;
dictateButton.style = { 'border-radius': '50%', width: '75%' };

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
    updateButton,
    rescheduleButton,
    dictateButton,
    saveButton,
    deleteButton,
    // listButton,
  ],
};
