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

const rescheduleButton: ButtonInterface = JSON.parse(
  JSON.stringify(DefaultButton)
);
rescheduleButton.tooltipText = 'Reprogramar';
rescheduleButton.icon = icons.rescheduleIcon;
rescheduleButton.style = { 'border-radius': '50%', width: '75%' };

export const ConstantsTaBu = {
  updateButton,
  deleteButton,
  rescheduleButton,
};
