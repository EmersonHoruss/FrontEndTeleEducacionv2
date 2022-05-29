import { DefaultIcon } from 'src/app/shared/constants/default-icon';
import { IconInterface } from 'src/app/shared/interfaces/icon-interface';

const plusIcon: IconInterface = JSON.parse(JSON.stringify(DefaultIcon));
plusIcon.classCss = 'bi bi-plus-lg';

export const ConstantsRiSiIc = {
  plusIcon,
};
