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
  selector: 'app-program-master-update-sessions',
  templateUrl: './program-master-update-sessions.component.html',
  styleUrls: ['./program-master-update-sessions.component.scss'],
})
export class ProgramMasterUpdateSessionsComponent
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
    date: ['', [Validators.required]],
    startTime: ['', [Validators.required]],
    endTime: ['', [Validators.required]],
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
  indexToUpdate: any = null;
  objectToUpdate: any = {};

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
      this.sessionsEE.emit(this.sessionsHelp);
    this.sessionsDeletedEE.emit(this.sessionsBackendDeleted);
  }

  ngAfterViewInit() {
    this.sessions.paginator = this.paginator;
  }

  getError(control: string): any {
    let errors: any = {};
    control === 'date'
      ? (errors = this.getDateErros())
      : control === 'startTime'
      ? (errors = this.getStartTimeErros())
      : control === 'endTime'
      ? (errors = this.getEndTimeErros())
      : null;
    // console.log(errors);

    for (const key in errors) {
      if (key === 'required') return { error: true, msg: 'Campo obligatorio.' };
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

  submitSessionForm() {
    // console.log('SESIONES HELP: ', this.sessionsHelp);
    // console.log('SESIONES UPDATED: ', this.sessionsBackendDeleted);
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

  // logic as start time should be less than end time
  // and no repeated sessions and times dosen't make target
  logicErrorSession(): any {
    const noError = { error: false, msg: '' };

    return this.foundSimilar()
      ? {
          error: true,
          msg: this.noUpdating
            ? 'Sesiones repetidas, no se ha añadido.'
            : 'Es la misma sesión no se puede actualizar',
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

    return this.sessionsHelp.find(
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
    const isTargeable = this.sessionsHelp.find((e: any, index: number) => {
      const startTimeE = moment(
        sameYear + e['Hora de inicio'],
        this.formatoWithTime
      );
      const endTimeE = moment(
        sameYear + e['Hora de fin'],
        this.formatoWithTime
      );

      // if date are the same we have to corroborate dates dosent target
      // otherwise it dosent target
      if (e['Fecha'] === sessionToAdd['Fecha']) {
        const isNoTargeteable =
          moment(endTime).isSameOrBefore(startTimeE) ||
          moment(startTime).isSameOrAfter(endTimeE);
        return !isNoTargeteable;
      }

      return false;
    });

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
    if (!this.indexToUpdate && this.noUpdating) {
      session['Fecha'] = date;
      session['Hora de inicio'] = startTime;
      session['Hora de fin'] = endTime;
      session['Acciones'] = 'true';
      session['Estado'] = 'Programado';
    } else {
      session = JSON.parse(JSON.stringify(this.objectToUpdate));
      session['Fecha'] = date;
      session['Hora de inicio'] = startTime;
      session['Hora de fin'] = endTime;
    }

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
    this.noUpdating = true;
    this.sessionsEE.emit(this.sessionsHelp);
    this.sessionsDeletedEE.emit(this.sessionsBackendDeleted);
  }

  innerButtonTableClicked(indexButton: any, elementInRow: any) {
    // console.log(elementInRow);
    indexButton === 0
      ? this.updateSession(elementInRow)
      : this.deleteSession(elementInRow);
  }

  setValuesWhenUpdate(elementInRow: any) {
    const setForm: any = {};

    const dateFormatedIn = moment(elementInRow['Fecha'], 'DD/MM/YYYY');
    const dateOut = dateFormatedIn.format('MM/DD/YYYY');
    setForm.date = new Date(dateOut);
    setForm.startTime = elementInRow['Hora de inicio'];
    setForm.endTime = elementInRow['Hora de fin'];
    this.sessionForm.setValue(setForm);
    this.noUpdating = false;
  }

  updateSession(elementInRow: any) {
    // console.log('updating');
    this.setValuesWhenUpdate(elementInRow);

    this.indexToUpdate = this.sessionsHelp.findIndex((e: any) => {
      return (
        e['Fecha'] === elementInRow['Fecha'] &&
        e['Hora de inicio'] === elementInRow['Hora de inicio'] &&
        e['Hora de fin'] === elementInRow['Hora de fin']
      );
    });

    this.objectToUpdate = this.sessionsHelp.find(
      (e: any) =>
        e['Fecha'] === elementInRow['Fecha'] &&
        e['Hora de inicio'] === elementInRow['Hora de inicio'] &&
        e['Hora de fin'] === elementInRow['Hora de fin']
    );
  }

  deleteSession(elementInRow: any) {
    const newSessions = this.sessionsHelp.filter((e: any) => {
      return !(
        e['Fecha'] === elementInRow['Fecha'] &&
        e['Hora de inicio'] === elementInRow['Hora de inicio'] &&
        e['Hora de fin'] === elementInRow['Hora de fin']
      );
    });
    this.deleteSessionBacked(elementInRow);

    this.sessionsHelp = newSessions;
    this.sessions = new MatTableDataSource(this.sessionsHelp);
    this.sessions.paginator = this.paginator;

    modalsDialog.success.description = 'Sesión eliminada.';
    this.dialogService.openModalDialog(modalsDialog.success);
    this.cancelReschedule();

    this.sessionsEE.emit(this.sessionsHelp);
    this.sessionsDeletedEE.emit(this.sessionsBackendDeleted);
  }

  // Cancel current updating session
  cancelReschedule() {
    this.sessionForm.reset();
    this.sessionForm.controls['date'].setErrors(null);
    this.sessionForm.controls['startTime'].setErrors(null);
    this.sessionForm.controls['endTime'].setErrors(null);
    // console.log('rescheculing', this.sessionForm);
    this.noUpdating = true;
  }

  formatearSesionesDeLS(): any {
    const sesiones: any = [];

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

  deleteSessionBacked(elementInRow: any) {
    const foundSession = this.sessionsHelp.find(
      (session: any) =>
        session['Fecha'] === elementInRow['Fecha'] &&
        session['Hora de inicio'] === elementInRow['Hora de inicio'] &&
        session['Hora de fin'] === elementInRow['Hora de fin'] &&
        elementInRow.hasOwnProperty('Codigo')
    );
    if (foundSession) this.sessionsBackendDeleted.push(foundSession);
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

  setDisabledButton(object: any): boolean {
    return object.Estado === 'Programado' ? false : true;
  }
}
