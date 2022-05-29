import { DefaultTableSelectFilter } from "src/app/shared/constants/default-table-select-filter";
import { TableSelectFilterInterface } from "src/app/shared/interfaces/table-select-filter-interface";
import { ConstantsTaBu } from "./table-buttons.constants";
import { ConstantsTaDa } from "./table-data.constants";

const buttons = ConstantsTaBu;
const data    = ConstantsTaDa;

const table: TableSelectFilterInterface = JSON.parse(JSON.stringify(DefaultTableSelectFilter));
  table.complete = false;
  table.tableTitle = 'Sesiones';
  table.columns = data.columns;
  table.dataSource = data.dataSource;
  table.buttonsActions = [
    buttons.updateButton,
    buttons.deleteButton,
    buttons.saveButton,
  ];

export const ConstantsTaGe = {
    table
};
