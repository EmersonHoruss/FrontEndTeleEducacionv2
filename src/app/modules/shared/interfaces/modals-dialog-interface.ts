import { IconInterface } from "./icon-interface";

export interface ModalsDialogInterface {
  type: string;
  icon: string;
  title: string;
  description?: string;
  nameOkButton?: string;
  nameNoOKButton?: string;
  iconEntity: IconInterface;
}

//   warning: 'warning',
//   error: 'error',
//   confirm: 'confirm',
//   load: 'load',
