import { DefaultInput } from 'src/app/modules/shared/constants/default-input';
import { DefaultSelect } from 'src/app/modules/shared/constants/default-select';
import { InputInterface } from 'src/app/modules/shared/interfaces/input-interface';
import { SelectInterface } from 'src/app/modules/shared/interfaces/select-interface';

const displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
const dataSource = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
];

const inputLabelCoordinador: InputInterface = JSON.parse(
  JSON.stringify(DefaultInput)
);
inputLabelCoordinador.placeholder = 'Coordinador a cargo:';

const inputCoordinador: InputInterface = JSON.parse(
  JSON.stringify(DefaultInput)
);
inputCoordinador.placeholder = 'David Elmas Kbrazo';

const facultades: SelectInterface = JSON.parse(JSON.stringify(DefaultSelect));
facultades.itemValue = 'Codigo';
facultades.viewValue = 'Siglas';
facultades.label = 'Facultades';
facultades.isAsync = true;

export const Constants = {
  inputLabelCoordinador,
  inputCoordinador,
  facultades,
};
