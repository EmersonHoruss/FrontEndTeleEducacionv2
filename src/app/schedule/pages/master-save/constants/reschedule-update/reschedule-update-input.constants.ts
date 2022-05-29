import { DefaultInput } from "src/app/shared/constants/default-input";
import { InputInterface } from "src/app/shared/interfaces/input-interface";

const inputTitle: InputInterface = JSON.parse(JSON.stringify(DefaultInput));
  inputTitle.value = 'Reprogramar o modificar según sea el caso';
    
export const ConstantsReUpIn = {    
    inputTitle
};