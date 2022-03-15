import { TableSelectFilterInterface } from "../interfaces/table-select-filter-interface";
import { DefaultButton } from "./default-button";


export const DefaultTableSelectFilter: TableSelectFilterInterface = {
  searchLabel : 'Default Search Label',
  searchPlaceHolder: 'Default Search Place Holder',
  buttonList : JSON.parse(JSON.stringify(DefaultButton)),
  tableTitle : 'Default Table Title',
  columns: ['Nombre Profesor','Correo Profesor','Numero Profesor','Fecha de Inicio','Fecha de Fin','Estado','Acciones'],
  buttonsActions : [JSON.parse(JSON.stringify(DefaultButton)),JSON.parse(JSON.stringify(DefaultButton)),JSON.parse(JSON.stringify(DefaultButton)),JSON.parse(JSON.stringify(DefaultButton)),JSON.parse(JSON.stringify(DefaultButton))],
  dataSource : [
    { 'Nombre Profesor': 'Juan Peralta Rojas', 'Correo Profesor': 'jprojas@unprg.edu.pe', 'Numero Profesor' : '987654321', 'Fecha de Inicio': '18-02-2022','Fecha de Fin': '19-02-2022', Estado : 'Pendiente',Acciones: 'true' },
    { 'Nombre Profesor': 'Pedro Cabrejos Rojas', 'Correo Profesor': 'pcrojas@unprg.edu.pe', 'Numero Profesor' : '982357621', 'Fecha de Inicio': '21-02-20','Fecha de Fin': '22-02-2022', Estado : 'Pendiente',Acciones: 'true' },
    { 'Nombre Profesor': 'Luis Otake Malca', 'Correo Profesor': 'lomalca@unprg.edu.pe', 'Numero Profesor' : '9324321', 'Fecha de Inicio': '24-02-20','Fecha de Fin' : '25-02-2022', Estado : 'Disponible',Acciones: 'true' },
    { 'Nombre Profesor': 'Mateo Riojas Díaz', 'Correo Profesor': 'mrdiaz@unprg.edu.pe', 'Numero Profesor' : '98642321', 'Fecha de Inicio': '28-02-20','Fecha de Fin': '01-03-2022', Estado : 'Pendiente',Acciones: 'true' },
  //{ 'Nombre Profesor': 'Juan Peralta Rojas', 'Correo Profesor': 'jprojas@unprg.edu.pe', 'Numero Profesor' : '987654321', Sesiones: 'Sesion 1', Estado : 'Pendiente' },
    //{ 'Nombre Profesor': 'Juan Peralta Rojas', 'Correo Profesor': 'jprojas@unprg.edu.pe', 'Numero Profesor' : '987654321', Sesiones: 'Sesion 1', Estado : 'Pendiente' },
    //{ 'Nombre Profesor': 'Juan Peralta Rojas', 'Correo Profesor': 'jprojas@unprg.edu.pe', 'Numero Profesor' : '987654321', Sesiones: 'Sesion 1', Estado : 'Pendiente' },
    //{ 'Nombre Profesor': 'Juan Peralta Rojas', 'Correo Profesor': 'jprojas@unprg.edu.pe', 'Numero Profesor' : '987654321', Sesiones: 'Sesion 1', Estado : 'Pendiente' },
    //{ 'Nombre Profesor': 'Juan Peralta Rojas', 'Correo Profesor': 'jprojas@unprg.edu.pe', 'Numero Profesor' : '987654321', Sesiones: 'Sesion 1', Estado : 'Pendiente' },
    //{ 'Nombre Profesor': 'Juan Peralta Rojas', 'Correo Profesor': 'jprojas@unprg.edu.pe', 'Numero Profesor' : '987654321', Sesiones: 'Sesion 1', Estado : 'Pendiente' }
  ],
  ngStyle: '',
};
