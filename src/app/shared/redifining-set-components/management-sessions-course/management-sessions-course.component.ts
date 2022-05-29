import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ConstantsTaBu } from './table-buttons.constants';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import * as moment from 'moment';
import { modalsDialog } from '../../constants/modals-dialog';
import { ModalsDialogService } from '../../../services/modals-dialog/modals-dialog.service';

@Component({
  selector: 'app-management-sessions-course',
  templateUrl: './management-sessions-course.component.html',
  styleUrls: ['./management-sessions-course.component.scss'],
})
export class ManagementSessionsCourseComponent
  implements OnInit, AfterViewInit
{
  // START: LOCAL VARIABLES
  formatoEntrada = 'DD/MM/YYYY';
  formatoWithTime = 'DD/MM/YYYY, h:mm';
  formatoSalida = 'DD/MM/YYYY';
  formatoWhenUpdateDateJS = 'MM/DD/YYYY';

  formatoBackDate = 'YYYY/MM/DD';
  formatoFrontDate = 'DD/MM/YYYY';

  formatoBackTime = 'HH:MM:SS';
  formatoFrontTime = 'HH:MM';

  formatFront = 'DD/MM/YYYY';
  formatBack = 'YYYY/MM/DD';
  formatFrontTimeStamp = 'DD/MM/YYYY HH:mm:ss';
  formatBackTimeStamp = 'YYYY/MM/DD HH:mm:ss';
  // END: LOCAL VARIABLES

  sessionForm = this.fb.group({
    dateSchedule: [{ value: '' }, [Validators.required]],
    startTimeSchedule: [{ value: '', disabled: true }, [Validators.required]],
    endTimeSchedule: [{ value: '', disabled: true }, [Validators.required]],

    dateReschedule: [{ value: '' }, [Validators.required]],
    startTimeReschedule: [{ value: '', disabled: true }, [Validators.required]],
    endTimeReschedule: [{ value: '', disabled: true }, [Validators.required]],
    reasonReprogramation: [
      { value: '', disabled: true },
      [Validators.maxLength(300)],
    ],

    executed: [{ value: '', disabled: true }, [Validators.required]],

    linkSave: [
      { value: '', disabled: true },
      [Validators.required, Validators.maxLength(300)],
    ],
    // published: [{ vasad flue: '', disabled: true }, [Validators.required]],
  });

  // new, update, reschedule, execute, save, delete
  currentAction: any = null;
  sessions: any;
  sessionsHelp: any = [];
  columns = ['Fecha', 'Hora de inicio', 'Hora de fin', 'Estado', 'Acciones'];
  noSessions = 'Sin sesiones por mostrar';
  constantTaBu = ConstantsTaBu;
  disableDateSchedule = true;
  disableDateReschedule = true;
  codeSessionToDelete = null;
  sessionInWork: any = null;
  sessionRescheduling: any = null;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private fb: FormBuilder,
    private dialogService: ModalsDialogService,
    private http: HttpClient
  ) {
    this.formatearSesionesDeLS();
    this.sessions = new MatTableDataSource(this.sessionsHelp);
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.sessions.paginator = this.paginator;
  }

  innerButtonTableClicked(indexButton: any, elementInRow: any) {
    // this.objectToUpdate = elementInRow;
    indexButton === 0
      ? this.updateSession(elementInRow)
      : indexButton === 1
      ? this.rescheduleSession(elementInRow)
      : indexButton === 2
      ? this.executeSession(elementInRow)
      : indexButton === 3
      ? this.saveSessionSchedule(elementInRow)
      : indexButton === 4
      ? this.deleteSession(elementInRow)
      : null;
  }

  updateSession(elementInRow: any) {
    this.sessionForm.reset();
    this.currentAction = 'update';
    this.sessionInWork = elementInRow;

    this.disableDateSchedule = true;
    this.disableDateReschedule = false;

    this.sessionForm.controls['startTimeSchedule'].disable();
    this.sessionForm.controls['endTimeSchedule'].disable();
    this.sessionForm.controls['startTimeReschedule'].enable();
    this.sessionForm.controls['endTimeReschedule'].enable();

    const dateFormatedIn = moment(elementInRow['Fecha'], 'DD/MM/YYYY');
    const dateOut = dateFormatedIn.format('MM/DD/YYYY');
    const dateSeSessionForm = new Date(dateOut);

    this.sessionForm.controls['dateSchedule'].setValue(dateSeSessionForm);
    this.sessionForm.controls['startTimeSchedule'].setValue(
      elementInRow['Hora de inicio']
        ? elementInRow['Hora de inicio']
        : elementInRow['HoraInicio']
    );
    this.sessionForm.controls['endTimeSchedule'].setValue(
      elementInRow['Hora de fin']
        ? elementInRow['Hora de fin']
        : elementInRow['HoraFin']
    );
  }

  updateSchedule() {
    Object.values(this.sessionForm.controls).forEach((control: any) => {
      control.markAsTouched();
    });

    this.dialogService.openModalDialog(modalsDialog.load, true);
    // // console.log(this.getFormatedSession('update'));
    this.http
      .patch(
        '/api/ActualizarProgramacionesSesiones',
        this.getFormatedSession('update')
      )
      .subscribe(
        (e: any) => {
          this.dialogService.closeLastOpenedModalDialog();
          // console.log(e.data);
          this.updateScheduleBackend(e.data);
          this.updateScheduleFrontend(e.data);
          const success = modalsDialog.success;
          success.description = 'Programación de sesión registrada.';
          this.dialogService.openModalDialog(success);
        },
        (err: any) => {
          this.dialogService.closeLastOpenedModalDialog();
          const error = modalsDialog.error;
          error.description = 'Ha surgido un error.';
          this.dialogService.openModalDialog(error);
        }
      );

    // // console.log(this.getFormatedSession('update'));
  }

  updateScheduleBackend(sessionUpdated: any) {
    const programation: any = localStorage.getItem('programation');
    const programationObj = JSON.parse(programation);
    programationObj.Atrasado = sessionUpdated[1][0].Atrasado;
    programationObj.FechaInicio = sessionUpdated[1][0].FechaInicio;
    programationObj.FechaFin = sessionUpdated[1][0].FechaFin;
    // // console.log(programationObj.Ses)
    const sessionIndex = programationObj.Sesiones.findIndex(
      (e: any) => e.Codigo === sessionUpdated[0][0].Codigo
    );

    programationObj.Sesiones.splice(sessionIndex, 1, sessionUpdated[0][0]);
    localStorage.setItem('programation', JSON.stringify(programationObj));
  }

  updateScheduleFrontend(sessionUpdated: any) {
    this.formatearSesionesDeLS();

    this.sessions = new MatTableDataSource(this.sessionsHelp);
    this.sessions.paginator = this.paginator;
  }

  rescheduleSession(elementInRow: any) {
    this.sessionForm.reset();
    this.currentAction = 'reschedule';
    this.sessionInWork = elementInRow;

    this.disableDateSchedule = true;
    this.sessionForm.controls['startTimeSchedule'].disable();
    this.sessionForm.controls['endTimeSchedule'].disable();

    this.disableDateReschedule = false;
    this.sessionForm.controls['startTimeReschedule'].enable();
    this.sessionForm.controls['endTimeReschedule'].enable();
    this.sessionForm.controls['reasonReprogramation'].enable();

    const dateFormatedIn = moment(elementInRow['Fecha'], 'DD/MM/YYYY');
    const dateOut = dateFormatedIn.format('MM/DD/YYYY');
    const dateSeSessionForm = new Date(dateOut);

    this.sessionForm.controls['dateSchedule'].setValue(dateSeSessionForm);
    this.sessionForm.controls['startTimeSchedule'].setValue(
      elementInRow['Hora de inicio']
        ? elementInRow['Hora de inicio']
        : elementInRow['HoraInicio']
    );
    this.sessionForm.controls['endTimeSchedule'].setValue(
      elementInRow['Hora de fin']
        ? elementInRow['Hora de fin']
        : elementInRow['HoraFin']
    );

    if (elementInRow.Estado === 'Reprogramado') {
      const rescheduledSession = this.sessionsHelp.find(
        (e: any) => e.CodigoReprogramacion === elementInRow.Codigo
      );

      // console.log(rescheduledSession);
      // console.log(elementInRow);
      const dateFormatedIn = moment(rescheduledSession['Fecha'], 'DD/MM/YYYY');
      const dateOut = dateFormatedIn.format('MM/DD/YYYY');
      const dateSeSessionForm = new Date(dateOut);
      this.sessionForm.controls['dateReschedule'].setValue(dateSeSessionForm);
      this.sessionForm.controls['startTimeReschedule'].setValue(
        rescheduledSession.HoraInicio
      );
      this.sessionForm.controls['endTimeReschedule'].setValue(
        rescheduledSession.HoraFin
      );
      this.sessionForm.controls['reasonReprogramation'].setValue(
        elementInRow.MRSDescripcion
      );
    }
  }

  rescheduleSchedule() {
    Object.values(this.sessionForm.controls).forEach((control: any) => {
      control.markAsTouched();
    });
    this.dialogService.openModalDialog(modalsDialog.load, true);

    // // console.log(this.getFormatedSession('reschedule'));

    this.http
      .post(
        '/api/ReprogramacionProgramacionesSesiones',
        this.getFormatedSession('reschedule')
      )
      .subscribe(
        (e: any) => {
          this.dialogService.closeLastOpenedModalDialog();
          // console.log(e.data);
          this.rescheduleScheduleBackend(e.data);
          this.updateScheduleFrontend(e.data);
          const success = modalsDialog.success;
          success.description = 'Reprogramación realizada';
          this.dialogService.openModalDialog(success);
        },
        (err: any) => {
          this.dialogService.closeLastOpenedModalDialog();
          const error = modalsDialog.error;
          // console.log(err);
          error.description = 'Ha surgido un error.';
          this.dialogService.openModalDialog(error);
        }
      );
  }

  rescheduleScheduleBackend(dataRescheduled: any) {
    const programation: any = localStorage.getItem('programation');
    const programationObj = JSON.parse(programation);
    programationObj.Atrasado = dataRescheduled[2][0].Atrasado;
    programationObj.FechaInicio = dataRescheduled[2][0].FechaInicio;
    programationObj.FechaFin = dataRescheduled[2][0].FechaFin;
    // // console.log(programationObj.Ses)

    if (dataRescheduled[1] !== null) {
      // add rescheduled session
      programationObj.Sesiones.push(dataRescheduled[0]);

      // update scheduled session in backend(LS)
      const indexUpdatedSchedule = programationObj.Sesiones.findIndex(
        (e: any) => e.Codigo === this.sessionInWork.Codigo
      );
      const updateScheduledSession = dataRescheduled[1][0];
      const motiveReschedule = dataRescheduled[3];
      updateScheduledSession.MRSCodigo = motiveReschedule.Codigo;
      updateScheduledSession.MRSDescripcion = motiveReschedule.Descripcion;

      programationObj.Sesiones.splice(
        indexUpdatedSchedule,
        1,
        updateScheduledSession
      );
    } else {
      // update rescheduled session
      const sessionIndex = programationObj.Sesiones.findIndex(
        (e: any) => e.Codigo === dataRescheduled[0].Codigo
      );
      programationObj.Sesiones.splice(sessionIndex, 1, dataRescheduled[0]);

      // update scheduled session in backend(LS)
      const indexUpdatedSchedule = programationObj.Sesiones.findIndex(
        (e: any) => e.Codigo === this.sessionInWork.Codigo
      );
      const updateScheduledSession = programationObj.Sesiones.find(
        (e: any) => e.Codigo === this.sessionInWork.Codigo
      );
      const motiveReschedule = dataRescheduled[3];
      updateScheduledSession.MRSCodigo = motiveReschedule.Codigo;
      updateScheduledSession.MRSDescripcion = motiveReschedule.Descripcion;

      programationObj.Sesiones.splice(
        indexUpdatedSchedule,
        1,
        updateScheduledSession
      );
    }

    localStorage.setItem('programation', JSON.stringify(programationObj));
  }

  rescheduleScheduleFrontend(dataRescheduled: any) {
    this.formatearSesionesDeLS();

    this.sessions = new MatTableDataSource(this.sessionsHelp);
    this.sessions.paginator = this.paginator;
  }

  executeSession(elementInRow: any) {
    // reset all fields
    this.sessionForm.reset();
    this.currentAction = 'execute';
    this.sessionInWork = elementInRow;

    this.disableDateSchedule = true;
    this.disableDateReschedule = true;

    this.sessionForm.controls['startTimeSchedule'].disable();
    this.sessionForm.controls['endTimeSchedule'].disable();
    this.sessionForm.controls['startTimeReschedule'].disable();
    this.sessionForm.controls['endTimeReschedule'].disable();
    this.sessionForm.controls['linkSave'].disable();
    this.sessionForm.controls['executed'].enable();

    const dateFormatedIn = moment(elementInRow['Fecha'], 'DD/MM/YYYY');
    const dateOut = dateFormatedIn.format('MM/DD/YYYY');
    const dateSeSessionForm = new Date(dateOut);

    this.sessionForm.controls['dateSchedule'].setValue(dateSeSessionForm);
    this.sessionForm.controls['startTimeSchedule'].setValue(
      elementInRow['Hora de inicio']
        ? elementInRow['Hora de inicio']
        : elementInRow['HoraInicio']
    );
    this.sessionForm.controls['endTimeSchedule'].setValue(
      elementInRow['Hora de fin']
        ? elementInRow['Hora de fin']
        : elementInRow['HoraFin']
    );

    // load if is executed
    this.sessionForm.controls['executed'].setValue(
      this.sessionInWork.Estado === 'E' ||
        this.sessionInWork.Estado === 'Ejecutado'
        ? true
        : false
    );
  }

  executedSchedule() {
    Object.values(this.sessionForm.controls).forEach((control: any) => {
      control.markAsTouched();
    });

    this.dialogService.openModalDialog(modalsDialog.load, true);
    // // console.log(this.sessionForm.controls['executed'].value);
    // // console.log(this.getFormatedSession('execute'));
    this.http
      .patch(
        '/api/DictarProgramacionesSesiones',
        this.getFormatedSession('execute')
      )
      .subscribe(
        (e: any) => {
          this.dialogService.closeLastOpenedModalDialog();
          // console.log(e.data);
          this.executeScheduleBackend(e.data);
          this.executeScheduleFrontend(e.data);
          const success = modalsDialog.success;

          success.description = this.sessionForm.controls['executed'].value
            ? 'La programación de sesión se encuentra como ejecutada.'
            : 'La programación de sesión se encuentra como programada.';
          this.dialogService.openModalDialog(success);
        },
        (err: any) => {
          this.dialogService.closeLastOpenedModalDialog();
          const error = modalsDialog.error;
          error.description = 'Ha surgido un error.';
          this.dialogService.openModalDialog(error);
        }
      );
  }

  executeScheduleBackend(sessionexecuted: any) {
    const programation: any = localStorage.getItem('programation');
    const programationObj = JSON.parse(programation);

    const sessionIndex = programationObj.Sesiones.findIndex(
      (sesion: any) => sesion.Codigo === this.sessionInWork.Codigo
    );

    programationObj.Sesiones[sessionIndex].Estado = this.sessionForm.controls[
      'executed'
    ].value
      ? 'E'
      : 'P';

    localStorage.setItem('programation', JSON.stringify(programationObj));
  }

  executeScheduleFrontend(sessionexecuted: any) {
    this.formatearSesionesDeLS();

    this.sessions = new MatTableDataSource(this.sessionsHelp);
    this.sessions.paginator = this.paginator;
  }

  saveSessionSchedule(elementInRow: any) {
    // reset all fields
    this.sessionForm.reset();
    this.currentAction = 'save';
    this.sessionInWork = elementInRow;
    // console.log('clicked in table', this.sessionInWork);
    this.disableDateSchedule = true;
    this.disableDateReschedule = true;

    this.sessionForm.controls['startTimeSchedule'].disable();
    this.sessionForm.controls['endTimeSchedule'].disable();
    this.sessionForm.controls['startTimeReschedule'].disable();
    this.sessionForm.controls['endTimeReschedule'].disable();
    this.sessionForm.controls['executed'].disable();
    this.sessionForm.controls['linkSave'].enable();

    const dateFormatedIn = moment(elementInRow['Fecha'], 'DD/MM/YYYY');
    const dateOut = dateFormatedIn.format('MM/DD/YYYY');
    const dateSeSessionForm = new Date(dateOut);

    this.sessionForm.controls['dateSchedule'].setValue(dateSeSessionForm);
    this.sessionForm.controls['startTimeSchedule'].setValue(
      elementInRow['Hora de inicio']
        ? elementInRow['Hora de inicio']
        : elementInRow['HoraInicio']
    );
    this.sessionForm.controls['endTimeSchedule'].setValue(
      elementInRow['Hora de fin']
        ? elementInRow['Hora de fin']
        : elementInRow['HoraFin']
    );

    // load if is dictated (have link saved)
    if (this.sessionInWork.hasOwnProperty('SGCodigo'))
      this.sessionForm.controls['linkSave'].setValue(this.sessionInWork.SGLink);
  }

  saveSession() {
    Object.values(this.sessionForm.controls).forEach((control: any) => {
      control.markAsTouched();
    });

    this.dialogService.openModalDialog(modalsDialog.load, true);

    const programation: any = localStorage.getItem('programation');
    const programationObj = JSON.parse(programation);
    const session: any = programationObj.Sesiones.find(
      (sesion: any) => sesion.Codigo === this.sessionInWork.Codigo
    );

    if (session.hasOwnProperty('SGCodigo')) {
      if (session.SGCodigo) {
        this.updateSaveSession();
        // console.log('update');
      } else {
        this.registerSaveSession();
        // console.log('register with sgcodigo');
      }
    } else {
      this.registerSaveSession();
      // console.log('register without sgcodigo');
    }
  }

  registerSaveSession() {
    // console.log(this.getFormatedSession('save'));
    this.http
      .post('/api/SesionGuardada', this.getFormatedSession('save'))
      .subscribe(
        (e: any) => {
          this.dialogService.closeLastOpenedModalDialog();
          // console.log(e.data);
          this.saveSessionBackend(e.data, 'register');
          this.saveSessionFrontend(e.data, 'register');
          const success = modalsDialog.success;

          success.description =
            "Se ha guardado el link de la sesión guardada (programación de sesión en estado 'dictado').";
          this.dialogService.openModalDialog(success);
        },
        (err: any) => {
          this.dialogService.closeLastOpenedModalDialog();
          const error = modalsDialog.error;
          error.description = 'Ha surgido un error.';
          this.dialogService.openModalDialog(error);
        }
      );
  }

  updateSaveSession() {
    this.http
      .patch('/api/ActualizarSesionGuardada', this.getFormatedSession('save'))
      .subscribe(
        (e: any) => {
          this.dialogService.closeLastOpenedModalDialog();
          // console.log(e.data);
          const success = modalsDialog.success;

          success.description =
            "Se ha actualizado el link de la sesión guardada (programación de sesión en estado 'dictado').";

          const programation: any = localStorage.getItem('programation');
          const programationObj = JSON.parse(programation);
          const session: any = programationObj.Sesiones.find(
            (sesion: any) => sesion.Codigo === this.sessionInWork.Codigo
          );

          if (session.hasOwnProperty('SGVigencia')) {
            if (session.SGVigencia === 0)
              success.description =
                "Se ha guardado el link de la sesión guardada (programación de sesión en estado 'dictado').";
          }

          this.saveSessionBackend(e.data, 'update');
          this.saveSessionFrontend(e.data, 'update');

          this.dialogService.openModalDialog(success);
        },
        (err: any) => {
          this.dialogService.closeLastOpenedModalDialog();
          const error = modalsDialog.error;
          error.description = 'Ha surgido un error.';
          this.dialogService.openModalDialog(error);
        }
      );
  }

  deleteSave() {
    this.dialogService.openModalDialog(modalsDialog.load, true);
    console.log(this.getFormatedSession('save'));
    this.http
      .patch('/api/EliminarSesionGuardada', this.getFormatedSession('save'))
      .subscribe(
        (e: any) => {
          this.dialogService.closeLastOpenedModalDialog();
          // console.log(e.data);
          this.saveSessionBackend(e.data, 'delete');
          this.saveSessionFrontend(e.data, 'delete');
          const success = modalsDialog.success;
          success.description =
            "Se ha eliminado el link de la sesión guardada (programación de sesión en estado 'ejecutado').";
          this.dialogService.openModalDialog(success);
          this.cancel();
        },
        (err: any) => {
          this.dialogService.closeLastOpenedModalDialog();
          const error = modalsDialog.error;
          error.description = 'Ha surgido un error.';
          this.dialogService.openModalDialog(error);
        }
      );
  }

  saveSessionBackend(savedSession: any, action: string) {
    const programation: any = localStorage.getItem('programation');
    const programationObj = JSON.parse(programation);

    const indexProgramation = programationObj.Sesiones.findIndex(
      (sesion: any) => sesion.Codigo === this.sessionInWork.Codigo
    );
    const savedSessionAux =
      action === 'register'
        ? savedSession[0]
        : action === 'update' || action === 'delete'
        ? savedSession[0][0]
        : null;

    programationObj.Sesiones[indexProgramation].SGCodigo =
      savedSessionAux.Codigo;

    programationObj.Sesiones[indexProgramation].SGLink = savedSessionAux.Link;
    programationObj.Sesiones[indexProgramation].SGVigencia =
      savedSessionAux.Vigencia;
    programationObj.Sesiones[indexProgramation].SGCodigoProgramacionSesion =
      savedSessionAux.CodigoProgramacionSesion;
    programationObj.Sesiones[indexProgramation].SGCodigoPersonal =
      savedSessionAux.CodigPersonal;

    if (action === 'register' || action === 'update') {
      programationObj.Sesiones[indexProgramation].Estado = 'D';
    } else if (action === 'delete') {
      programationObj.Sesiones[indexProgramation].Estado = 'E';
    }

    localStorage.setItem('programation', JSON.stringify(programationObj));
  }

  saveSessionFrontend(savedSession: any, action: string) {
    this.formatearSesionesDeLS();

    this.sessions = new MatTableDataSource(this.sessionsHelp);
    this.sessions.paginator = this.paginator;
  }

  deleteSession(elementInRow: any) {
    this.currentAction = 'delete';
    this.dialogService.openModalDialog(modalsDialog.load, true);
    this.sessionInWork = elementInRow;
    const objectToDelete = this.getSessionToDelete(elementInRow);
    // console.log(objectToDelete);
    this.http
      .patch('/api/EliminarProgramacionesSesiones', objectToDelete)
      .subscribe(
        (e: any) => {
          this.dialogService.closeLastOpenedModalDialog();
          this.deleteSesssionBackend(elementInRow);
          this.deleteSesssionFrontend(elementInRow);
          const success = modalsDialog.success;
          success.description = 'Programación de sesión eliminada.';
          this.dialogService.openModalDialog(success);
        },
        (err: any) => {
          this.dialogService.closeLastOpenedModalDialog();
          const error = modalsDialog.error;
          error.description = 'Ha surgido un error.';
          //       console.log(err);
          this.dialogService.openModalDialog(error);
        }
      );
    console.log(this.sessionInWork);
    console.log(this.sessionsHelp);
    console.log(JSON.parse(this.getSessionsLS()));
  }

  getSessionToDelete(elementInRow: any) {
    this.codeSessionToDelete = elementInRow.Codigo;
    const programation: any = this.getProgramationLS();
    const objectToDelete: any = {
      Codigo: elementInRow.Codigo,
      CodigoProgramacionCurso: elementInRow.CodigoProgramacionCurso,
      Atrasado: this.getAtrasado(
        moment(programation.FechaRegistro, this.formatBackTimeStamp).format(
          this.formatFront
        )
      ),
      FechaInicio: this.getFechaInicio(),
      FechaFin: this.getFechaFin(),
    };

    if (elementInRow.CodigoReprogramacion)
      objectToDelete.CodigoReprogramacion = elementInRow.CodigoReprogramacion;

    return objectToDelete;
  }

  deleteSesssionBackend(elementInRow: any) {
    const programation: any = localStorage.getItem('programation');
    const programationObj = JSON.parse(programation);
    const sessionToDelete = this.getSessionToDelete(elementInRow);

    programationObj.Sesiones = programationObj.Sesiones.filter(
      (e: any) => e.Codigo !== elementInRow.Codigo
    );

    if (this.sessionInWork.CodigoReprogramacion) {
      programationObj.Sesiones = programationObj.Sesiones.map((sesion: any) => {
        if (sesion.Codigo === this.sessionInWork.CodigoReprogramacion) {
          sesion.Estado = 'P';
          sesion.MRSCodigo = null;
          sesion.MRSDescripcion = null;
        }
        return sesion;
      });
    }
    // TIENE BUG, NO SE ACTRUALIZO EN EL LOCAL STORAGE LOS ATRIBUTOS
    // DE LA PROGRAMACION DE CURSO : programation
    // programationObj.Atrasado = sessionToDelete.Atrasado;
    // programationObj.FechaInicio = sessionToDelete.FechaInicio;
    // programationObj.FechaFin = sessionToDelete.FechaFin;
    localStorage.setItem('programation', JSON.stringify(programationObj));
  }

  deleteSesssionFrontend(elementInRow: any) {
    this.formatearSesionesDeLS();

    this.sessions = new MatTableDataSource(this.sessionsHelp);
    this.sessions.paginator = this.paginator;
  }

  disabledTableBtns(indexButton: any, elementInRow: any): boolean {
    const estado = elementInRow.Estado;

    if (estado === 'Programado') {
      return false;
    } else if (estado === 'Reprogramado') {
      return indexButton !== 1;
    } else if (estado === 'Ejecutado') {
      return indexButton === 0 || indexButton === 1 || indexButton === 4;
    } else if (estado === 'Dictado') {
      return (
        indexButton === 0 ||
        indexButton === 1 ||
        indexButton === 4 ||
        indexButton == 2
      );
    }
    return false;
  }

  new() {
    this.currentAction = 'new';
    this.disableDateSchedule = false;
    this.sessionForm.controls['startTimeSchedule'].enable();
    this.sessionForm.controls['endTimeSchedule'].enable();
    this.sessionForm.reset();
    this.sessionInWork = null;
  }

  saveSchedule() {
    Object.values(this.sessionForm.controls).forEach((control: any) => {
      control.markAsTouched();
    });

    // // console.log(this.getFormatedSession('new'));
    this.dialogService.openModalDialog(modalsDialog.load, true);
    // console.log(this.getFormatedSession('new'));
    this.http
      .post('/api/ProgramacionesSesiones', this.getFormatedSession('new'))
      .subscribe(
        (e: any) => {
          this.dialogService.closeLastOpenedModalDialog();
          // console.log(e.data);
          this.saveScheduleBackend(e.data);
          this.saveScheduleFrontend(e.data);
          const success = modalsDialog.success;
          success.description = 'Programación de sesión registrada.';
          this.dialogService.openModalDialog(success);
        },
        (err: any) => {
          this.dialogService.closeLastOpenedModalDialog();
          const error = modalsDialog.error;
          error.description = 'Ha surgido un error.';
          this.dialogService.openModalDialog(error);
        }
      );

    // this.sessionFormIsInvalid();

    // this.sessionForm.invalid
    //   ? null
    //   : !this.logicErrorSession().error
    //   ? this.splicexySesions()
    //   : this.showErrors();
  }

  saveScheduleBackend(sessionRegistered: any) {
    const programation: any = localStorage.getItem('programation');
    const programationObj = JSON.parse(programation);
    programationObj.Atrasado = sessionRegistered[1][0].Atrasado;
    programationObj.FechaInicio = sessionRegistered[1][0].FechaInicio;
    programationObj.FechaFin = sessionRegistered[1][0].FechaFin;

    programationObj.Sesiones.push(sessionRegistered[0]);
    localStorage.setItem('programation', JSON.stringify(programationObj));
  }

  saveScheduleFrontend(sessionRegistered: any) {
    this.formatearSesionesDeLS();

    this.sessions = new MatTableDataSource(this.sessionsHelp);
    this.sessions.paginator = this.paginator;
  }

  cancel() {
    this.currentAction = null;
    // // console.log(moment(
    //   this.sessionForm.controls['dateSchedule'].value,
    //   'DD/MM/YYYY'
    // ).format('YYYY/MM/DD'));
  }

  getError(control: string): any {
    let errors: any = {};
    control === 'dateSchedule'
      ? (errors = this.getDateScheduleError())
      : control === 'startTimeSchedule'
      ? (errors = this.getStartTimeScheduleError())
      : control === 'endTimeSchedule'
      ? (errors = this.getEndTimeScheduleError())
      : control === 'reason'
      ? (errors = this.getReasonErros())
      : null;
    // // console.log(errors);
    for (const key in errors) {
      if (key === 'required') return { error: true, msg: 'Campo obligatorio.' };
      if (key === 'maxlength')
        return {
          error: true,
          msg: 'Máximo cantidad de caracteres permitidos es 300.',
        };
    }
    return { error: false, msg: '' };
  }

  // after deleting an element we have to include this piece of code
  // because we reset errors in cancelReschedule method when we do a
  // deletation
  sessionFormIsInvalid() {
    // this.sessionForm.invalid;
    const dateSchedule = this.sessionForm.controls['dateSchedule'].value.value;
    const startTimeSchedule =
      this.sessionForm.controls['startTimeSchedule'].value;
    const endTimeSchedule = this.sessionForm.controls['endTimeSchedule'].value;

    // console.log(dateSchedule);

    if (!dateSchedule)
      this.sessionForm.controls['dateSchedule'].setErrors({ required: '' });
    if (!startTimeSchedule)
      this.sessionForm.controls['startTimeSchedule'].setErrors({
        required: '',
      });
    if (!endTimeSchedule)
      this.sessionForm.controls['endTimeSchedule'].setErrors({ required: '' });
  }

  getDateScheduleError() {
    // // console.log(this.sessionForm.controls['dateSchedule'])
    return this.sessionForm.controls['dateSchedule'].errors &&
      this.sessionForm.controls['dateSchedule'].touched
      ? this.sessionForm.controls['dateSchedule'].errors
      : {};
  }

  getStartTimeScheduleError() {
    return this.sessionForm.controls['startTimeSchedule'].errors &&
      this.sessionForm.controls['startTimeSchedule'].touched
      ? this.sessionForm.controls['startTimeSchedule'].errors
      : {};
  }

  getEndTimeScheduleError() {
    return this.sessionForm.controls['endTimeSchedule'].errors &&
      this.sessionForm.controls['endTimeSchedule'].touched
      ? this.sessionForm.controls['endTimeSchedule'].errors
      : {};
  }

  getReasonErros() {
    return this.sessionForm.controls['reason'].errors &&
      this.sessionForm.controls['reason'].touched
      ? this.sessionForm.controls['reason'].errors
      : {};
  }

  formatearSesionesDeLS() {
    this.sessionsHelp = [];
    this.getSessionsLS().forEach((sesion: any, index: any) => {
      sesion['Fecha'] = moment(sesion.Fecha, this.formatoBackDate).format(
        this.formatoFrontDate
      );
      sesion['Hora de inicio'] = sesion.HoraInicio.slice(0, 5);
      sesion['Hora de fin'] = sesion.HoraFin.slice(0, 5);
      sesion['Estado'] =
        sesion.Estado === 'P'
          ? 'Programado'
          : sesion.Estado === 'R'
          ? 'Reprogramado'
          : sesion.Estado === 'E'
          ? 'Ejecutado'
          : sesion.Estado === 'D'
          ? 'Dictado'
          : 'No Existe';
      sesion['Acciones'] = 'true';

      this.sessionsHelp.push(sesion);
    });
  }

  getSessionsLS(): any {
    const programation: any = localStorage.getItem('programation');
    return JSON.parse(programation).Sesiones;
  }

  getPersonalLS() {
    const personal: any = localStorage.getItem('personal');
    return JSON.parse(personal);
  }

  getProgramationLS() {
    const programation: any = localStorage.getItem('programation');
    return JSON.parse(programation);
  }

  // XD
  getCurrentSessionFromForm(action: string): any {
    if (action === 'new') {
      const dateSchedule = moment(
        this.sessionForm.controls['dateSchedule'].value,
        this.formatFront
      ).format(this.formatBack);
      const startTimeSchedule =
        this.sessionForm.controls['startTimeSchedule'].value;
      const endTimeSchedule =
        this.sessionForm.controls['endTimeSchedule'].value;

      return {
        dateSchedule,
        startTimeSchedule,
        endTimeSchedule,
        'Hora de inicio': startTimeSchedule,
        'Hora de fin': endTimeSchedule,
        Fecha: moment(dateSchedule, this.formatBack).format(this.formatFront),
      };
    } else if (action === 'update') {
      const dateSchedule = moment(
        this.sessionForm.controls['dateReschedule'].value,
        this.formatFront
      ).format(this.formatBack);
      const startTimeSchedule =
        this.sessionForm.controls['startTimeReschedule'].value;
      const endTimeSchedule =
        this.sessionForm.controls['endTimeReschedule'].value;

      return {
        dateSchedule,
        startTimeSchedule,
        endTimeSchedule,
        'Hora de inicio': startTimeSchedule,
        'Hora de fin': endTimeSchedule,
        Fecha: moment(dateSchedule, this.formatBack).format(this.formatFront),
      };
    } else if (action === 'reschedule') {
      const dateSchedule = moment(
        this.sessionForm.controls['dateReschedule'].value,
        this.formatFront
      ).format(this.formatBack);
      const startTimeSchedule =
        this.sessionForm.controls['startTimeReschedule'].value;
      const endTimeSchedule =
        this.sessionForm.controls['endTimeReschedule'].value;
      const reasonReschedule =
        this.sessionForm.controls['reasonReprogramation'].value;

      return {
        dateSchedule,
        startTimeSchedule,
        endTimeSchedule,
        'Hora de inicio': startTimeSchedule,
        'Hora de fin': endTimeSchedule,
        Fecha: moment(dateSchedule, this.formatBack).format(this.formatFront),
        reasonReschedule,
      };
    }
  }

  getFormatedSession(action: string): any {
    if (action === 'new') {
      const currentSession = this.getCurrentSessionFromForm(action);
      const fechaHoraActual = this.getFechaHoraActual();
      const programtion = this.getProgramationLS();

      return {
        Atrasado: this.getAtrasado(
          moment(programtion.FechaRegistro, this.formatBackTimeStamp).format(
            this.formatFront
          )
        ),
        ProgramacionFechaInicio: this.getFechaInicio(),
        ProgramacionFechaFin: this.getFechaFin(),
        FechaRegistro: fechaHoraActual,
        Fecha: currentSession.dateSchedule,
        HoraInicio: currentSession.startTimeSchedule,
        'Hora de inicio': currentSession.startTimeSchedule,
        HoraFin: currentSession.endTimeSchedule,
        'Hora de fin': currentSession.endTimeSchedule,
        CodigoPersonal: this.getPersonalLS().Codigo,
        CodigoProgramacionCurso: this.getProgramationLS().Codigo,
      };
    } else if (action === 'update') {
      const currentSession = this.getCurrentSessionFromForm(action);
      const programtion = this.getProgramationLS();

      return {
        Atrasado: this.getAtrasado(
          moment(programtion.FechaRegistro, this.formatBackTimeStamp).format(
            this.formatFront
          )
        ),
        ProgramacionFechaInicio: this.getFechaInicio(),
        ProgramacionFechaFin: this.getFechaFin(),
        Fecha: currentSession.dateSchedule,
        HoraInicio: currentSession.startTimeSchedule,
        'Hora de inicio': currentSession.startTimeSchedule,
        HoraFin: currentSession.endTimeSchedule,
        'Hora de fin': currentSession.endTimeSchedule,
        CodigoPersonal: this.getPersonalLS().Codigo,
        Codigo: this.sessionInWork.Codigo,
        CodigoProgramacionCurso: this.getProgramationLS().Codigo,
      };
    } else if (action === 'reschedule') {
      const currentSession = this.getCurrentSessionFromForm(action);
      const programation = this.getProgramationLS();
      const FechaRegistro = this.getFechaHoraActual();

      this.sessionRescheduling = this.sessionsHelp.find(
        (e: any) => e.Codigo === e.Codigo
      );

      return {
        Atrasado: this.getAtrasado(
          moment(programation.FechaRegistro, this.formatBackTimeStamp).format(
            this.formatFront
          )
        ),
        ProgramacionFechaInicio: this.getFechaInicio(),
        ProgramacionFechaFin: this.getFechaFin(),
        Fecha: currentSession.dateSchedule,
        HoraInicio: currentSession.startTimeSchedule,
        'Hora de inicio': currentSession.startTimeSchedule,
        HoraFin: currentSession.endTimeSchedule,
        'Hora de fin': currentSession.endTimeSchedule,
        CodigoPersonal: this.getPersonalLS().Codigo,
        Codigo: this.sessionInWork.Codigo,
        CodigoProgramacionCurso: this.getProgramationLS().Codigo,
        MotivoReprogramacion: currentSession.reasonReschedule,
        MRSCodigo: !this.sessionInWork.hasOwnProperty('MRSCodigo')
          ? null
          : this.sessionInWork.MRSCodigo
          ? this.sessionInWork.MRSCodigo
          : null,
        Estado:
          this.sessionInWork.Estado === 'Reprogramado'
            ? 'R'
            : this.sessionInWork.Estado === 'Programado'
            ? 'P'
            : null,
        Programado: this.sessionInWork.Estado === 'Programado',
        FechaRegistro,
      };
    } else if (action === 'execute') {
      const executed = this.sessionForm.controls['executed'].value;

      return {
        Codigo: this.sessionInWork.Codigo,
        Estado: executed ? 'E' : 'P',
        CodigoPersonal: this.getPersonalLS().Codigo,
      };
    } else if (action === 'save') {
      return {
        Link: this.sessionForm.controls['linkSave'].value,
        CodigoProgramacionSesion: this.sessionInWork.Codigo,
        CodigoPersonal: this.getPersonalLS().Codigo,
      };
    }
  }

  getSesionesMoment(): any {
    let sessions: any = JSON.parse(JSON.stringify(this.cleanSessions()));
    if (this.currentAction === 'new') {
      const currentSession = this.getCurrentSessionFromForm(this.currentAction);
      sessions.push(currentSession);
    } else if (this.currentAction === 'delete') {
      sessions = sessions.filter(
        (e: any) => e.Codigo != this.codeSessionToDelete
      );

      if (this.sessionInWork.CodigoReprogramacion) {
        const scheduledSessionToPush = this.sessionsHelp.find(
          (e: any) => e.Codigo === this.sessionInWork.CodigoReprogramacion
        );
        sessions.push(scheduledSessionToPush);
      }
    } else if (this.currentAction === 'update') {
      const currentSession = this.getCurrentSessionFromForm(this.currentAction);

      const session = sessions.find(
        (e: any) => e.Codigo === this.sessionInWork.Codigo
      );

      sessions = sessions.filter(
        (e: any) => e.Codigo !== this.sessionInWork.Codigo
      );

      session.Fecha = currentSession.Fecha;
      session.HoraInicio = currentSession['Hora de inicio'];
      session.HoraFin = currentSession['Hora de fin'];
      session['Hora de inicio'] = currentSession['Hora de inicio'];
      session['Hora de fin'] = currentSession['Hora de fin'];

      sessions.push(JSON.parse(JSON.stringify(session)));
    } else if (this.currentAction === 'reschedule') {
      // // console.log('a')
      if (
        this.sessionInWork.Estado === 'P' ||
        this.sessionInWork.Estado === 'Programado'
      ) {
        // // console.log('passed')
        const currentSession = this.getCurrentSessionFromForm(
          this.currentAction
        );

        sessions = sessions.filter(
          (e: any) => e.Codigo !== this.sessionInWork.Codigo
        );

        // // console.log('SESSIONS', sessions);
        sessions.push(JSON.parse(JSON.stringify(currentSession)));
      } else if (
        this.sessionInWork.Estado === 'R' ||
        this.sessionInWork.Estado === 'Reprogramado'
      ) {
        const currentSession = this.getCurrentSessionFromForm(
          this.currentAction
        );

        sessions = sessions.filter(
          (e: any) => e.CodigoReprogramacion !== this.sessionInWork.Codigo
        );

        // // console.log('SESSIONS', sessions);
        sessions.push(JSON.parse(JSON.stringify(currentSession)));
      }
    }

    // // console.log(sessions);
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

  cleanSessions() {
    const sessions: any = JSON.parse(JSON.stringify(this.sessionsHelp));

    return sessions.filter((e: any) => e.Estado !== 'Reprogramado');
  }
}
