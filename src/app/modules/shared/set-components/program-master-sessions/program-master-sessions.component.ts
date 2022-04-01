import {
  Component,
  OnInit,
  Input,
  AfterViewInit,
  ViewChild,
} from '@angular/core';
import { DateInterface } from '../../interfaces/date-interface';
import { Constants } from './datepicker.constants';
import { constantsButton } from './button.constants';
import { ButtonInterface } from '../../interfaces/button-interface';
import { FormBuilder, Validators } from '@angular/forms';
import { ConstantsTaBu } from './table-buttons.constants';
import * as moment from 'moment';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ModalsDialogService } from '../../../../services/modals-dialog/modals-dialog.service';
import { modalsDialog } from 'src/app/modules/shared/constants/modals-dialog';

@Component({
  selector: 'app-program-master-sessions',
  templateUrl: './program-master-sessions.component.html',
  styleUrls: ['./program-master-sessions.component.scss'],
})
export class ProgramMasterSessionsComponent implements OnInit, AfterViewInit {
  // START: LOCAL VARIABLES
  formatoEntrada = 'DD/MM/YYYY';
  formatoWithTime = 'DD/MM/YYYY, h:mm';
  formatoSalida = 'DD/MM/YYYY';
  formatoWhenUpdateDateJS = 'MM/DD/YYYY';
  // END: LOCAL VARIABLES
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  date: DateInterface = Constants.dateStart;
  button: ButtonInterface = constantsButton.plusButton;
  disabledDate = true;
  sessionForm = this.fb.group({
    date: ['', [Validators.required]],
    startTime: ['', [Validators.required]],
    endTime: ['', [Validators.required]],
  });

  sessions: any;
  sessionsHelp = [];
  columns = ['Fecha', 'Hora de inicio', 'Hora de fin', 'Acciones'];
  noSessions = 'Sin sesiones por mostrar';
  constantTaBu = ConstantsTaBu;
  updating = false;

  constructor(
    private fb: FormBuilder,
    private dialogService: ModalsDialogService
  ) {
    this.sessions = new MatTableDataSource(this.sessionsHelp);
  }

  ngOnInit(): void {
    // console.log('adsf');
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
    Object.values(this.sessionForm.controls).forEach((control: any) => {
      control.markAsTouched();
    });
    this.sessionForm.invalid
      ? null
      : !this.logicErrorSession().error
      ? this.splice00Sesions()
      : this.showErrors();
  }

  // logic as start time should be less than end time
  // and no repeated sessions and times dosen't make target
  logicErrorSession(): any {
    const noError = { error: false, msg: '' };

    return this.foundSimilar()
      ? { error: true, msg: 'Sesiones repetidas, no se ha añadido.' }
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
    const isTargeable = this.sessionsHelp.find((e: any) => {
      const startTimeE = moment(
        sameYear + e['Hora de inicio'],
        this.formatoWithTime
      );
      const endTimeE = moment(
        sameYear + e['Hora de fin'],
        this.formatoWithTime
      );
      // console.log(sessionToAdd['Fecha'], e['Fecha']);

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

    const session: any = {};
    session['Fecha'] = date;
    session['Hora de inicio'] = this.sessionForm.controls['startTime'].value;
    session['Hora de fin'] = this.sessionForm.controls['endTime'].value;
    session['Acciones'] = 'true';

    return session;
  }

  splice00Sesions() {
    const sessionsAux = JSON.parse(JSON.stringify(this.sessionsHelp));
    sessionsAux.splice(0, 0, this.getSession());
    this.sessionsHelp = sessionsAux;

    this.sessions = new MatTableDataSource(this.sessionsHelp);
    this.sessions.paginator = this.paginator;

    modalsDialog.success.description = 'Sesión añadida.';
    this.dialogService.openModalDialog(modalsDialog.success);
  }

  innerButtonTableClicked(indexButton: any, elementInRow: any) {
    indexButton === 0
      ? this.updateSession(elementInRow)
      : this.deleteSession(elementInRow);
  }

  setValuesWhenUpdate(elementInRow: any) {
    const setForm: any = {};
    // console.log(elementInRow);

    // const date = moment(elementInRow['Fecha'], this.formatoEntrada);
    // const date = dateFormatedIn.format(this.formatoSalida);
    // console.log(date);
    setForm.date = 'hjghgj';
    setForm.startTime = elementInRow['Hora de inicio'];
    setForm.endTime = elementInRow['Hora de fin'];
    this.sessionForm.setValue(setForm);
    console.log(this.sessionForm);
  }

  updateSession(elementInRow: any) {
    // console.log('updating');
    this.setValuesWhenUpdate(elementInRow);
    // const indexToUpdate = this.sessionsHelp.findIndex((e: any) => {
    //   return (
    //     e['Fecha'] === elementInRow['Fecha'] &&
    //     e['Hora de inicio'] === elementInRow['Hora de inicio'] &&
    //     e['Hora de fin'] === elementInRow['Hora de fin']
    //   );
    // });
    // console.log(indexToUpdate);
    // const updatedSession: any = 1;
    // // this.sessionsHelp.splice(indexToUpdate, 1, updatedSession);
    // this.sessions = new MatTableDataSource(this.sessionsHelp);
    // this.sessions.paginator = this.paginator;

    // modalsDialog.success.description = 'Sesión actualizada.';
    // this.dialogService.openModalDialog(modalsDialog.success);
  }

  deleteSession(elementInRow: any) {
    const newSessions = this.sessionsHelp.filter((e: any) => {
      return !(
        e['Fecha'] === elementInRow['Fecha'] &&
        e['Hora de inicio'] === elementInRow['Hora de inicio'] &&
        e['Hora de fin'] === elementInRow['Hora de fin']
      );
    });

    this.sessionsHelp = newSessions;
    this.sessions = new MatTableDataSource(this.sessionsHelp);
    this.sessions.paginator = this.paginator;

    modalsDialog.success.description = 'Sesión eliminada.';
    this.dialogService.openModalDialog(modalsDialog.success);
  }
}
