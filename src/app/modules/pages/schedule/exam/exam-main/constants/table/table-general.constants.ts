import { DefaultTableSelectFilter } from 'src/app/modules/shared/constants/default-table-select-filter';
import { TableSelectFilterInterface } from 'src/app/modules/shared/interfaces/table-select-filter-interface';
import { ConstantsTaBu } from './table-buttons.constants';
import { ConstantsTaDa } from './table-data.constants';

const buttons = ConstantsTaBu;
const data = ConstantsTaDa;

const table: TableSelectFilterInterface = JSON.parse(
  JSON.stringify(DefaultTableSelectFilter)
);
table.searchLabel = 'Busqueda';
table.searchPlaceHolder = 'Buscar por...';
table.buttonList = buttons.listButton;
table.tableTitle = 'Programaciones de los cursos de la maestría';
table.columns = data.columns;
table.dataSource = data.dataSource;
table.buttonsActions = [
  buttons.updateButton,
  buttons.deleteButton,
  buttons.seeButton,
  buttons.saveButton,
  buttons.rescheduleButton,
];

export const ConstantsTaGe = {
  table,
};
