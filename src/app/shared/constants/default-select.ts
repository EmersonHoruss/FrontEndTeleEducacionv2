import { SelectInterface } from '../interfaces/select-interface';

export const DefaultSelect: SelectInterface = {
  label: 'Default Label',
  viewValue: 'Nombre',
  itemValue: 'Codigo',
  items: [
    { id: 1, Codigo: 1, Nombre: 'Default Item1' },
    { id: 2, Codigo: 2, Nombre: 'Default Item2' },
    { id: 3, Codigo: 3, Nombre: 'Default Item3' },
  ],
  enableDefaultSelectedItem: true,
  disableOptionCentering: true,
  defaultSelectedValue: '',
  ngStyle: '',
  isAsync: false,
  optionsToDisable: [],
};

// form-control-sm
