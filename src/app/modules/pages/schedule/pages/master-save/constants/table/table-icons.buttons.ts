import { DefaultIcon } from "src/app/modules/shared/constants/default-icon";
import { IconInterface } from "src/app/modules/shared/interfaces/icon-interface";

const updateIcon: IconInterface = JSON.parse(JSON.stringify(DefaultIcon));
updateIcon.classCss = 'bi bi-pencil-square';

const deleteIcon: IconInterface = JSON.parse(JSON.stringify(DefaultIcon));
deleteIcon.classCss = 'bi bi-trash';


const saveIcon: IconInterface = JSON.parse(JSON.stringify(DefaultIcon));
saveIcon.classCss = 'bi bi-save';

export const ConstantsTaIc = {
    updateIcon,
    deleteIcon,
    saveIcon,
  };