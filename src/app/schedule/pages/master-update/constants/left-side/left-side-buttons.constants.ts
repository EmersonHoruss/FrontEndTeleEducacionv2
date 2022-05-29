import { DefaultButton } from 'src/app/shared/constants/default-button';
import { ButtonInterface } from 'src/app/shared/interfaces/button-interface';
import { ConstantsRiSiIc } from './left-side-icons.constants';

const icons = ConstantsRiSiIc;

const plusButton: ButtonInterface = JSON.parse(JSON.stringify(DefaultButton));
plusButton.tooltipText = 'Añadir';
plusButton.icon = icons.plusIcon;
plusButton.style = {
  'border-radius': '50%',
  width: '65%',
  height: '50%',
  margin: 'auto',
  'margin-top': '.8rem',
};

export const ConstantsRiSiBu = {
  plusButton,
};
