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
import { ModalsDialogService } from '../../../../services/modals-dialog/modals-dialog.service';
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
  @Output() sessionsDeletedEE = new EventEmitter<any>();
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
  sessionsHelp = [];
  sessionsBackendDeleted: any = [];
  columns = ['Fecha', 'Hora de inicio', 'Hora de fin', 'Estado', 'Acciones'];
  noSessions = 'Sin sesiones por mostrar';
  constantTaBu = ConstantsTaBu;
  noUpdating = true;

  // index and object to reschedule, update or delete
  indexToUpdate: any = null;
  objectToUpdate: any = {};
  // actions like reschedule, update or delete
  indexAction: any = null;

  constructor(
    private fb: FormBuilder,
    private dialogService: ModalsDialogService
  ) {
    this.formatearSesionesDeLS();
    this.sessions = new MatTableDataSource(this.sessionsHelp);
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {}

  ngAfterViewInit() {}

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
    const sessionScheduled = this.sessionsHelp.filter(
      (session: any) => session.Estado !== 'Reprogramado'
    );

    return sessionScheduled;
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
        // otherwise it target
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

    // if dosen't exist an index and isn't updating
    // if (!this.indexToUpdate && this.noUpdating) {
    session['Fecha'] = date;
    session['Hora de inicio'] = startTime;
    session['Hora de fin'] = endTime;
    session['Acciones'] = 'true';
    session['Estado'] = 'Programado';
    // } else {
    //   session = JSON.parse(JSON.stringify(this.objectToUpdate));
    //   session['Fecha'] = date;
    //   session['Hora de inicio'] = startTime;
    //   session['Hora de fin'] = endTime;
    // }

    return session;
  }

  splicexySesions() {
    const sessionsAux = JSON.parse(JSON.stringify(this.sessionsHelp));
    // if dosen't exist an index and isn't updating
    !this.indexToUpdate && this.noUpdating
      ? sessionsAux.splice(0, 0, this.getSession())
      : sessionsAux.splice(this.indexToUpdate, 1, this.getSession());

    this.sessionsHelp = sessionsAux;

    this.sessions = new MatTableDataSource(this.sessionsHelp);
    this.sessions.paginator = this.paginator;

    // if dosen't exist an index and isn't updating
    const description =
      !this.indexToUpdate && this.noUpdating
        ? 'Sesión añadida.'
        : 'Sesión actualizada.';
    modalsDialog.success.description = description;

    this.dialogService.openModalDialog(modalsDialog.success);
    // at the end if we're updating or not we say no updating
    // because it dosent matter. It's unnecesary for register,
    // but for updates it is
    // this.noUpdating = true;
    this.sessionsEE.emit(this.sessionsHelp);
    this.sessionsDeletedEE.emit(this.sessionsBackendDeleted);
  }
  // END SUBMITION AND VALIDATION

  cancelReschedule() {
    this.sessionForm.reset();
    this.sessionForm.controls['date'].setErrors(null);
    this.sessionForm.controls['startTime'].setErrors(null);
    this.sessionForm.controls['endTime'].setErrors(null);
    this.sessionForm.controls['reason'].setErrors(null);
    // console.log('rescheculing', this.sessionForm);
    // this.noUpdating = true;
  }

  innerButtonTableClicked(indexButton: any, elementInRow: any) {
    this.indexAction = indexButton;
    this.objectToUpdate = elementInRow;

    indexButton === 0 || indexButton === 1
      ? this.loadRescheduleSession(elementInRow)
      : indexButton === 2
      ? this.deleteRescheduleSession(elementInRow)
      : null;
  }

  loadRescheduleSession(elementInRow: any) {
    // load schedule session
    const dateFormatedIn = moment(elementInRow['Fecha'], 'DD/MM/YYYY');
    const dateOut = dateFormatedIn.format('MM/DD/YYYY');

    this.sessionForm.controls['dateSchedule'].setValue(new Date(dateOut));
    this.sessionForm.controls['startTimeSchedule'].setValue(
      elementInRow['Hora de inicio']
    );
    this.sessionForm.controls['endTimeSchedule'].setValue(
      elementInRow['Hora de fin']
    );

    // load reschedule session
    if (elementInRow.Estado === 'Reprogramado') {
      const codigo = elementInRow.Codigo;
      const reason = elementInRow.Reason;
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
    }

    // this.noUpdating = false;
  }

  deleteRescheduleSession(elementInRow: any) {
    console.log('deleting');
  }

  formatearSesionesDeLS(): any {
    const sesiones: any = [];

    // used to compare if exist any changes fron original fecha
    this.programacionObj.Sesiones.forEach((sesion: any, index: any) => {
      sesion['FechaBackend'] = moment(
        sesion.Fecha,
        this.formatoBackDate
      ).format(this.formatoFrontDate);
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
      sesiones.push(sesion);
    });

    this.sessionsHelp = sesiones;
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

  setDisabledButton(elementInRow: any): boolean {
    // not implemented yet
    return false;
  }
}
