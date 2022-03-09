import { TableSelectFilterInterface } from "../interfaces/table-select-filter-interface";


export const DefaultTableSelectFilter: TableSelectFilterInterface = {
  searchLabel : 'Default Search Label',
  searchPlaceHolder: 'Default Search Place Holder',
  columns: ['Id', 'Column 2', 'Column 3'],
  dataSource: [
    { Id: 1, 'Column 2': '1Default Column 2', 'Column 3' : '1Default Column 3' },
    { Id: 2, 'Column 2': '2Default Column 2', 'Column 3' : '2Default Column 3' },
    { Id: 3, 'Column 2': '3Default Column 2', 'Column 3' : '3Default Column 3' },
  ],
  ngStyle: '',
};
