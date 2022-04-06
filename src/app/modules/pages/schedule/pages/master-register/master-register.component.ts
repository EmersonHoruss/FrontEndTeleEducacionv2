import { Component, OnInit } from '@angular/core';
import { Constants } from './master-register.constants';
import { WeekDayInterface } from '../../../../shared/interfaces/week-day-interface';
import { ConstantsRiSiBu } from './constants/left-side/left-side-buttons.constants';
import { ConstantsTaGe } from './constants/rigth-side/table/table-general.constants';
import { Router } from '@angular/router';
import { modalsDialog } from '../../../../shared/constants/modals-dialog';
import { ModalsDialogService } from 'src/app/services/modals-dialog/modals-dialog.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalsDialogComponent } from 'src/app/modules/shared/components/modals-dialog/modals-dialog.component';
import * as moment from 'moment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-master-register',
  templateUrl: './master-register.component.html',
  styleUrls: ['./master-register.component.scss'],
})
export class MasterRegisterComponent implements OnInit {
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
  formIsValid: string = 'INVALID';
  formValues: any;
  // END FORM PROGRAMATION

  // START SESSION
  listenerMasterRegister: boolean = false;
  sessions: any;
  // END SESSION

  constructor(
    private router: Router,
    private dialogService: ModalsDialogService,
    private matDialog: MatDialog,
    private http: HttpClient
  ) {}

  ngOnInit(): void {}

  selectedDays($event: Array<WeekDayInterface>) {
    console.log($event);
  }

  register() {
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

  saveProgramation() {
    const programation = this.getProgramation();
    this.dialogService.openModalDialog(modalsDialog.load, true);
    console.log(programation);
    this.http.post('/api/ProgramacionesCurso', programation).subscribe(
      (e: any) => {
        this.dialogService.closeLastOpenedModalDialog();

        const success = modalsDialog.success;
        success.description = 'Programación del curso guardado exitosamente.';

        this.dialogService.openModalDialog(success);
        this.router.navigateByUrl('/programar/maestria');
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
    // this.dialogService.openModalDialog(modalError);
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

  getProgramation(): any {
    const programation: any = {};

    programation.Sesiones = this.getFormatedSesiones();
    programation.FechaRegistro = this.getFechaHoraActual();
    programation.FechaInicio = this.getFechaInicio();
    programation.FechaFin = this.getFechaFin();
    programation.LinkInstitucional = this.formValues.linkTeleEducacion;
    programation.LinkNoInstitucional = this.formValues.linkTeacher;
    programation.Dirigido =
      this.formValues.kindProgramation === 0 ? false : true;
    programation.Atrasado = this.getAtrasado(programation.FechaRegistro);
    programation.CodigoDocente = this.formValues.teacher;
    const codigos = this.getCodigos();
    programation.CodigoCoordinador = codigos.codigoCoordinador;
    programation.CodigoPrograma = codigos.codigoPrograma;
    programation.CodigoCurso = codigos.codigoCurso;
    programation.CodigoPersonal = codigos.codigoPersonal;

    return programation;
  }

  getFormatedSesiones() {
    const sessions: any = JSON.parse(JSON.stringify(this.sessions));
    const sessionsToReturn: any = [];

    sessions.forEach((session: any) => {
      const sessionToReturn = JSON.parse(JSON.stringify(session));
      sessionToReturn.Fecha = moment(session.Fecha, this.formatFront).format(
        this.formatBack
      );
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
}
