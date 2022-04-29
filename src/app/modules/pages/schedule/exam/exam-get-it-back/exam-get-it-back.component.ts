import { Component, OnInit } from '@angular/core';
import { Constants } from './master-main.constants';

@Component({
  selector: 'app-exam-get-it-back',
  templateUrl: './exam-get-it-back.component.html',
  styleUrls: ['./exam-get-it-back.component.scss'],
})
export class ExamGetItBackComponent implements OnInit {
  //INICIO: VARIABLES CON CONFIGURACIÓN PERSONALIZADA
  constants = Constants;
  //FIN: VARIABLES CON CONFIGURACIÓN PERSONALIZADA

  constructor() {}

  ngOnInit(): void {}
}
