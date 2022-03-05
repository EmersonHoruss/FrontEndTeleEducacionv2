import { Component, OnInit } from '@angular/core';
import { ButtonInterface } from '../../../../shared/interfaces/button-interface';

@Component({
  selector: 'app-master-main',
  templateUrl: './master-main.component.html',
  styleUrls: ['./master-main.component.scss'],
})
export class MasterMainComponent implements OnInit {
  constructor() {}
  ngOnInit(): void {}

  selectedFacultad: string = '';
  selectedMaestria: string = '';
  selectedCurricula: string = '';
  selectedCurso: string = '';

  facultades = [
    { value: 0, viewValue: 'FACFYM' },
    { value: 1, viewValue: 'FIME' },
    { value: 2, viewValue: 'FICSA' },
  ];
  maestrias = [
    {
      value: 0,
      viewValue: 'Ciencias matemáticas aplicadas a la tecnología',
    },
    { value: 1, viewValue: 'Ciencias determinísticas' },
    {
      value: 2,
      viewValue: 'Ciencias matemáticas aplicadas a la biotecnología',
    },
  ];
  curricula = [
    { value: 0, viewValue: '2010-I' },
    { value: 1, viewValue: '2015-II' },
    { value: 2, viewValue: '20220-I' },
  ];
  cursos = [
    { value: 0, viewValue: 'Teoría de tesis I' },
    { value: 1, viewValue: 'Teoría de tesis II' },
    { value: 2, viewValue: 'Teoría de tesis III' },
  ];
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = [
    {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
    {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
    {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
    
  ];
}
