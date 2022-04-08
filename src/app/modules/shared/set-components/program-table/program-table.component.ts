import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ButtonInterface } from '../../interfaces/button-interface';
import { Constants } from './table-select-filte.constants';
import { Observable } from 'rxjs';
import { ModalsDialogService } from '../../../../services/modals-dialog/modals-dialog.service';
import { modalsDialog } from '../../constants/modals-dialog';
import { HttpClient } from '@angular/common/http';
import { ConstantsTaBu } from './table-buttons.constants';
import { Router } from '@angular/router';

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
    private http: HttpClient,
    private router: Router
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
          // console.log(e);
          const data = e.data;
          data.length === 0
            ? (this.noData = 'Sin programaciones por mostrar.')
            : (this.data = this.tranformDataToShowInTable(data));
        },
        (error: any) => {
          // console.log(error);
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

  innerButtonTableClicked(buttonIndexTable: any, programation: any) {
    // console.log(buttonIndexTable, programation);
    buttonIndexTable === 0
      ? this.updateProgramation(programation)
      : buttonIndexTable === 1
      ? this.deleteProgramation(programation)
      : buttonIndexTable === 2
      ? this.saveSesionProgramation(programation)
      : buttonIndexTable === 3
      ? this.reescheduleProgramation(programation)
      : null;
  }

  updateProgramation(programation: any) {
    this.dialogService.openModalDialog(modalsDialog.load, true);

    this.http
      .get(`/api/ProgramacionesSesiones/${programation.Codigo}`)
      .subscribe(
        (e: any) => {
          programation.Sesiones = e.data;
          localStorage.setItem('programation', JSON.stringify(programation));
          this.http.get('/api/DocentesVigentes').subscribe(
            (e2: any) => {
              localStorage.setItem('docentes', JSON.stringify(e2.data));
              this.dialogService.closeLastOpenedModalDialog();
              this.router.navigateByUrl('/programar/maestria/actualizar');
            },
            (err: any) => {
              this.dialogService.closeLastOpenedModalDialog();
              const errorDialog = modalsDialog.error;
              errorDialog.description = 'Ha surgido un error.';
              this.dialogService.openModalDialog(errorDialog);
            }
          );
        },
        (err: any) => {
          this.dialogService.closeLastOpenedModalDialog();
          const errorDialog = modalsDialog.error;
          errorDialog.description = 'Ha surgido un error.';
          this.dialogService.openModalDialog(errorDialog);
        }
      );
  }

  deleteProgramation(programation: any) {
    const indexItem = this.data.findIndex(
      (e: any) => e.Codigo === programation.Codigo
    );
    this.dialogService.openModalDialog(modalsDialog.load, true);
    this.http
      .patch(`/api/EliminarProgramacionesCurso/${programation.Codigo}`, {})
      .subscribe(
        (e: any) => {
          this.data.splice(indexItem, 1);
          this.data = JSON.parse(JSON.stringify(this.data));
          this.dialogService.closeLastOpenedModalDialog();
          const succesDialog = modalsDialog.success;
          succesDialog.description = 'Se ha eliminado correctamente.';
          this.dialogService.openModalDialog(succesDialog);
        },
        (err: any) => {
          this.dialogService.closeLastOpenedModalDialog();
          const errorDialo = modalsDialog.error;
          errorDialo.description = 'Ha surgido un error.';
          this.dialogService.openModalDialog(errorDialo);
        }
      );
  }

  saveSesionProgramation(programation: any) {
    console.log('saving');
  }

  reescheduleProgramation(programation: any) {
    console.log('reeschude');
  }
}
