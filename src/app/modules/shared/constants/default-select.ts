import { SelectInterface } from '../interfaces/select-interface';

export const DefaultSelect: SelectInterface = {
  label: 'Default Label',
  viewValue: 'name',
  itemValue: 'id',
  items: [
    { id: 1, name: 'Default Item1' },
    { id: 2, name: 'Default Item2' },
    { id: 3, name: 'Default Item3' },
  ],
  enableDefaultSelectedItem: true,
  disableOptionCentering: true,
  defaultSelectedValue: '',
  ngStyle: '',
};

// form-control-sm
