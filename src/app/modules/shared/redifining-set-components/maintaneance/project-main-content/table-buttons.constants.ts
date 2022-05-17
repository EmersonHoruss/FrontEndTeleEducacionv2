import { DefaultButton } from 'src/app/modules/shared/constants/default-button';
import { ButtonInterface } from 'src/app/modules/shared/interfaces/button-interface';
import { ConstantsTaIc } from './table-icons.constants';

const icons = ConstantsTaIc;

const deleteButton: ButtonInterface = JSON.parse(JSON.stringify(DefaultButton));
deleteButton.tooltipText = 'Eliminar';
deleteButton.icon = icons.deleteIcon;
deleteButton.style = { 'border-radius': '50%', width: '75%' };

const managementButton: ButtonInterface = JSON.parse(
  JSON.stringify(DefaultButton)
);
managementButton.tooltipText = 'Gestionar';
managementButton.icon = icons.managementIcon;
managementButton.style = { 'border-radius': '50%', width: '75%' };

const getItBackButton: ButtonInterface = JSON.parse(
  JSON.stringify(DefaultButton)
);
getItBackButton.tooltipText = 'Recuperar';
getItBackButton.icon = icons.getBackIcon;
getItBackButton.style = { 'border-radius': '50%', width: '75%' };

export const ConstantsTaBu = {
  buttons: [managementButton, deleteButton],
};
