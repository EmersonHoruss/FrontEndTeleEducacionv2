import { ConstantsTaGe } from './constants/table/table-general.constants';
import { Constants } from './master-main.constants';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-exam-main',
  templateUrl: './exam-main.component.html',
  styleUrls: ['./exam-main.component.scss'],
})
export class ExamMainComponent implements OnInit {
  //INICIO: VARIABLES CON CONFIGURACIÓN PERSONALIZADA
  constants = Constants;
  //FIN: VARIABLES CON CONFIGURACIÓN PERSONALIZADA

  // INICIO: VARIABLES CON COMUNICACION A INPUTS
  nameTable = 'Programaciones de examenes';
  columnsTable = [
    'Docente',
    'Correo',
    'Celular',
    'Fecha',
    'Hora de Inicio',
    'Hora de Fin',
    'Acciones',
  ];
  buttonActionsTable = ConstantsTaGe.table.buttonsActions;
  // FIN: VARIABLES CON COMUNICACION A INPUTS

  constructor() {}

  ngOnInit(): void {}
}
