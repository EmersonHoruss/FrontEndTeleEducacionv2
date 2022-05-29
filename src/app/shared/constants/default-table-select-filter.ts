import { TableSelectFilterInterface } from '../interfaces/table-select-filter-interface';
import { DefaultButton } from './default-button';

export const DefaultTableSelectFilter: TableSelectFilterInterface = {
  searchLabel: 'Default Search Label',
  searchPlaceHolder: 'Default Search Place Holder',
  buttonList: JSON.parse(JSON.stringify(DefaultButton)),
  tableTitle: 'Default Table Title',
  columns: [],
  buttonsActions: [
    JSON.parse(JSON.stringify(DefaultButton)),
    JSON.parse(JSON.stringify(DefaultButton)),
    JSON.parse(JSON.stringify(DefaultButton)),
    JSON.parse(JSON.stringify(DefaultButton)),
    JSON.parse(JSON.stringify(DefaultButton)),
  ],
  dataSource: [],
  ngStyle: '',
  complete: true,
};
