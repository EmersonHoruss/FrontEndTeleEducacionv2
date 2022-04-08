import { Component, OnInit } from '@angular/core';
import { Constants } from './master-update.constants';
import { ConstantsRiSiBu } from './constants/left-side/left-side-buttons.constants';
import { ConstantsTaGe } from './constants/rigth-side/table/table-general.constants';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { ModalsDialogService } from 'src/app/services/modals-dialog/modals-dialog.service';
import { modalsDialog } from 'src/app/modules/shared/constants/modals-dialog';
import * as moment from 'moment';

@Component({
  selector: 'app-master-update',
  templateUrl: './master-update.component.html',
  styleUrls: ['./master-update.component.scss'],
})
export class MasterUpdateComponent implements OnInit {
  constants = Constants;
  constantsRiSiBu = ConstantsRiSiBu;
  constantsTaGe = ConstantsTaGe;

  // START FORMATS
  formatFront = 'DD/MM/YYYY';
  formatBack = 'YYYY/MM/DD';
  formatFrontTimeStamp = 'DD/MM/YYYY HH:mm:ss';
  formatBackTimeStamp = 'YYYY/MM/DD HH:mm:ss';
  // END FORMATS

  // START FORM PROGRAMATION
  toggleFormValidate: boolean = false;
  formIsValid: string = 'VALID';
  formValues: any;
  // END FORM PROGRAMATION

  // START SESSION
  listenerMasterRegister: boolean = false;
  sessions: any;
  sessionsDeleted: any;
  // END SESSION

  constructor(
    private router: Router,
    private dialogService: ModalsDialogService,
    private matDialog: MatDialog,
    private http: HttpClient
  ) {}

  ngOnInit(): void {}

  update() {
    const modalError = modalsDialog.error;

    if (this.sessions) {
      if (this.sessions.length > 0 && this.formIsValid === 'VALID') {
        this.saveProgramation();
      } else {
        modalError.description =
          'Debe haber sesiones y el formulario no debe tener errores.';

        this.dialogService.openModalDialog(modalError);
      }
    } else {
      modalError.description = 'Agregue al menos una sesión.';
      this.dialogService.openModalDialog(modalError);
    }
  }

  cancel() {
    this.router.navigateByUrl('/programar/maestria');
  }

  saveProgramation() {
    // console.log(this.sessions)
    // console.log(this.sessionsDeleted)
    const programation = this.getProgramation();
    this.dialogService.openModalDialog(modalsDialog.load, true);
    console.log(programation);
    // console.log(this.sessions);

    this.http.patch('/api/ActualizarProgramacionesCurso', programation).subscribe(
      (e: any) => {
        this.dialogService.closeLastOpenedModalDialog();
        const success = modalsDialog.success;
        success.description = 'Se ha actualizado la programación de curso.';
        this.dialogService.openModalDialog(success);
        this.router.navigateByUrl('/programar/maestria');
      },
      (err: any) => {
        this.dialogService.closeLastOpenedModalDialog();
        // console.log(err)
        const error = modalsDialog.error;
        error.description = err
        this.dialogService.openModalDialog(error);
      }
    );
  }

  getProgramation(): any {
    const programationLS: any = this.getCodigoProgramationLS();
    const programation: any = {};
    const codigos: any = this.getCodigos();

    programation.Sesiones = this.getFormatedSesiones(
      programationLS.Codigo,
      codigos.codigoPersonal
    );

    programation.Codigo = programationLS.Codigo;
    programation.FechaInicio = this.getFechaInicio();
    programation.FechaFin = this.getFechaFin();
    programation.LinkInstitucional = this.formValues.linkTeleEducacion;
    programation.LinkNoInstitucional = this.formValues.linkTeacher;
    programation.Dirigido =
      this.formValues.kindProgramation === 0 ? false : true;
    programation.Atrasado = this.getAtrasado(programationLS.FechaRegistro);
    programation.CodigoDocente = this.formValues.teacher;
    programation.CodigoCoordinador = codigos.codigoCoordinador;
    programation.CodigoPrograma = codigos.codigoPrograma;
    programation.CodigoCurso = codigos.codigoCurso;
    programation.CodigoPersonal = codigos.codigoPersonal;

    return programation;
  }

  getFormatedSesiones(programationCodigo: any, codigoPersonal: any) {
    const sessions: any = this.cleanSessions();
    const sessionsToReturn: any = [];
    const fechaRegistro = this.getFechaHoraActual();

    sessions.forEach((session: any) => {
      const sessionToReturn = JSON.parse(JSON.stringify(session));

      if (!session.hasOwnProperty('Codigo')) {
        sessionToReturn.FechaRegistro = fechaRegistro;
        sessionToReturn.Vigencia = true;
      }

      sessionToReturn.Fecha = moment(session.Fecha, this.formatFront).format(
        this.formatBack
      );
      sessionToReturn.HoraInicio = sessionToReturn['Hora de inicio'];
      sessionToReturn.HoraFin = sessionToReturn['Hora de fin'];

      sessionToReturn.Estado =
        sessionToReturn.Estado === 'Programado'
          ? 'P'
          : sessionToReturn.Estado === 'Reprogramado'
          ? 'R'
          : sessionToReturn.Estado === 'Ejecutado'
          ? 'E'
          : sessionToReturn === 'Dictado'
          ? 'D'
          : '';
      sessionToReturn.CodigoPersonal = codigoPersonal;
      sessionToReturn.CodigoProgramacionCurso = programationCodigo;

      sessionsToReturn.push(sessionToReturn);
    });

    return sessionsToReturn;
  }

