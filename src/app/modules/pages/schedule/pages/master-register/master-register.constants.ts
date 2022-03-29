import { InputInterface } from '../../../../shared/interfaces/input-interface';
import { DefaultInput } from '../../../../shared/constants/default-input';
import { SelectInterface } from '../../../../shared/interfaces/select-interface';
import { DefaultSelect } from 'src/app/modules/shared/constants/default-select';
import { ButtonInterface } from '../../../../shared/interfaces/button-interface';
import { DefaultButton } from '../../../../shared/constants/default-button';

// ***** DEFINITIONS *****
// INPUTS
const inputMaster: InputInterface = JSON.parse(JSON.stringify(DefaultInput));
const inputCourse: InputInterface = JSON.parse(JSON.stringify(DefaultInput));
const inputFullNameCoordinator: InputInterface = JSON.parse(
  JSON.stringify(DefaultInput)
);
const inputEmailCoordinator: InputInterface = JSON.parse(
  JSON.stringify(DefaultInput)
);
const inputLinkTeleEducation: InputInterface = JSON.parse(
  JSON.stringify(DefaultInput)
);
const inputLinkTeacher: InputInterface = JSON.parse(
  JSON.stringify(DefaultInput)
);

// SELECTS
const selectTypeMaster: SelectInterface = JSON.parse(
  JSON.stringify(DefaultSelect)
);
const selectTeacher: SelectInterface = JSON.parse(
  JSON.stringify(DefaultSelect)
);

// BUTTONS
const buttonRegister: ButtonInterface = JSON.parse(
  JSON.stringify(DefaultButton)
);

const buttonCancel: ButtonInterface = JSON.parse(JSON.stringify(DefaultButton));

const buttonManagementStudents: ButtonInterface = JSON.parse(
  JSON.stringify(DefaultButton)
);

const buttonAdd: ButtonInterface = JSON.parse(JSON.stringify(DefaultButton));

// ***** CONFIGURATION *****
// INPUTS
inputMaster.placeholder = 'Ingrese maestría';
inputMaster.disabled = true;
inputMaster.value = localStorage.getItem('master')?.toString();
inputMaster.label = 'Maestría';

inputCourse.placeholder = 'Ingrese curso';
inputCourse.disabled = true;
inputCourse.value = localStorage.getItem('course')?.toString();
inputCourse.label = 'Curso';

inputFullNameCoordinator.placeholder = 'Ingrese nombre coordinador';
inputFullNameCoordinator.disabled = true;
inputFullNameCoordinator.value = localStorage
  .getItem('NameCoordinator')
  ?.toString();
inputFullNameCoordinator.label = 'Nombre coordinador';

inputEmailCoordinator.placeholder = 'Ingrese correo coordinador';
inputEmailCoordinator.disabled = true;
inputEmailCoordinator.value = localStorage
  .getItem('EmailCoordinator')
  ?.toString();
inputEmailCoordinator.label = 'Correo coordinador';

inputLinkTeleEducation.placeholder =
  'Ingrese link clases otorgado por TeleEducación';
inputLinkTeleEducation.disabled = false;
inputLinkTeleEducation.value = '';
inputLinkTeleEducation.label = 'Link TeleEducación';

inputLinkTeacher.placeholder = 'Ingrese link clases otorgado por profesor';
inputLinkTeacher.disabled = false;
inputLinkTeacher.value = '';
inputLinkTeacher.label = 'Link profesor';

// SELECT
selectTypeMaster.label = 'Tipo de Programación';
selectTypeMaster.isAsync = true;

selectTeacher.label = 'Docente';
selectTeacher.isAsync = true;

// BUTTON
buttonRegister.text = 'Registrar';

buttonCancel.text = 'Cancelar';
buttonCancel.url = '../';

buttonManagementStudents.text = 'Gestionar Alumnos';

buttonAdd.text = 'Agregar';
buttonAdd.style = { height: '100%', width: '10rem' };

// ***** EXPORTING *****
export const Constants = {
  inputMaster,
  inputCourse,
  inputFullNameCoordinator,
  inputEmailCoordinator,
  inputLinkTeleEducation,
  inputLinkTeacher,
  selectTypeMaster,
  selectTeacher,
  buttonRegister,
  buttonCancel,
  buttonManagementStudents,
  buttonAdd,
};
