export interface InputInterface {
  type: string;
  class: string;
  placeholder: string;
  ariaLabel?: string;
  label ?: string;
  ariaDescribedby?: string;
  disabled: boolean;
  value?: string | number;
}
