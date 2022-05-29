import { DefaultIcon } from "src/app/shared/constants/default-icon";
import { IconInterface } from "src/app/shared/interfaces/icon-interface";

const updateIcon: IconInterface = JSON.parse(JSON.stringify(DefaultIcon));
updateIcon.classCss = 'bi bi-pencil-square';

const deleteIcon: IconInterface = JSON.parse(JSON.stringify(DefaultIcon));
deleteIcon.classCss = 'bi bi-trash';


const rescheduleIcon: IconInterface = JSON.parse(JSON.stringify(DefaultIcon));
rescheduleIcon.classCss = 'bi bi-bootstrap-reboot';

export const ConstantsTaIc = {
    updateIcon,
    deleteIcon,
    rescheduleIcon,
  };