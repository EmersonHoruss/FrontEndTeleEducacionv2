import { Component, OnInit } from '@angular/core';
import { Constants } from './master-main.constants';

@Component({
  selector: 'app-lift-main',
  templateUrl: './lift-main.component.html',
  styleUrls: ['./lift-main.component.scss'],
})
export class LiftMainComponent implements OnInit {
  //INICIO: VARIABLES CON CONFIGURACIÓN PERSONALIZADA
  constants = Constants;
  //FIN: VARIABLES CON CONFIGURACIÓN PERSONALIZADA

  constructor() {}

  ngOnInit(): void {}
}
