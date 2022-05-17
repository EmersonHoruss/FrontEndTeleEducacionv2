import { DefaultIcon } from 'src/app/modules/shared/constants/default-icon';
import { IconInterface } from 'src/app/modules/shared/interfaces/icon-interface';

const deleteIcon: IconInterface = JSON.parse(JSON.stringify(DefaultIcon));
deleteIcon.classCss = 'bi bi-trash';

const managementIcon: IconInterface = JSON.parse(JSON.stringify(DefaultIcon));
managementIcon.classCss = 'bi bi-clipboard';

const getBackIcon: IconInterface = JSON.parse(JSON.stringify(DefaultIcon));
getBackIcon.classCss = 'bi bi-arrow-repeat';

export const ConstantsTaIc = {
  managementIcon,
  deleteIcon,
  getBackIcon,
};