  getSesionesMoment(): any {
    const sessions: any = JSON.parse(JSON.stringify(this.sessions));
    // sesiones fecha + hora inicial
    const sessionsStartTime: any = [];
    // sesiones fecha + hora final
    const sessionsEndTime: any = [];

    sessions.forEach((session: any) => {
      sessionsStartTime.push(
        moment(
          session.Fecha + ' ' + session['Hora de inicio'] + ':00',
          this.formatFrontTimeStamp
        ).format(this.formatBackTimeStamp)
      );
      sessionsEndTime.push(
        moment(
          session.Fecha + ' ' + session['Hora de fin'] + ':00',
          this.formatFrontTimeStamp
        ).format(this.formatBackTimeStamp)
      );
    });

    return { sessionsStartTime, sessionsEndTime };
  }

  getFechaHoraActual() {
    const currentDate = new Date().toLocaleString();
    return moment(currentDate, this.formatFrontTimeStamp).format(
      this.formatBackTimeStamp
    );
  }

  getFechaInicio() {
    const sessionsStartTime = this.getSesionesMoment().sessionsStartTime;
    let sessionStart = sessionsStartTime[0];

    sessionsStartTime.forEach((session: any) => {
      moment(sessionStart).isAfter(session) ? (sessionStart = session) : null;
    });

    return sessionStart;
  }

  getFechaFin() {
    const sessionsEndTime = this.getSesionesMoment().sessionsEndTime;
    let sessionEnd = sessionsEndTime[0];

    sessionsEndTime.forEach((session: any) => {
      moment(sessionEnd).isBefore(session) ? (sessionEnd = session) : null;
    });

    return sessionEnd;
  }

  getAtrasado(fechaRegistro: any) {
    const fechaInicio = this.getFechaInicio();
    return moment(fechaRegistro).isAfter(fechaInicio);
  }

  getCodigos() {
    const cursoPrograma: any = localStorage.getItem('cursoPrograma');
    const cursoProgramaObejct: any = JSON.parse(cursoPrograma);

    const personal: any = localStorage.getItem('personal');
    const personalObject: any = JSON.parse(personal);

    return {
      codigoCoordinador: cursoProgramaObejct.coordinador.Codigo,
      codigoCurso: cursoProgramaObejct.curso.Codigo,
      codigoPrograma: cursoProgramaObejct.programa.Codigo,
      codigoPersonal: personalObject.Codigo,
    };
  }

  formIsValidEE($event: any) {
    // console.log('ASDKLFJASÑLDKFJ', $event);
    this.formIsValid = $event;
  }

  formValuesEE($event: any) {
    // console.log('VALUES', $event);
    this.formValues = $event;
  }

  sessionsEE($event: any) {
    this.sessions = $event;
  }

  sessionsDeletedEE($event: any) {
    this.sessionsDeleted = $event;
  }

  cleanSessions() {
    const cleanedSessions: any = [];
    const sessions: any = JSON.parse(JSON.stringify(this.sessions));
    const sessionsDeleted: any = JSON.parse(
      JSON.stringify(this.sessionsDeleted)
    );

    sessionsDeleted.forEach((sesion: any) => {
      sesion.Vigencia = false;
      sessions.push(sesion);
    });

    sessions.forEach((sesion: any) => {
      // console.log(sesion);
      if (sesion.hasOwnProperty('Codigo')) {
        const date = sesion.Fecha;
        const dateBackend = sesion.FechaBackend;
        const horaDeInicio = sesion['Hora de inicio'] + ':00';
        const horaDeFin = sesion['Hora de fin'] + ':00';
        const horaInicio = sesion.HoraInicio;
        const horaFin = sesion.HoraFin;
        if (
          sesion.Estado === 'Programado' &&
          (horaInicio !== horaDeInicio ||
            horaDeFin !== horaFin ||
            date !== dateBackend ||
            sesion.Vigencia === false)
        ) {
          cleanedSessions.push(sesion);
        }
      } else {
        cleanedSessions.push(sesion);
      }
    });

    // console.log(cleanedSessions);
    return cleanedSessions;
  }

  getCodigoProgramationLS() {
    const programation: any = localStorage.getItem('programation');
    const programationObj = JSON.parse(programation);
    return programationObj;
  }
}
