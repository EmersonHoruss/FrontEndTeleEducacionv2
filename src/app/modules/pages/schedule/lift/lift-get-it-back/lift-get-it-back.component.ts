import { Component, OnInit } from '@angular/core';
import { Constants } from './master-main.constants';

@Component({
  selector: 'app-lift-get-it-back',
  templateUrl: './lift-get-it-back.component.html',
  styleUrls: ['./lift-get-it-back.component.scss'],
})
export class LiftGetItBackComponent implements OnInit {
  //INICIO: VARIABLES CON CONFIGURACIÓN PERSONALIZADA
  constants = Constants;
  //FIN: VARIABLES CON CONFIGURACIÓN PERSONALIZADA
  
  constructor() {}

  ngOnInit(): void {}
}
