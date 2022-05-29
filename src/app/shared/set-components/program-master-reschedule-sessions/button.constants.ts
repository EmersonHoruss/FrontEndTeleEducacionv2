import { DefaultButton } from 'src/app/shared/constants/default-button';
import { ButtonInterface } from 'src/app/shared/interfaces/button-interface';
import { DefaultIcon } from 'src/app/shared/constants/default-icon';
import { IconInterface } from 'src/app/shared/interfaces/icon-interface';
import { IconNames } from '../../constants/icon-names';

const plusIcon: IconInterface = JSON.parse(JSON.stringify(DefaultIcon));
plusIcon.classCss = 'bi bi-plus-lg';

const cancelIcon: IconInterface = JSON.parse(JSON.stringify(DefaultIcon));
cancelIcon.classCss = IconNames.cancel;

const plusButton: ButtonInterface = JSON.parse(JSON.stringify(DefaultButton));
const cancelButton: ButtonInterface = JSON.parse(JSON.stringify(DefaultButton));

plusButton.tooltipText = 'Reprogramar sesión.';
plusButton.icon = plusIcon;
plusButton.style = {
  'border-radius': '50%',
  width: '65%',
  height: '50%',
  margin: 'auto',
  'margin-top': '.8rem',
};

cancelButton.tooltipText = 'Cancelar reprogramación';
cancelButton.icon = cancelIcon;
cancelButton.style = {
  'border-radius': '50%',
  width: '65%',
  height: '50%',
  margin: 'auto',
  'margin-top': '.8rem',
};

export const constantsButton = {
  plusButton,
  plusIcon,
  cancelButton,
};
