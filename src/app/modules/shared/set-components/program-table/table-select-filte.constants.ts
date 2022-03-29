import { InputInterface } from '../../interfaces/input-interface';
import { DefaultInput } from '../../constants/default-input';
import { DefaultDate } from '../../constants/default-date';
import { DateInterface } from '../../interfaces/date-interface';
import { ButtonInterface } from '../../interfaces/button-interface';
import { DefaultButton } from '../../constants/default-button';

// Defining
const inputStart: InputInterface = JSON.parse(JSON.stringify(DefaultInput));
const dateStart: DateInterface = JSON.parse(JSON.stringify(DefaultDate));

const inputEnd: InputInterface = JSON.parse(JSON.stringify(DefaultInput));
const dateEnd: DateInterface = JSON.parse(JSON.stringify(DefaultDate));

const buttonList: ButtonInterface = JSON.parse(JSON.stringify(DefaultButton));

// Setting
inputStart.label = 'Desde:';
dateStart.label = 'Fecha de inicio';

inputEnd.label = 'Hasta:';
dateEnd.label = 'Fecha de fin';

buttonList.text = 'Listar';






export const Constants = {
  inputStart,
  dateStart,
  inputEnd,
  dateEnd,
  buttonList,
};
