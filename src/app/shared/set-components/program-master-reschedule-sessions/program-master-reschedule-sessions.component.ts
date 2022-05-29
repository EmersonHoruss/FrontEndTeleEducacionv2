import {
  Component,
  OnInit,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

import * as moment from 'moment';

import { ConstantsTaBu } from './table-buttons.constants';
import { Constants } from './datepicker.constants';
import { constantsButton } from './button.constants';

import { DateInterface } from '../../interfaces/date-interface';
import { ButtonInterface } from '../../interfaces/button-interface';
import { MatTableDataSource } from '@angular/material/table';
import { modalsDialog } from '../../constants/modals-dialog';
import { ModalsDialogService } from '../../../services/modals-dialog/modals-dialog.service';

@Component({
  selector: 'app-program-master-reschedule-sessions',
  templateUrl: './program-master-reschedule-sessions.component.html',
  styleUrls: ['./program-master-reschedule-sessions.component.scss'],
})
export class ProgramMasterRescheduleSessionsComponent
  implements OnInit, AfterViewInit, OnChanges
{
  // START LOCAL STORAGE
  programacion: any = localStorage.getItem('programation');
  programacionObj = JSON.parse(this.programacion);
  // END LOCAL STORAGE

  // START: LOCAL VARIABLES
  formatoEntrada = 'DD/MM/YYYY';
  formatoWithTime = 'DD/MM/YYYY, h:mm';
  formatoSalida = 'DD/MM/YYYY';
  formatoWhenUpdateDateJS = 'MM/DD/YYYY';

  formatoBackDate = 'YYYY/MM/DD';
  formatoFrontDate = 'DD/MM/YYYY';

  formatoBackTime = 'HH:MM:SS';
  formatoFrontTime = 'HH:MM';
  // END: LOCAL VARIABLES

  // START: INPUT OUTPUT VARIABLES
  @Input() listenerMasterRegister: boolean;
  @Output() sessionsEE = new EventEmitter<any>();
  // END: INPUT OUTPUT VARIABLES

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  date: DateInterface = Constants.dateStart;
  plusButton: ButtonInterface = constantsButton.plusButton;
  cancelButton: ButtonInterface = constantsButton.cancelButton;
  disabledDate = true;
  sessionForm = this.fb.group({
    dateSchedule: [{ value: '', disabled: true }],
    startTimeSchedule: [{ value: '', disabled: true }],
    endTimeSchedule: [{ value: '', disabled: true }],
    date: ['', [Validators.required]],
    startTime: ['', [Validators.required]],
    endTime: ['', [Validators.required]],
    reason: ['', [Validators.maxLength(300)]],
  });

  fechaInicio: any;
  fechaFin: any;

  sessions: any;
  sessionsHelp: any = [];
  sessionsBackend: any = [];
  columns = ['Fecha', 'Hora de inicio', 'Hora de fin', 'Estado', 'Acciones'];
  noSessions = 'Sin sesiones por mostrar';
  constantTaBu = ConstantsTaBu;
  noUpdating = true;

  // index and object to reschedule, update or delete
  indexToUpdate: any = null;
  objectToUpdate: any = null;

  constructor(
    private fb: FormBuilder,
    private dialogService: ModalsDialogService
  ) {
    this.formatearSesionesDeLS();
    this.sessions = new MatTableDataSource(this.sessionsHelp);
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['listenerMasterRegister'])
      this.sessionsEE.emit(this.sessionsBackend);
  }

  ngAfterViewInit() {
    this.sessions.paginator = this.paginator;
  }

  // START INPUTS FORM ERRORS
  getError(control: string): any {
    let errors: any = {};
    control === 'date'
      ? (errors = this.getDateErros())
      : control === 'startTime'
      ? (errors = this.getStartTimeErros())
      : control === 'endTime'
      ? (errors = this.getEndTimeErros())
      : control === 'reason'
      ? (errors = this.getReasonErros())
      : null;
    // console.log(errors);

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

  getDateErros() {
    // console.log(this.sessionForm.controls['date'].errors);
    return this.sessionForm.controls['date'].errors &&
      this.sessionForm.controls['date'].touched
      ? this.sessionForm.controls['date'].errors
      : {};
  }

  getStartTimeErros() {
    return this.sessionForm.controls['startTime'].errors &&
      this.sessionForm.controls['startTime'].touched
      ? this.sessionForm.controls['startTime'].errors
      : {};
  }

  getEndTimeErros() {
    return this.sessionForm.controls['endTime'].errors &&
      this.sessionForm.controls['endTime'].touched
      ? this.sessionForm.controls['endTime'].errors
      : {};
  }

  getReasonErros() {
    return this.sessionForm.controls['reason'].errors &&
      this.sessionForm.controls['reason'].touched
      ? this.sessionForm.controls['reason'].errors
      : {};
  }
  // END INPUTS FORM ERRORS

  // START SUBMITION AND VALIDATION
  submitSessionForm() {
    Object.values(this.sessionForm.controls).forEach((control: any) => {
      control.markAsTouched();
    });

    this.sessionFormIsInvalid();

    this.sessionForm.invalid
      ? null
      : !this.logicErrorSession().error
      ? this.splicexySesions()
      : this.showErrors();
  }

  getSessionDiferentReprogramado(): any {
    // depure sessions. Just get with diferente status of Reprogramado
    // because we cant target in a dictated session or saved
    const sessionsScheduled = this.sessionsHelp.filter(
      (session: any) => session.Estado !== 'Reprogramado'
    );

    if (this.rescheduleOrUpdate() === 'update')
      return sessionsScheduled.filter(
        (e: any) => e.CodigoReprogramacion !== this.objectToUpdate.Codigo
      );

    return sessionsScheduled;
  }

  // logic as start time should be less than end time
  // and no repeated sessions and times dosen't make target
  logicErrorSession(): any {
    const noError = { error: false, msg: '' };

    return this.foundSimilar()
      ? {
          error: true,
          msg: 'Sesiones repetidas, no se ha reprogramado.',
        }
      : !this.startTimeLessThanEndTime()
      ? {
          error: true,
          msg: 'La hora de inicio debe ser menor a la hora de fin.',
        }
      : this.targetedTimes()
      ? { error: true, msg: 'Las sesiones se están cruzando.' }
      : noError;
  }

  foundSimilar(): boolean {
    const sessionToAdd = this.getSession();

    return this.getSessionDiferentReprogramado().find(
      (e: any) =>
        sessionToAdd['Fecha'] === e['Fecha'] &&
        sessionToAdd['Hora de inicio'] === e['Hora de inicio'] &&
        sessionToAdd['Hora de fin'] === e['Hora de fin']
    )
      ? true
      : false;
  }

  startTimeLessThanEndTime(): boolean {
    const sessionToAdd = this.getSession();
    const startTime = sessionToAdd['Hora de inicio'];
    const endTime = sessionToAdd['Hora de fin'];
    const startTimeArray = startTime.split(':');
    const endTimeArray = endTime.split(':');

    if (startTime === endTime) return false;
    else if (startTimeArray[0] > endTimeArray[0]) return false;
    else if (startTimeArray[0] === endTimeArray[0])
      if (startTimeArray[1] > endTimeArray[1]) return false;

    return true;
  }

  targetedTimes(): boolean {
    const sessionToAdd = this.getSession();
    // console.log('SESION TO ADD', sessionToAdd);
    const sameYear = '6/6/2020, ';
    const startTime = moment(
      sameYear + sessionToAdd['Hora de inicio'],
      this.formatoWithTime
    );
    const endTime = moment(
      sameYear + sessionToAdd['Hora de fin'],
      this.formatoWithTime
    );

    const isTargeable = this.getSessionDiferentReprogramado().find(
      (e: any, index: number) => {
        const startTimeE = moment(
          sameYear + e['Hora de inicio'],
          this.formatoWithTime
        );
        const endTimeE = moment(
          sameYear + e['Hora de fin'],
          this.formatoWithTime
        );

        // if date are the same we have to corroborate dates dosent target
        // otherwise it targets
        if (e['Fecha'] === sessionToAdd['Fecha']) {
          const isNoTargeteable =
            moment(endTime).isSameOrBefore(startTimeE) ||
            moment(startTime).isSameOrAfter(endTimeE);
          return !isNoTargeteable;
        }

        return false;
      }
    );

    return this.sessionsHelp.length === 0 ? false : isTargeable ? true : false;
  }

  showErrors() {
    const error = this.logicErrorSession();
    modalsDialog.error.description = error.msg;
    this.dialogService.openModalDialog(modalsDialog.error);
  }

  getSession() {
    const dateFormatedIn = moment(
      this.sessionForm.controls['date'].value,
      this.formatoEntrada
    );
    const date = dateFormatedIn.format(this.formatoSalida);
    const startTime = this.sessionForm.controls['startTime'].value;
    const endTime = this.sessionForm.controls['endTime'].value;
    let session: any = {};

    session['Codigo'] = this.objectToUpdate.Codigo + 'A';
    session['Fecha'] = date;
    session['Hora de inicio'] = startTime;
    session['Hora de fin'] = endTime;
    session['Acciones'] = 'true';
    session['Estado'] = 'Programado';
    session['CodigoReprogramacion'] = this.objectToUpdate.Codigo;
    session['Vigencia'] = true;

    return session;
  }

  splicexySesions() {
    let sessionsAux = JSON.parse(JSON.stringify(this.sessionsHelp));

    this.rescheduleOrUpdate() === 'reschedule'
      ? (sessionsAux = this.insertSchedule(sessionsAux))
      : this.rescheduleOrUpdate() === 'update'
      ? (sessionsAux = this.updateReschedule(sessionsAux))
      : null;

    this.sessionsHelp = sessionsAux;

    this.sessions = new MatTableDataSource(this.sessionsHelp);
    this.sessions.paginator = this.paginator;

    // if dosen't exist an index and isn't updating
    const description =
      this.rescheduleOrUpdate() === 'reschedule'
        ? 'Sesión reprogramada.'
        : this.rescheduleOrUpdate() === 'update'
        ? 'Reprogramación actualizada.'
        : '';

    modalsDialog.success.description = description;

    this.dialogService.openModalDialog(modalsDialog.success);
    // at the end if we're updating or not we say no updating
    // because it dosent matter. It's unnecesary for register,
    // but for updates it is
    // this.noUpdating = true;
    this.sessionsEE.emit(this.sessionsBackend);
  }

  // let insert new scheduled session and update or convert into
  // reschedule session the beggining schedule
  insertSchedule(sessionsAux: any) {
    // Start frontend update schedule
    const indexSessionSchedule = sessionsAux.findIndex(
      (e: any) => e.Codigo === this.objectToUpdate.Codigo
    );

    sessionsAux[indexSessionSchedule].Estado = 'Reprogramado';
    sessionsAux[indexSessionSchedule].MotivoReprogramacionDescripcion =
      this.sessionForm.controls['reason'].value;

    sessionsAux[indexSessionSchedule].MotivoReprogramacionVigencia = true;
    // End frontend update schedule

    // Start backend update schedule
    const indexBackendSession = this.sessionsBackend.findIndex(
      (e: any) => e.Codigo === this.objectToUpdate.Codigo
    );
    this.sessionsBackend[indexBackendSession].Estado = 'Reprogramado';
    this.sessionsBackend[indexBackendSession].MotivoReprogramacionDescripcion =
      this.sessionForm.controls['reason'].value;
    this.sessionsBackend[indexBackendSession].MotivoReprogramacionVigencia =
      true;
    this.sessionsBackend[indexBackendSession].ModificadoSesion = true;
    this.sessionsBackend[indexBackendSession].ModificadoMotivoReprogramacion =
      true;
    // End backend update schedule

    // Start exist in backend
    const indexSessionFound = this.sessionsBackend.findIndex(
      (session: any) =>
        session.CodigoReprogramacion === this.objectToUpdate.Codigo
    );
    // End exist in backend

    const sessionToAdd = this.getSession();

    if (indexSessionFound !== -1) {
      this.sessionsBackend[indexSessionFound].Estado = 'Programado';
      this.sessionsBackend[indexSessionFound].Vigencia = true;
      this.sessionsBackend[indexSessionFound]['Fecha'] = sessionToAdd.Fecha;
      this.sessionsBackend[indexSessionFound]['Hora de inicio'] =
        sessionToAdd['Hora de inicio'];
      this.sessionsBackend[indexSessionFound]['Hora de fin'] =
        sessionToAdd['Hora de fin'];
      this.sessionsBackend[indexSessionFound].ModificadoSesion = true;

      const sessionToAddFront = JSON.parse(
        JSON.stringify(this.sessionsBackend[indexSessionFound])
      );

      sessionsAux.splice(indexSessionSchedule, 0, sessionToAddFront);
    } else {
      sessionsAux.splice(indexSessionSchedule, 0, sessionToAdd);
      sessionToAdd.ModificadoSesion = true;
      this.sessionsBackend.push(sessionToAdd);
    }

    return sessionsAux;
  }

  // let udpate new scheduled session
  updateReschedule(sessionsAux: any) {
    // Start update frontend
    const indexSessionSchedule = sessionsAux.findIndex(
      (e: any) => e.Codigo === this.objectToUpdate.Codigo
    );

    sessionsAux[indexSessionSchedule].MotivoReprogramacionDescripcion =
      this.sessionForm.controls['reason'].value;
    sessionsAux[indexSessionSchedule].MotivoReprogramacionVigencia = true;

    const indexNewSessionSchedule = sessionsAux.findIndex(
      (e: any) => e.CodigoReprogramacion === this.objectToUpdate.Codigo
    );
    const dateFormatedIn = moment(
      this.sessionForm.controls['date'].value,
      this.formatoEntrada
    );
    const date = dateFormatedIn.format(this.formatoSalida);

    sessionsAux[indexNewSessionSchedule].Fecha = date;
    sessionsAux[indexNewSessionSchedule]['Hora de inicio'] =
      this.sessionForm.controls['startTime'].value;
    sessionsAux[indexNewSessionSchedule]['Hora de fin'] =
      this.sessionForm.controls['endTime'].value;
    // End update frontend

    // Start update backend
    const indexSessionScheduleBackend = this.sessionsBackend.findIndex(
      (e: any) => e.Codigo === this.objectToUpdate.Codigo
    );
    this.sessionsBackend[
      indexSessionScheduleBackend
    ].MotivoReprogramacionDescripcion =
      this.sessionForm.controls['reason'].value;
    this.sessionsBackend[indexSessionScheduleBackend]['ModificadoSesion'] =
      true;
    this.sessionsBackend[indexSessionScheduleBackend][
      'ModificadoMotivoReprogramacion'
    ] = true;
    this.sessionsBackend[
      indexSessionScheduleBackend
    ].MotivoReprogramacionVigencia = true;

    const indexSessionRescheduleBackend = this.sessionsBackend.findIndex(
      (e: any) => e.CodigoReprogramacion === this.objectToUpdate.Codigo
    );
    this.sessionsBackend[indexSessionRescheduleBackend].Fecha = date;
    this.sessionsBackend[indexSessionRescheduleBackend]['Hora de inicio'] =
      this.sessionForm.controls['startTime'].value;
    this.sessionsBackend[indexSessionRescheduleBackend]['Hora de fin'] =
      this.sessionForm.controls['endTime'].value;
    this.sessionsBackend[indexSessionRescheduleBackend]['ModificadoSesion'] =
      true;
    // End update backend
    return sessionsAux;
  }
  // END SUBMITION AND VALIDATION

  cancelReschedule() {
    this.sessionForm.reset();
    this.sessionForm.controls['date'].setErrors(null);
    this.sessionForm.controls['startTime'].setErrors(null);
    this.sessionForm.controls['endTime'].setErrors(null);
    this.sessionForm.controls['reason'].setErrors(null);
    // console.log('rescheculing', this.sessionForm);
    this.objectToUpdate = null;
  }

  innerButtonTableClicked(indexButton: any, elementInRow: any) {
    this.objectToUpdate = elementInRow;

    indexButton === 0
      ? this.loadRescheduleSession(elementInRow)
      : indexButton === 1
      ? this.deleteRescheduleSession(elementInRow)
      : null;
  }

  loadRescheduleSession(elementInRow: any) {
    // console.log(this.rescheduleOrUpdate());
    if (elementInRow.Estado === 'Reprogramado') {
      const codigo = elementInRow.Codigo;
      const reason = elementInRow.MotivoReprogramacionDescripcion;
      this.sessionsHelp.forEach((session: any) => {
        if (codigo === session.CodigoReprogramacion) {
          const dateFormatedIn = moment(session['Fecha'], 'DD/MM/YYYY');
          const dateOut = dateFormatedIn.format('MM/DD/YYYY');

          this.sessionForm.controls['date'].setValue(new Date(dateOut));
          this.sessionForm.controls['startTime'].setValue(
            session['Hora de inicio']
          );
          this.sessionForm.controls['endTime'].setValue(session['Hora de fin']);
          this.sessionForm.controls['reason'].setValue(reason);
        }
      });
    } else {
      this.cancelReschedule();
      this.objectToUpdate = elementInRow;
    }

    const dateFormatedIn = moment(elementInRow['Fecha'], 'DD/MM/YYYY');
    const dateOut = dateFormatedIn.format('MM/DD/YYYY');

    this.sessionForm.controls['dateSchedule'].setValue(new Date(dateOut));
    this.sessionForm.controls['startTimeSchedule'].setValue(
      elementInRow['Hora de inicio']
    );
    this.sessionForm.controls['endTimeSchedule'].setValue(
      elementInRow['Hora de fin']
    );
    if (elementInRow.hasOwnProperty('MotivoReprogramacionDescripcion'))
      this.sessionForm.controls['reason'].setValue(
        elementInRow['MotivoReprogramacionDescripcion']
      );
  }

  deleteRescheduleSession(elementInRow: any) {
    this.logicDeleteRescheduleSession(elementInRow);

    modalsDialog.success.description = 'Reprogramación eliminada.';
    this.dialogService.openModalDialog(modalsDialog.success);

    this.cancelReschedule();
    this.sessionsEE.emit(this.sessionsBackend);
  }

  logicDeleteRescheduleSession(elementInRow: any) {
    // reset frontend
    const sessionsAux = JSON.parse(JSON.stringify(this.sessionsHelp));
    const indexScheduledSession = sessionsAux.findIndex(
      (session: any) => elementInRow.Codigo === session.Codigo
    );
    sessionsAux[indexScheduledSession].Estado = 'Programado';
    sessionsAux[indexScheduledSession].MotivoReprogramacionDescripcion = '';

    // delete frontend
    this.sessionsHelp = sessionsAux.filter(
      (session: any) => session.CodigoReprogramacion !== elementInRow.Codigo
    );

    // reset backend
    const indexScheduleBackendSession = this.sessionsBackend.findIndex(
      (session: any) => elementInRow.Codigo === session.Codigo
    );
    this.sessionsBackend[indexScheduleBackendSession].Estado = 'Programado';
    this.sessionsBackend[indexScheduleBackendSession].ModificadoSesion = true;
    this.sessionsBackend[
      indexScheduleBackendSession
    ].MotivoReprogramacionVigencia = false;
    this.sessionsBackend[
      indexScheduleBackendSession
    ].ModificadoMotivoReprogramacion = true;
    this.sessionsBackend[
      indexScheduleBackendSession
    ].MotivoReprogramacionDescripcion = '';

    // delete backend (if type of code is string delete else update)
    const indexRescheduleBackendSession = this.sessionsBackend.findIndex(
      (session: any) => session.CodigoReprogramacion === elementInRow.Codigo
    );
    if (
      typeof this.sessionsBackend[indexRescheduleBackendSession].Codigo ===
      'string'
    ) {
      this.sessionsBackend = this.sessionsBackend.filter(
        (session: any) => session.CodigoReprogramacion !== elementInRow.Codigo
      );
    } else {
      this.sessionsBackend[indexRescheduleBackendSession].Vigencia = false;
      this.sessionsBackend[indexRescheduleBackendSession].ModificadoSesion =
        false;
    }

    // update data in table
    this.sessions = new MatTableDataSource(this.sessionsHelp);
    this.sessions.paginator = this.paginator;
  }

  formatearSesionesDeLS(): any {
    // used to compare if exist any changes fron original fecha
    this.programacionObj.Sesiones.forEach((sesion: any, index: any) => {
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

      sesion['ModificadoSesion'] = false;
      sesion['ModificadoMotivoReprogramacion'] = false;

      this.sessionsBackend.push(sesion);

      if (sesion.Vigencia === 1) this.sessionsHelp.push(sesion);
    });
  }

  // after deleting an element we have to include this piece of code
  // because we reset errors in cancelReschedule method when we do a
  // deletation
  sessionFormIsInvalid() {
    // this.sessionForm.invalid;
    const date = this.sessionForm.controls['date'].value;
    const startTime = this.sessionForm.controls['startTime'].value;
    const endTime = this.sessionForm.controls['endTime'].value;

    if (!date) this.sessionForm.controls['date'].setErrors({ required: '' });
    if (!startTime)
      this.sessionForm.controls['startTime'].setErrors({ required: '' });
    if (!endTime)
      this.sessionForm.controls['endTime'].setErrors({ required: '' });
  }

  disabledFormBtns(): boolean {
    return this.objectToUpdate === null ? true : false;
  }

  disabledTableBtns(indexButton: any, elementInRow: any): boolean {
    const estado = elementInRow.Estado;

    return estado === 'Programado'
      ? indexButton === 1
      : estado === 'Reprogramado'
      ? false
      : true;
  }

  rescheduleOrUpdate(): any {
    if (this.objectToUpdate !== null) {
      const codigo = this.objectToUpdate.Codigo;
      return this.sessionsHelp.findIndex((session: any) => {
        return codigo === session.CodigoReprogramacion;
      }) === -1
        ? 'reschedule'
        : 'update';
    }
    return 'norNeither';
  }
}
