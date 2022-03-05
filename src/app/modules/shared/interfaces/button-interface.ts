import { IconInterface } from './icon-interface';

export interface ButtonInterface {
  icon: IconInterface;
  text: string;
  url: string;
  style?: any;
  class: string;
}
