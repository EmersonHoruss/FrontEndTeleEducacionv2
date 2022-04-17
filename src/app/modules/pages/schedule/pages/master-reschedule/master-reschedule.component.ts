import { Component, OnInit } from '@angular/core';
import { Constants } from './master-reschedule.constants';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { ModalsDialogService } from 'src/app/services/modals-dialog/modals-dialog.service';
import { modalsDialog } from 'src/app/modules/shared/constants/modals-dialog';
import * as moment from 'moment';

@Component({
  selector: 'app-master-reschedule',
  templateUrl: './master-reschedule.component.html',
  styleUrls: ['./master-reschedule.component.scss'],
})
export class MasterRescheduleComponent implements OnInit {
  constants = Constants;

  // START FORMATS
  formatFront = 'DD/MM/YYYY';
  formatBack = 'YYYY/MM/DD';
  formatFrontTimeStamp = 'DD/MM/YYYY HH:mm:ss';
  formatBackTimeStamp = 'YYYY/MM/DD HH:mm:ss';
  // END FORMATS

  // START SESSION
  listenerMasterRegister: boolean = false;
  sessions: any;
  sessionsToSendBackend: any = [];
  // END SESSION

  constructor(
    private router: Router,
    private dialogService: ModalsDialogService,
    private matDialog: MatDialog,
    private http: HttpClient
  ) {}

  ngOnInit(): void {}

  reschedule() {
    // console.log(this.sessions);
    // console.log(this.getReschedule());

    const programation = this.getReschedule();
    this.dialogService.openModalDialog(modalsDialog.load, true);
    console.log(programation);
    this.http
      .patch('/api/ReprogramarProgramacionesCurso', programation)
      .subscribe(
        (e: any) => {
          this.dialogService.closeLastOpenedModalDialog();
          const success = modalsDialog.success;
          success.description =
            'Reprogramaciones de sesiones guardadas exitosamente.';
          this.dialogService.openModalDialog(success);
          // this.router.navigateByUrl('/programar/maestria');
        },
        (err: any) => {
          this.dialogService.closeLastOpenedModalDialog();
          const error = modalsDialog.error;
          this.dialogService.openModalDialog(error);
        }
      );
  }

  cancel() {
    this.router.navigateByUrl('/programar/maestria');
  }

  getReschedule() {
    const rescheduleLS: any = this.getRescheduleLS();
    const codigoPersonal = this.getCodigoPersonal();
    const reschedule: any = {};

    reschedule.Codigo = rescheduleLS.Codigo;
    reschedule.CodigoPersonal = codigoPersonal;
    reschedule.Sesiones = this.getFormatedSesssionsToSendBackend(
      reschedule.Codigo,
      codigoPersonal
    );
    reschedule.FechaInicio = this.getFechaInicio();
    reschedule.FechaFin = this.getFechaFin();
    reschedule.Atrasado = this.getAtrasado(rescheduleLS.FechaRegistro);

    return reschedule;
  }

  getRescheduleLS() {
    const reschedule: any = localStorage.getItem('programation');
    const rescheduleObj = JSON.parse(JSON.stringify(reschedule));

    return JSON.parse(rescheduleObj);
  }

  getCodigoPersonal() {
    const personal: any = localStorage.getItem('personal');
    const personalObj = JSON.parse(JSON.stringify(personal));
    return JSON.parse(personalObj).Codigo;
  }

  getFormatedSesssionsToSendBackend(
    codigoReschedule: any,
    codigoPersonal: any
  ) {
    const fechaRegistro = this.getFechaHoraActual();

    const sessionsToSendBackend = this.sessions.filter(
      (session: any) => session.ModificadoSesion === true
    );

    return sessionsToSendBackend.map((session: any) => {
      const copiedSession = JSON.parse(JSON.stringify(session));
      copiedSession.Fecha = moment(
        copiedSession.Fecha,
        this.formatFront
      ).format(this.formatBack);
      copiedSession['HoraInicio'] = copiedSession['Hora de inicio'];
      copiedSession['HoraFin'] = copiedSession['Hora de fin'];
      copiedSession.CodigoPersonal = codigoPersonal;
      copiedSession.CodigoProgramacionCurso = codigoReschedule;
      copiedSession.Estado =
        copiedSession.Estado === 'Programado' || copiedSession.Estado === 'P'
          ? 'P'
          : copiedSession.Estado === 'Reprogramado' ||
            copiedSession.Estado === 'R'
          ? 'R'
          : copiedSession.Estado === 'Dictado' || copiedSession.Dictado === 'D'
          ? 'D'
          : copiedSession.Estado === 'Ejecutado' ||
            copiedSession.Ejecutado === 'E'
          ? 'E'
          : 'Estado no encontrado';
      if (typeof copiedSession.Codigo === 'string') {
        copiedSession.FechaRegistro = fechaRegistro;
      }
      return copiedSession;
    });
  }

  getSessions() {
    return this.sessions.filter(
      (session: any) =>
        session.Estado !== 'Reprogramado' &&
        (session.Vigencia === true || session.Vigencia === 1)
    );
  }

  getSesionesMoment(): any {
    const sessions: any = this.getSessions();
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

  getFechaHoraActual() {
    const currentDate = new Date().toLocaleString();
    return moment(currentDate, this.formatFrontTimeStamp).format(
      this.formatBackTimeStamp
    );
  }

  sessionsEE($event: any) {
    console.log($event);
    this.sessions = $event;
  }
}
