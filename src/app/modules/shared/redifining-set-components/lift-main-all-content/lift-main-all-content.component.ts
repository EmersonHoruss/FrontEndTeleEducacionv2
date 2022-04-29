import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ModalsDialogService } from '../../../../services/modals-dialog/modals-dialog.service';
import { modalsDialog } from '../../constants/modals-dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UwuService } from '../../../../services/uwu/uwu.service';

@Component({
  selector: 'app-lift-main-all-content',
  templateUrl: './lift-main-all-content.component.html',
  styleUrls: ['./lift-main-all-content.component.scss'],
})
export class LiftMainAllContentComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  selectTimeFilters = [
    { Codigo: 0, Valor: 'Mes actual' },
    { Codigo: 1, Valor: 'Trimestre actual' },
    { Codigo: 2, Valor: 'Intérvalos de Fechas' },
  ];

  FilterForm = this.fb.group({
    selectTime: [],
    startDate: [],
    endDate: [],
  });

  data: any = [];
  dataHelp: any = [];
  columns: any = [];
  nameTable = 'Nombre de la tabla';
  noData = 'Sin programaciones por mostrar.';

  backendDate = 'YYYY-MM-DD';
  frontendDate = 'DD/MM/YYYY';
  dateJS = 'MM/DD/YYYY';

  waySelected = false;

  isDisableStartDate = true;
  isDisableEndDate = true;

  enabledOptionsTable = true;

  contentBackToolTip = '';
  enableBackButton = true;
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private dialogService: ModalsDialogService
  ) {
    this.data = new MatTableDataSource(this.dataHelp);
  }

  ngOnInit(): void {
    this.serializePage();

    this.nameTable = this.getNameTable();
    this.columns = this.getColumnsTable();

    this.mngSelects();
    this.preloadedSelects();

    this.mngOptionsTable();

    this.mngBackButton();
    this.loadContentBackToolTip();
  }

  preloadedSelects() {
    const deserializeSelects = this.deserializeSelects();
    this.FilterForm.controls['selectTime'].setValue(
      deserializeSelects.selectTime
    );

    this.selectedTimeFilter(deserializeSelects.selectTime);
  }

  // SELECTORS
  selectedTimeFilter($eventValue: any) {
    if ($eventValue === 0) {
      this.isDisableStartDate = true;
      this.isDisableEndDate = true;

      const timeCurrentMonth = this.timeCurrentMonth();

      this.FilterForm.controls['startDate'].setValue(
        new Date(
          moment(timeCurrentMonth.startDate, this.backendDate).format(
            this.dateJS
          )
        )
      );
      this.FilterForm.controls['endDate'].setValue(
        new Date(
          moment(timeCurrentMonth.endDate, this.backendDate).format(this.dateJS)
        )
      );
    } else if ($eventValue === 1) {
      this.isDisableStartDate = true;
      this.isDisableEndDate = true;

      const timeCurrentTrimester = this.timeCurrentTrimester();

      this.FilterForm.controls['startDate'].setValue(
        new Date(
          moment(timeCurrentTrimester.startDate, this.backendDate).format(
            this.dateJS
          )
        )
      );
      this.FilterForm.controls['endDate'].setValue(
        new Date(
          moment(timeCurrentTrimester.endDate, this.backendDate).format(
            this.dateJS
          )
        )
      );
    } else if ($eventValue === 2) {
      // enabling
      this.isDisableStartDate = false;
      this.isDisableEndDate = false;

      // setting
      const deserializeSelects = this.deserializeSelects();
      deserializeSelects.startDate
        ? this.FilterForm.controls['startDate'].setValue(
            new Date(
              moment(deserializeSelects.startDate, this.backendDate).format(
                this.dateJS
              )
            )
          )
        : this.FilterForm.controls['startDate'].setValue(null);

      deserializeSelects.endDate
        ? this.FilterForm.controls['endDate'].setValue(
            new Date(
              moment(deserializeSelects.endDate, this.backendDate).format(
                this.dateJS
              )
            )
          )
        : this.FilterForm.controls['endDate'].setValue(null);
    }

    const deserializeSelects = this.deserializeSelects();
    deserializeSelects.selectTime = $eventValue;
    this.serializeSelects(deserializeSelects);
  }

  timeCurrentMonth(): any {
    const startDate = moment().startOf('month').format(this.backendDate);
    const endDate = moment().endOf('month').format(this.backendDate);
    return {
      startDate,
      endDate,
      string: startDate + '/' + endDate,
    };
  }

  timeCurrentTrimester(): any {
    const date = moment().format(this.backendDate);
    const trimesters = this.getTrimesters();

    const trimester = trimesters.find(
      (trimester: any) =>
        moment(trimester.start).isSameOrBefore(date) &&
        moment(date).isSameOrBefore(trimester.end)
    );

    return {
      startDate: trimester.start,
      endDate: trimester.end,
      string: trimester.start + '/' + trimester.end,
    };
  }

  timeDate(): any {
    const startDate = moment(
      this.FilterForm.controls['startDate'].value,
      this.frontendDate
    ).format(this.backendDate);

    const endDate = moment(
      this.FilterForm.controls['endDate'].value,
      this.frontendDate
    ).format(this.backendDate);

    return {
      startDate,
      endDate,
      string: startDate + '/' + endDate,
    };
  }

  getTime(): any {
    const selectedTime = this.FilterForm.controls['selectTime'].value;

    return selectedTime === 0
      ? this.timeCurrentMonth()
      : selectedTime === 1
      ? this.timeCurrentTrimester()
      : selectedTime === 2
      ? this.timeDate()
      : null;
  }

  getUrl(): any {
    return this.router.url === '/programaciones/sustentacion'
      ? 'api/ProgramacionesSustentacion/1/' + this.getTime().string
      : this.router.url === '/programaciones/curso'
      ? 'api/ProgramacionesCurso/1/' + this.getTime().string
      : this.router.url === '/programaciones/examen'
      ? 'api/ProgramacionesExamen/1/' + this.getTime().string
      : this.router.url === '/programaciones/sustentacion/recuperar'
      ? 'api/ProgramacionesSustentacion/0/' + this.getTime().string
      : this.router.url === '/programaciones/curso/recuperar'
      ? 'api/ProgramacionesCurso/0/' + this.getTime().string
      : this.router.url === '/programaciones/examen/recuperar'
      ? 'api/ProgramacionesExamen/0/' + this.getTime().string
      : '';
  }

  getTrimesters(): any {
    const month = moment().month() + 1;
    let stepTrimester = 0;
    const trimesters = [0, 1, 2, 3];

    const seed = moment()
      .subtract(month, 'months')
      .startOf('month')
      .format(this.backendDate);

    return trimesters.map((trimester: any) => {
      stepTrimester += 3;

      return {
        start: moment(seed)
          .add(stepTrimester - 2, 'months')
          .startOf('month')
          .format(this.backendDate),
        end: moment(seed)
          .add(stepTrimester, 'months')
          .endOf('month')
          .format(this.backendDate),
      };
    });
  }

  // TIME SELECTORS
  datePickerStartDate($eventValue: any) {
    const deserializeSelects = this.deserializeSelects();
    deserializeSelects.startDate = moment($eventValue).format(this.backendDate);
    this.serializeSelects(deserializeSelects);
  }

  datePickerEndDate($eventValue: any) {
    const deserializeSelects = this.deserializeSelects();
    deserializeSelects.endDate = moment($eventValue).format(this.backendDate);
    this.serializeSelects(deserializeSelects);
  }

  // BUTTONS
  list() {
    // console.log(this.buttonsHasErrors());
    this.buttonsHasErrors().error ? this.buttonsShowErrors() : this.loadTable();
  }

  getItBack() {
    this.router.url === '/programaciones/sustentacion'
      ? this.router.navigateByUrl('/programaciones/sustentacion/recuperar')
      : this.router.url === '/programaciones/curso'
      ? this.router.navigateByUrl('/programaciones/curso/recuperar')
      : this.router.url === '/programaciones/examen'
      ? this.router.navigateByUrl('/programaciones/examen/recuperar')
      : null;
  }

  addNew() {
    this.router.url === '/programaciones/sustentacion'
      ? this.router.navigateByUrl('/programaciones/sustentacion/nuevo')
      : this.router.url === '/programaciones/curso'
      ? this.router.navigateByUrl('/programaciones/curso/nuevo')
      : this.router.url === '/programaciones/examen'
      ? this.router.navigateByUrl('/programaciones/examen/nuevo')
      : null;
  }

  back() {
    this.router.url === '/programaciones/sustentacion/recuperar'
      ? this.router.navigateByUrl('/programaciones/sustentacion')
      : this.router.url === '/programaciones/curso/recuperar'
      ? this.router.navigateByUrl('/programaciones/curso')
      : this.router.url === '/programaciones/examen/recuperar'
      ? this.router.navigateByUrl('/programaciones/examen')
      : null;
  }

  // BUTTONS ERRORS
  buttonsHasErrors(): any {
    const startDate = this.FilterForm.controls['startDate'].value;
    const endDate = this.FilterForm.controls['endDate'].value;

    if (!startDate || !endDate)
      return {
        error: true,
        msg: 'Ingrese fecha de inicio y fecha de fin.',
      };

    if (!moment(startDate).isSameOrBefore(endDate))
      return {
        error: true,
        msg: 'Ingrese fecha de inicio debe ser menor e igual a la fecha de fin.',
      };
  }

  buttonsShowErrors() {
    const error = this.buttonsHasErrors();
    modalsDialog.error.description = error.msg;
    this.dialogService.openModalDialog(modalsDialog.error);
  }

  // TABLE
  getNameTable(): string {
    return this.router.url === '/programaciones/sustentacion'
      ? 'Lista de programaciones de sustentaciones'
      : this.router.url === '/programaciones/curso'
      ? 'Lista de programaciones de cursos'
      : this.router.url === '/programaciones/examen'
      ? 'Lista de programaciones de examenes'
      : this.router.url === '/programaciones/sustentacion/recuperar'
      ? 'Lista de programaciones de sustentaciones eliminadas'
      : this.router.url === '/programaciones/curso/recuperar'
      ? 'Lista de programaciones de cursos eliminados'
      : this.router.url === '/programaciones/examen/recuperar'
      ? 'Lista de programaciones de examenes eliminadas'
      : '';
  }

  getColumnsTable(): any {
    return this.router.url === '/programaciones/sustentacion' ||
      this.router.url === '/programaciones/sustentacion/recuperar'
      ? [
          'Proyecto',
          '# Resolución',
          'Fecha',
          'Hora de Inicio',
          'Hora de Fin',
          'Acciones',
        ]
      : this.router.url === '/programaciones/curso' ||
        this.router.url === '/programaciones/curso/recuperar'
      ? [
          'Docente',
          'Correo',
          'Celular',
          'Fecha de Inicio',
          'Fecha de Fin',
          'Acciones',
        ]
      : this.router.url === '/programaciones/examen' ||
        this.router.url === '/programaciones/examen/recuperar'
      ? [
          'Docente',
          'Correo',
          'Celular',
          'Fecha',
          'Hora de Inicio',
          'Hora de Fin',
          'Acciones',
        ]
      : [];
  }

  mngOptionsTable() {
    this.enabledOptionsTable =
      this.router.url === '/programaciones/sustentacion'
        ? true
        : this.router.url === '/programaciones/curso'
        ? true
        : this.router.url === '/programaciones/examen'
        ? true
        : this.router.url === '/programaciones/sustentacion/recuperar'
        ? false
        : this.router.url === '/programaciones/curso/recuperar'
        ? false
        : this.router.url === '/programaciones/examen/recuperar'
        ? false
        : false;
  }

  loadTable() {
    const url = this.getUrl();
    this.dialogService.openModalDialog(modalsDialog.load);
    this.http.get(url).subscribe(
      (e: any) => {
        this.dialogService.closeLastOpenedModalDialog();

        // this.sessionsHelp = sessionsAux;

        // this.sessions = new MatTableDataSource(this.sessionsHelp);
        // this.sessions.paginator = this.paginator;
      },
      (err: any) => {
        this.dialogService.closeLastOpenedModalDialog();

        modalsDialog.error.description = 'Ha surgido un error';
        this.dialogService.openModalDialog(modalsDialog.error);
      }
    );
  }

  formatData(data: any) {
    if (
      this.router.url === '/programaciones/sustentacion' ||
      this.router.url === '/programaciones/sustentacion/recuperar'
    ) {
    } else if (
      this.router.url === '/programaciones/curso' ||
      this.router.url === '/programaciones/curso/recuperar'
    ) {
    } else if (
      this.router.url === '/programaciones/examen' ||
      this.router.url === '/programaciones/examen/recuperar'
    ) {
    }
  }
  // this.sessionsHelp = sessionsAux;

  //   this.sessions = new MatTableDataSource(this.sessionsHelp);
  //   this.sessions.paginator = this.paginator;

  // BACK TOOLTIP AND BUTTON
  mngBackButton() {
    this.enableBackButton =
      this.router.url === '/programaciones/sustentacion' ||
      this.router.url === '/programaciones/curso' ||
      this.router.url === '/programaciones/examen'
        ? false
        : this.router.url === '/programaciones/sustentacion/recuperar' ||
          this.router.url === '/programaciones/curso/recuperar' ||
          this.router.url === '/programaciones/examen/recuperar'
        ? true
        : false;
  }

  loadContentBackToolTip() {
    this.contentBackToolTip =
      this.router.url === '/programaciones/sustentacion/recuperar'
        ? 'Ir a programaciones de sustentaciones'
        : this.router.url === '/programaciones/curso/recuperar'
        ? 'Ir a programaciones de cursos'
        : this.router.url === '/programaciones/examen/recuperar'
        ? 'Ir a programaciones de examenes'
        : '';
  }

  // LOCAL STORAGE
  initSelects() {
    localStorage.setItem(
      'selects' + this.deserializePage(),
      JSON.stringify({
        selectTime: 0,
        startDate: null,
        endDate: null,
      })
    );
  }

  mngSelects() {
    const selects: any = this.deserializeSelects();
    if (!selects) this.initSelects();
  }

  serializeSelects(selects: any) {
    localStorage.setItem(
      'selects' + this.deserializePage(),
      JSON.stringify(selects)
    );
  }

  deserializeSelects() {
    const selects: any = localStorage.getItem(
      'selects' + this.deserializePage()
    );
    return JSON.parse(selects);
  }

  serializePage() {
    this.router.url === '/programaciones/sustentacion'
      ? localStorage.setItem('namePage', 'sustentacion')
      : this.router.url === '/programaciones/curso'
      ? localStorage.setItem('namePage', 'curso')
      : this.router.url === '/programaciones/examen'
      ? localStorage.setItem('namePage', 'examen')
      : this.router.url === '/programaciones/sustentacion/recuperar'
      ? localStorage.setItem('namePage', 'sustentacionRecuperar')
      : this.router.url === '/programaciones/curso/recuperar'
      ? localStorage.setItem('namePage', 'cursoRecuperar')
      : this.router.url === '/programaciones/examen/recuperar'
      ? localStorage.setItem('namePage', 'examenRecuperar')
      : null;
  }

  deserializePage() {
    const namePage: any = localStorage.getItem('namePage');
    return namePage;
  }

  save() {
    const xd = new UwuService();
    xd.save(1);
  }

  subscribe() {}

  test() {
    const xd = new UwuService();
    xd.show();
  }

  mng() {}
}

// PICKER AND HORIZONTAL BAR
