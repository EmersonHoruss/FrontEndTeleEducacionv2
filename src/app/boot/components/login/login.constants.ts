import { DefaultButton } from 'src/app/shared/constants/default-button';
import { DefaultSelect } from 'src/app/shared/constants/default-select';
import { ButtonInterface } from 'src/app/shared/interfaces/button-interface';
import { SelectInterface } from 'src/app/shared/interfaces/select-interface';
import { IconNames } from '../../../shared/constants/icon-names';
import { RolInterface } from '../../../interfaces/rol-interface';

const buttonGoogle: ButtonInterface = JSON.parse(JSON.stringify(DefaultButton));
buttonGoogle.text = 'Iniciar Sesión con Google';
buttonGoogle.icon.classCss = IconNames.google;

const selectRol: SelectInterface = JSON.parse(JSON.stringify(DefaultSelect));
selectRol.label = 'Seleccione Rol';
selectRol.viewValue = 'Nombre';
selectRol.itemValue = 'Codigo';
selectRol.isAsync = true;
selectRol.optionsToDisable = ['S', 'C'];
// selectRol.getHttp
export const Constants = {
  buttonGoogle,
  selectRol,
};
