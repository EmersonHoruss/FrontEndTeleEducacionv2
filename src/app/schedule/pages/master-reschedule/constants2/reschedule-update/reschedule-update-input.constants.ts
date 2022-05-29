import { DefaultInput } from "src/app/shared/constants/default-input";
import { InputInterface } from "src/app/shared/interfaces/input-interface";

const inputTitle: InputInterface = JSON.parse(JSON.stringify(DefaultInput));
  inputTitle.value = 'Reprogramar o modificar según sea el caso';
    
const inputReason: InputInterface = JSON.parse(JSON.stringify(DefaultInput));
inputReason.label = 'Motivo de Reprogramación ';
inputReason.placeholder = '';
inputReason.disabled = false;
inputReason.matFormStyle = {'margin-top':'1rem'};

export const ConstantsReUpIn = {    
    inputTitle,
    inputReason
};