import { ButtonInterface } from '../interfaces/button-interface';
import { IconInterface } from '../interfaces/icon-interface';
import { DefaultButton } from './default-button';

const nameButtons = ['Registrar', 'Actualizar', 'Eliminar', 'Ver'];
const iconsButtons = [
  'bi bi-pen',
  'bi bi-pencil-square',
  'bi bi-trash',
  'bi bi-eye',
];
const width = '1rem';
const height = '1rem';
const fill = 'currentColor';

const buttonsToConstruct: Array<ButtonInterface> = [];
const buttonsToConstructNoRegister: Array<ButtonInterface> = [];
let buttonRegister: ButtonInterface = JSON.parse(JSON.stringify(DefaultButton));

iconsButtons.forEach((iconButton, index) => {
  const icon: IconInterface = { classCss: iconButton, fill, width, height };
  const button: ButtonInterface = JSON.parse(JSON.stringify(DefaultButton));
  button.icon = icon;
  button.text = nameButtons[index];
  buttonsToConstruct.push(button);
  if (index !== 0) buttonsToConstructNoRegister.push(button);
  else buttonRegister = button;
});

export const ManagementButtons = buttonsToConstruct;
export const ManagementButtonsNoRegister = buttonsToConstructNoRegister;
export const ButtonRegister = buttonRegister;
