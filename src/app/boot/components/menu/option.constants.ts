import { OptionInterface } from '../../interfaces/option-interface';
import { icons } from './icon.constant';

const optionsText: Array<string> = [
  'Casa',
  'Programaciones',
  'Mantenimiento',
  'Reportes',
  'Configuración',
];

const optionsUrl: Array<string> = [
  '/casa',
  '/programaciones',
  '/mantenimiento',
  '/reportes',
  '/configuración',
];

const optionsToConstruct: Array<OptionInterface> = [];

icons.forEach((icon, index) => {
  const option: OptionInterface = {
    text: optionsText[index],
    icon: icon,
    url: optionsUrl[index],
  };
  optionsToConstruct.push(option);
});

export const optionsConstant = optionsToConstruct;
