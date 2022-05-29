import { DefaultButton } from 'src/app/shared/constants/default-button';
import { DefaultIcon } from 'src/app/shared/constants/default-icon';
import { ButtonInterface } from 'src/app/shared/interfaces/button-interface';
import { IconInterface } from 'src/app/shared/interfaces/icon-interface';

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
