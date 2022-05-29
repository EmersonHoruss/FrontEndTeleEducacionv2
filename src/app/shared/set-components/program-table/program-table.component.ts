import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ButtonInterface } from '../../interfaces/button-interface';
import { Constants } from './table-select-filte.constants';
import { modalsDialog } from '../../constants/modals-dialog';
import { HttpClient } from '@angular/common/http';
import { ConstantsTaBu } from './table-buttons.constants';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ModalsDialogService } from '../../../services/modals-dialog/modals-dialog.service';

@Component({
  selector: 'app-program-table',
  templateUrl: './program-table.component.html',
  styleUrls: ['./program-table.component.scss'],
})
export class ProgramTableComponent implements OnInit {
  @Input() columns: Array<string>;
  @Input() nameTable: string;
  @Input() buttons: Array<ButtonInterface>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constantsBu = ConstantsTaBu;

  // START: LOCAL VARIABLES
  constants = Constants;
  startDate = '';
  endDate = '';
  data = [];
  noData = 'Sin programaciones por mostrar.';
  formatoEntrada = 'YYYY/MM/DD';
  formatoSalida = 'DD/MM/YYYY';
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
    this.hasErrors('list').error
      ? this.showErrors('list')
      : this.loadSchedule();
  }

  clickedNewBtn() {
    this.hasErrors('new').error
      ? this.showErrors('new')
      : this.router.navigateByUrl('programaciones/curso/nuevo');
  }

  hasErrors(btn: string): any {
    if (btn === 'new') {
      return this.errorsSelectProgramCourse();
    } else if (btn === 'list') {
      const errorsSelectProgramCourse = this.errorsSelectProgramCourse();
      return errorsSelectProgramCourse.error
        ? errorsSelectProgramCourse
        : this.errorsDate();
    }
  }

  errorsSelectProgramCourse() {
    const selectsPCC: any = this.getSelectedPCC();

    if (selectsPCC.kindProgram) {
      if (selectsPCC.kindProgram === 'ID' && !selectsPCC.curricula)
        return { error: true, msg: 'Seleccione una currícula.' };
      else if (selectsPCC.kindProgram !== 'ID' && !selectsPCC.course)
        return { error: true, msg: 'Seleccione un curso.' };
      else return { error: false, msg: '' };
    }
    return { error: true, msg: 'Seleccione un tipo de programación.' };
  }

  errorsDate() {
    return !this.startDate || !this.endDate
      ? { error: true, msg: 'Seleccione fechas.' }
      : new Date(this.startDate) <= new Date(this.endDate)
      ? { error: false, msg: '' }
      : {
          error: true,
          msg: 'Fecha de inicio debe ser menor e igual que Fecha de fin',
        };
  }

  showErrors(btn: string) {
    const hasErrors = this.hasErrors(btn);
    const modalError = modalsDialog.error;
    modalError.description = hasErrors.msg;
    this.dialogService.openModalDialog(modalError);
  }

  loadSchedule() {
    const selectsPCC: any = this.getSelectedPCC();
    const codigoProgram = selectsPCC.course;
    this.data = [];
    this.noData = 'Cargando programaciones de cursos...';
    console.log(this.startDate, this.endDate);
    this.http
      .get(
        `/api/ProgramacionesCurso/${codigoProgram}/${this.startDate}/${this.endDate}`
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
          // console.log(error);
        }
      );
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

      dataDuplicatedKey['Fecha de Inicio'] = moment(
        dataKey.FechaInicio,
        this.formatoEntrada
      ).format(this.formatoSalida);
      dataDuplicatedKey['Fecha de Fin'] = moment(
        dataKey.FechaFin,
        this.formatoEntrada
      ).format(this.formatoSalida);
      dataDuplicatedKey['Acciones'] = 'true';
    }
    return dataDuplicated;
  }

  innerButtonTableClicked(buttonIndexTable: any, programation: any) {
    buttonIndexTable === 0
      ? this.loadManagementProgramation(programation)
      : this.deleteProgramation(programation);
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

  loadManagementProgramation(programation: any) {
    this.dialogService.openModalDialog(modalsDialog.load, true);
    console.log(programation);
    this.http
      .get(`/api/ProgramacionesSesiones/${programation.Codigo}`)
      .subscribe(
        (e: any) => {
          this.http
            .get(
              `/api/Docentes/${programation.CodigoCoordinador}`
            )
            .subscribe(
              (el: any) => {
                programation.Sesiones = e.data;
                programation.Coordinador = el.data;
                localStorage.setItem(
                  'programation',
                  JSON.stringify(programation)
                );

                this.dialogService.closeLastOpenedModalDialog();
                this.router.navigateByUrl('/programaciones/curso/gestionar');
              },
              (err: any) => {
                this.dialogService.closeLastOpenedModalDialog();
                const errorDialo = modalsDialog.error;
                errorDialo.description = 'Ha surgido un error.';
                this.dialogService.openModalDialog(errorDialo);
              }
            );
        },
        (err: any) => {
          this.dialogService.closeLastOpenedModalDialog();
          const errorDialo = modalsDialog.error;
          errorDialo.description = 'Ha surgido un error.';
          this.dialogService.openModalDialog(errorDialo);
        }
      );
  }

  // LOCAL STORAGE
  getSelectedPCC() {
    const selectedPCC: any = localStorage.getItem('selectsPCC');
    return JSON.parse(selectedPCC);
  }
}
