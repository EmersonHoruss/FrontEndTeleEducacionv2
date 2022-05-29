import { DefaultIcon } from 'src/app/shared/constants/default-icon';
import { IconInterface } from 'src/app/shared/interfaces/icon-interface';

const updateIcon: IconInterface = JSON.parse(JSON.stringify(DefaultIcon));
updateIcon.classCss = 'bi bi-pencil-square';

const rescheduleIcon: IconInterface = JSON.parse(JSON.stringify(DefaultIcon));
rescheduleIcon.classCss = 'bi bi-bootstrap-reboot';

const dictateIcon: IconInterface = JSON.parse(JSON.stringify(DefaultIcon));
dictateIcon.classCss = 'bi bi-bookmark-check';

const saveIcon: IconInterface = JSON.parse(JSON.stringify(DefaultIcon));
saveIcon.classCss = 'bi bi-save';

const deleteIcon: IconInterface = JSON.parse(JSON.stringify(DefaultIcon));
deleteIcon.classCss = 'bi bi-trash';

const seeIcon: IconInterface = JSON.parse(JSON.stringify(DefaultIcon));
seeIcon.classCss = 'bi bi-eye';
export const ConstantsTaIc = {
  updateIcon,
  rescheduleIcon,
  dictateIcon,
  saveIcon,
  deleteIcon,
  seeIcon,
};
