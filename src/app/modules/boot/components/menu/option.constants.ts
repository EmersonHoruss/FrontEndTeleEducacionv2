import { OptionInterface } from '../../interfaces/option-interface';
import { icons } from './icon.constant';

const optionsText: Array<string> = [
  'Casa',
  'Programar',
  'Reprogramar',
  'Dar Seguimiento',
  'Mantenimiento',
  'Reportes',
  'Configuración',
];

const optionsUrl: Array<string> = [
  '/casa',
  '/programar',
  '/reprogramar',
  '/dar-seguimiento',
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
