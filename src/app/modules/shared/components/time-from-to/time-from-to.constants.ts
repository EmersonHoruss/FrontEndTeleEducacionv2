import { InputInterface } from '../../interfaces/input-interface';
import { DefaultInput } from '../../constants/default-input';

// Defining
const inputTextStart: InputInterface = JSON.parse(JSON.stringify(DefaultInput));
const inputTimeStart: InputInterface = JSON.parse(JSON.stringify(DefaultInput));

const inputTextEnd: InputInterface = JSON.parse(JSON.stringify(DefaultInput));
const inputTimeEnd: InputInterface = JSON.parse(JSON.stringify(DefaultInput));

// Setting
inputTextStart.label = 'Entre:';

inputTimeStart.type = 'time';
inputTimeStart.disabled = false;
inputTimeStart.label = 'Hora de inicio';

inputTextEnd.label = 'Y:';

inputTimeEnd.type = 'time';
inputTimeEnd.disabled = false;
inputTimeEnd.label = 'Hora de fin';

export const Constants = {
  inputTextStart,
  inputTimeStart,
  inputTextEnd,
  inputTimeEnd,
};
