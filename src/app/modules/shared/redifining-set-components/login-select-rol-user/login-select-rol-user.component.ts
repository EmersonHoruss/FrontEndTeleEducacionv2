import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-login-select-rol-user',
  templateUrl: './login-select-rol-user.component.html',
  styleUrls: ['./login-select-rol-user.component.scss'],
})
export class LoginSelectRolUserComponent implements OnInit {
  roles = [
    { Codigo: 'T', Nombre: 'TeleEducacion' },
    { Codigo: 'C', Nombre: 'Coordinador' },
    { Codigo: 'S', Nombre: 'Secretaria' },
  ];
  @Output() rolSeleccionado = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  selectedRol($codigoRol: any) {
    this.rolSeleccionado.emit($codigoRol);
  }
}
