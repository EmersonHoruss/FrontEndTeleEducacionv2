export interface InputInterface {
  type: string;
  class: string;
  placeholder: string;
  ariaLabel?: string;
  ariaDescribedby?: string;
  disabled: boolean;
  value?: string | number;
}
