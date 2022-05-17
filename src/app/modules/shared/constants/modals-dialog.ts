import { IconInterface } from '../interfaces/icon-interface';
import { ModalsDialogInterface } from '../interfaces/modals-dialog-interface';
import { DefaultIcon } from './default-icon';
import { IconNames } from './icon-names';

const getClassCss = (modalType: string) =>
  modalType == 'success'
    ? IconNames.success
    : modalType === 'warning'
    ? IconNames.warning
    : modalType === 'error'
    ? IconNames.error
    : modalType === 'confirm'
    ? IconNames.confirm
    : modalType === 'load'
    ? IconNames.load
    : JSON.parse(JSON.stringify(DefaultIcon));

const sizeIcon: string = '5rem';

const getIconEntity = (modalType: string) => {
  const iconEntity: IconInterface = JSON.parse(JSON.stringify(DefaultIcon));
  iconEntity.height = sizeIcon;
  iconEntity.width = sizeIcon;
  iconEntity.classCss = getClassCss(modalType);
  return iconEntity;
};

const success: ModalsDialogInterface = {
  type: 'success',
  icon: IconNames.success,
  title: 'Operación Exitosa',
  iconEntity: getIconEntity('success'),
};

const warning: ModalsDialogInterface = {
  type: 'warning',
  icon: IconNames.warning,
  title: 'Tenga Cuidado',
  iconEntity: getIconEntity('warning'),
};

const error: ModalsDialogInterface = {
  type: 'error',
  icon: IconNames.error,
  title: 'Error',
  iconEntity: getIconEntity('error'),
};

const confirm: ModalsDialogInterface = {
  type: 'confirm',
  icon: IconNames.confirm,
  title: '¿Está Seguro?',
  iconEntity: getIconEntity('confirm'),
};

const load: ModalsDialogInterface = {
  type: 'load',
  icon: IconNames.load,
  title: 'Cargando',
  iconEntity: getIconEntity('load'),
};

export const modalsDialog = {
  success,
  warning,
  error,
  confirm,
  load,
  
};
