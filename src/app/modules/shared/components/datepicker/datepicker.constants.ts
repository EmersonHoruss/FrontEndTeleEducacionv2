import { InputInterface } from '../../interfaces/input-interface';
import { DefaultInput } from '../../constants/default-input';
import { DefaultDate } from '../../constants/default-date';
import { DateInterface } from '../../interfaces/date-interface';

// Defining
const inputStart: InputInterface = JSON.parse(JSON.stringify(DefaultInput));
const dateStart: DateInterface = JSON.parse(JSON.stringify(DefaultDate));

const inputEnd: InputInterface = JSON.parse(JSON.stringify(DefaultInput));
const dateEnd: DateInterface = JSON.parse(JSON.stringify(DefaultDate));

// Setting
inputStart.label = 'Default:';

dateStart.label = 'Default';

inputEnd.label = 'Default:';

dateEnd.label = 'Default';

export const Constants = {
  inputStart,
  dateStart,
  inputEnd,
  dateEnd,
};
