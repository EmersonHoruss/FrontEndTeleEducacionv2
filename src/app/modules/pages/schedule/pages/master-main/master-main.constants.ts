import { DefaultButton } from 'src/app/modules/shared/constants/default-button';
import { DefaultIcon } from 'src/app/modules/shared/constants/default-icon';
import { DefaultInput } from 'src/app/modules/shared/constants/default-input';
import { DefaultSelect } from 'src/app/modules/shared/constants/default-select';
import { DefaultTableSelectFilter } from 'src/app/modules/shared/constants/default-table-select-filter';
import { DefaultTitlePage } from 'src/app/modules/shared/constants/default-title-page';
import { ButtonInterface } from 'src/app/modules/shared/interfaces/button-interface';
import { IconInterface } from 'src/app/modules/shared/interfaces/icon-interface';
import { InputInterface } from 'src/app/modules/shared/interfaces/input-interface';
import { SelectInterface } from 'src/app/modules/shared/interfaces/select-interface';
import { TableSelectFilterInterface } from 'src/app/modules/shared/interfaces/table-select-filter-interface';
import { TitlePageInterface } from 'src/app/modules/shared/interfaces/title-page-interface';
import { ConstantsTaGe } from './constants/table/table-general.constants';

const titlePage: TitlePageInterface = JSON.parse(
  JSON.stringify(DefaultTitlePage)
);
titlePage.titlePage = 'Programaciones de Cursos';

const inputNombreCoordinador: InputInterface = JSON.parse(
  JSON.stringify(DefaultInput)
);
inputNombreCoordinador.value = 'Emerson Perales Villanueva';
inputNombreCoordinador.label = 'Coordinador: ';

const inputCorreoCoordinador: InputInterface = JSON.parse(
  JSON.stringify(DefaultInput)
);
inputCorreoCoordinador.value = 'dperalesv@unprg.edu.pe';
inputCorreoCoordinador.label = 'Correo: ';

const buttonRegistar: ButtonInterface = JSON.parse(
  JSON.stringify(DefaultButton)
);
buttonRegistar.text = 'Registrar';
buttonRegistar.url = 'registrar';

const facultades: SelectInterface = JSON.parse(JSON.stringify(DefaultSelect));
facultades.itemValue = 'Codigo';
facultades.viewValue = 'Siglas';
facultades.label = 'Facultades';
facultades.isAsync = true;

const maestrias: SelectInterface = JSON.parse(JSON.stringify(DefaultSelect));
maestrias.itemValue = 'Codigo';
maestrias.viewValue = 'Nombre';
maestrias.label = 'Maestrias';
maestrias.isAsync = true;

const curriculas: SelectInterface = JSON.parse(JSON.stringify(DefaultSelect));
curriculas.itemValue = 'Codigo';
curriculas.viewValue = 'Nombre';
curriculas.label = 'Curricula';
curriculas.isAsync = true;

const cursos: SelectInterface = JSON.parse(JSON.stringify(DefaultSelect));
cursos.itemValue = 'Codigo';
cursos.viewValue = 'Nombre';
cursos.label = 'Curso';
cursos.isAsync = true;

// Botones de las Acciones
const updateIcon: IconInterface = JSON.parse(JSON.stringify(DefaultIcon));
updateIcon.classCss = 'bi bi-pencil-square';
const updateButton: ButtonInterface = JSON.parse(JSON.stringify(DefaultButton));
updateButton.tooltipText = 'Modificar';
updateButton.icon = updateIcon;
updateButton.style = "'{'border-radius': '50%' !important}'";
updateButton.style = { 'border-radius': '50%' };

const deleteIcon: IconInterface = JSON.parse(JSON.stringify(DefaultIcon));
deleteIcon.classCss = 'bi bi-trash';
const deleteButton: ButtonInterface = JSON.parse(JSON.stringify(DefaultButton));
deleteButton.tooltipText = 'Eliminar';
deleteButton.icon = deleteIcon;
deleteButton.style = { 'border-radius': '50%' };

const seeIcon: IconInterface = JSON.parse(JSON.stringify(DefaultIcon));
seeIcon.classCss = 'bi bi-eye';
const seeButton: ButtonInterface = JSON.parse(JSON.stringify(DefaultButton));
seeButton.tooltipText = 'Ver';
seeButton.icon = seeIcon;
seeButton.style = { 'border-radius': '50%' };

const saveIcon: IconInterface = JSON.parse(JSON.stringify(DefaultIcon));
saveIcon.classCss = 'bi bi-save';
const saveButton: ButtonInterface = JSON.parse(JSON.stringify(DefaultButton));
saveButton.tooltipText = 'Guardar Sesión';
saveButton.icon = saveIcon;
saveButton.style = { 'border-radius': '50%' };

const rescheduleIcon: IconInterface = JSON.parse(JSON.stringify(DefaultIcon));
rescheduleIcon.classCss = 'bi bi-bootstrap-reboot';
const rescheduleButton: ButtonInterface = JSON.parse(
  JSON.stringify(DefaultButton)
);
rescheduleButton.tooltipText = 'Reprogramar';
rescheduleButton.icon = rescheduleIcon;
rescheduleButton.style = { 'border-radius': '50%' };

const listButton: ButtonInterface = JSON.parse(JSON.stringify(DefaultButton));
listButton.text = 'Listar';

const table: TableSelectFilterInterface = JSON.parse(
  JSON.stringify(DefaultTableSelectFilter)
);
table.searchLabel = 'Busqueda';
table.searchPlaceHolder = 'Buscar por...';
table.buttonList = listButton;
table.tableTitle = 'Programaciones de los cursos de la maestría';

table.buttonsActions = [
  updateButton,
  deleteButton,
  seeButton,
  saveButton,
  rescheduleButton,
];

export const Constants = {
  titlePage,
  inputNombreCoordinador,
  inputCorreoCoordinador,
  facultades,
  maestrias,
  curriculas,
  cursos,
  buttonRegistar,
  table: ConstantsTaGe.table,
};
