import { DefaultButton } from '../constants/default-button';
import { ButtonInterface } from '../interfaces/button-interface';

export class ButtonClass {
  button: ButtonInterface;
  constructor() {
    this.button = DefaultButton;
  }

  get(): ButtonInterface {
    return this.button;
  }
}
