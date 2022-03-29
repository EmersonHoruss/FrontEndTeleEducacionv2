import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ButtonInterface } from '../../interfaces/button-interface';
import { Constants } from './table-select-filte.constants';
import { Observable } from 'rxjs';
import { ModalsDialogService } from '../../../../services/modals-dialog/modals-dialog.service';
import { modalsDialog } from '../../constants/modals-dialog';
import { HttpClient } from '@angular/common/http';
import { ConstantsTaBu } from './table-buttons.constants';

@Component({
  selector: 'app-program-table',
  templateUrl: './program-table.component.html',
  styleUrls: ['./program-table.component.scss'],
})
export class ProgramTableComponent implements OnInit {
  @Input() columns: Array<string>;
  @Input() nameTable: string;
  @Input() buttons: Array<ButtonInterface>;
  @Input() curso: any = null;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constantsBu = ConstantsTaBu;

  // START: LOCAL VARIABLES
  constants = Constants;
  startDate = '';
  endDate = '';
  data = [];
  noData = 'Sin programaciones por mostrar.';
  // END: LOCAL VARIABLES

  constructor(
    private dialogService: ModalsDialogService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {}

  selectedStartDateEE($event: any) {
    this.startDate = $event;
  }

  selectedEndDateEE($event: any) {
    this.endDate = $event;
  }

  clickedListBtn($event: any) {
    // console.log(this.startDate, this.endDate);
    // console.log(new Date(this.startDate) <= new Date(this.endDate));
    this.canLoadDDataTable()
      ? this.loadDataTable()
      : this.openErrorModalListBtn();
  }

  canLoadDDataTable(): boolean {
    return (
      this.curso !== null &&
      this.endDate !== '' &&
      this.startDate !== '' &&
      new Date(this.startDate) <= new Date(this.endDate)
    );
  }

  loadDataTable() {
    this.data = [];
    this.noData = 'Cargando programaciones de cursos...';
    this.http
      .get(
        `/api/ProgramacionesCurso/${this.curso.Codigo}/${this.startDate}/${this.endDate}`
      )
      .subscribe(
        (e: any) => {
          console.log(e);
          const data = e.data;
          data.length === 0
            ? (this.noData = 'Sin programaciones por mostrar.')
            : (this.data = this.tranformDataToShowInTable(data));
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  openErrorModalListBtn() {
    const modalError = modalsDialog.error;
    const msgErrorNoCurso = 'Seleccione curso.';
    const msgErrorNoDates = 'Seleccione ambas fechas.';
    const msgErrorDates =
      'Fecha de inicio debe ser menor o igual a la fecha de fin.';

    this.curso === null
      ? (modalError.description = msgErrorNoCurso)
      : this.endDate === '' || this.startDate === ''
      ? (modalError.description = msgErrorNoDates)
      : !(new Date(this.startDate) <= new Date(this.endDate))
      ? (modalError.description = msgErrorDates)
      : '';

    this.dialogService.openModalDialog(modalError);
  }

  tranformDataToShowInTable(data: any) {
    const dataDuplicated = JSON.parse(JSON.stringify(data));
    for (const key in data) {
      const dataDuplicatedKey = dataDuplicated[key];
      const dataKey = data[key];

      dataDuplicatedKey.Profesor =
        dataKey.Nombre +
        ' ' +
        dataKey.ApellidoPaterno +
        ' ' +
        dataKey.ApellidoMaterno;

      dataDuplicatedKey.Correo = dataKey.CorreoInstitucional
        ? dataKey.CorreoInstitucional
        : dataKey.CorreoPersonal;

      dataDuplicatedKey['Fecha de Inicio'] = dataKey.FechaInicio;
      dataDuplicatedKey['Fecha de Fin'] = dataKey.FechaFin;
      dataDuplicatedKey['Acciones'] = 'true';
    }
    return dataDuplicated;
  }
}
