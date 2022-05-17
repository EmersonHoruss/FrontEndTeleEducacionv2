import { Component, OnInit } from '@angular/core';
import { TitlePageInterface } from '../../../../shared/interfaces/title-page-interface';
import { DefaultTitlePage } from '../../../../shared/constants/default-title-page';

@Component({
  selector: 'app-main-project',
  templateUrl: './main-project.component.html',
  styleUrls: ['./main-project.component.scss'],
})
export class MainProjectComponent implements OnInit {
  titlePage: TitlePageInterface = JSON.parse(JSON.stringify(DefaultTitlePage));

  filters = [
    { Codigo: 0, Nombre: 'Nombre' },
    { Codigo: 1, Nombre: 'Autores' },
  ];

  data = [];
  columns = ['Nombre', 'Autor(es)', 'Asesor', 'Jurado', 'Acciones'];
  noData = 'Sin proyectos por mostrar.';

  constructor() {
    this.settingTitlePage();
  }

  ngOnInit(): void {}

  settingTitlePage() {
    this.titlePage.titlePage = 'Mantenimientos de Proyectos';
  }

  addNew() {}
}
