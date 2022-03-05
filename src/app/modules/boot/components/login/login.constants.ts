import { DefaultButton } from 'src/app/modules/shared/constants/default-button';
import { DefaultSelect } from 'src/app/modules/shared/constants/default-select';
import { ButtonInterface } from 'src/app/modules/shared/interfaces/button-interface';
import { SelectInterface } from 'src/app/modules/shared/interfaces/select-interface';
import { IconNames } from '../../../shared/constants/icon-names';
import { RolInterface } from '../../../../interfaces/rol-interface';

const buttonGoogle: ButtonInterface = JSON.parse(JSON.stringify(DefaultButton));
buttonGoogle.text = 'Iniciar Sesión con Google';
buttonGoogle.icon.classCss = IconNames.google;

const selectRol: SelectInterface = JSON.parse(JSON.stringify(DefaultSelect));
selectRol.label = 'Seleccione Rol';
const items: Array<RolInterface> = [
  { id: 1, name: 'TeleEducación' },
  { id: 2, name: 'Coordinador' },
  { id: 3, name: 'Secretaria Académica' },
];
selectRol.items = items;
selectRol.viewValue = 'name';
selectRol.itemValue = 'id';
selectRol.defaultSelectedValue = 'Ninguno';
selectRol.enableDefaultSelectedItem = false
export const Constants = {
  buttonGoogle,
  selectRol,
};
