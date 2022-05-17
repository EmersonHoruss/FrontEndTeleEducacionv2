import { Component, OnInit, ViewChild } from '@angular/core';
import { ConstantsTaBu } from './table-buttons.constants';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-project-main-content',
  templateUrl: './project-main-content.component.html',
  styleUrls: ['./project-main-content.component.scss'],
})
export class ProjectMainContentComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  data: any = [];
  dataHelp: any = [];
  columns: any = ['Nombre', 'Autores', 'Asesor', 'Jurado', 'Acciones'];
  noData = 'Sin proyectos por mostrar.';

  constantsBu = ConstantsTaBu;
  selectTimeFilters = [
    { Codigo: 0, Valor: 'Mes actual' },
    { Codigo: 1, Valor: 'Trimestre actual' },
    { Codigo: 2, Valor: 'Intérvalos de Fechas' },
  ];

  FilterForm = this.fb.group({
    selectTime: [],
    startDate: [],
    endDate: [],
  });
  
  constructor(private fb: FormBuilder) {
    this.data = new MatTableDataSource(this.dataHelp);
  }

  ngOnInit(): void {}

  addNew() {}
}
