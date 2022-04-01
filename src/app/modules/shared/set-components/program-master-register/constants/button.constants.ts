import { DefaultButton } from 'src/app/modules/shared/constants/default-button';
import { ButtonInterface } from 'src/app/modules/shared/interfaces/button-interface';
import { DefaultIcon } from 'src/app/modules/shared/constants/default-icon';
import { IconInterface } from 'src/app/modules/shared/interfaces/icon-interface';

const plusIcon: IconInterface = JSON.parse(JSON.stringify(DefaultIcon));
plusIcon.classCss = 'bi bi-plus-lg';

const plusButton: ButtonInterface = JSON.parse(JSON.stringify(DefaultButton));
plusButton.tooltipText = 'Añadir';
plusButton.icon = plusIcon;
plusButton.style = {
  'border-radius': '50%',
  width: '65%',
  height: '50%',
  margin: 'auto',
  'margin-top': '.8rem',
};

export const constantsButton = {
  plusButton,
};
