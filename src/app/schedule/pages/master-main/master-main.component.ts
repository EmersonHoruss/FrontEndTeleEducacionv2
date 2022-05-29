import { Component, OnInit } from '@angular/core';
import { Constants } from './master-main.constants';
import { ConstantsTaGe } from './constants/table/table-general.constants';

@Component({
  selector: 'app-master-main',
  templateUrl: './master-main.component.html',
  styleUrls: ['./master-main.component.scss'],
})
export class MasterMainComponent implements OnInit {
  //INICIO: VARIABLES CON CONFIGURACIÓN PERSONALIZADA
  constants = Constants;
  //FIN: VARIABLES CON CONFIGURACIÓN PERSONALIZADA

  // INICIO: VARIABLES CON COMUNICACION A INPUTS
  nameTable = 'Programaciones curso';
  columnsTable = [
    'Profesor',
    'Correo',
    'Celular',
    'Fecha de Inicio',
    'Fecha de Fin',
    'Acciones',
  ];
  buttonActionsTable = ConstantsTaGe.table.buttonsActions;
  // FIN: VARIABLES CON COMUNICACION A INPUTS

  constructor() {}

  ngOnInit(): void {}
}
