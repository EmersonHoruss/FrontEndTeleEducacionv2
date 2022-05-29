import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ChangeDetectorRef,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ModalsDialogService } from '../../../services/modals-dialog/modals-dialog.service';
import { modalsDialog } from '../../../shared/constants/modals-dialog';
import Buttons from 'src/app/shared2/constants/constant-tracking-postgrade-button';
import { FormBuilder } from '@angular/forms';
import { GlobalStatusServiceService } from '../../../services/global-status/global-status-service.service';
import { MediaMatcher } from '@angular/cdk/layout';
import { responsiveSizes } from '../../../responsive-sizes/responsive-sizes';
import { listenerFormAutomatized } from '../../../shared2/helpers/form-helper';

@Component({
  selector: 'app-main-teacher',
  templateUrl: './main-teacher.component.html',
  styleUrls: ['./main-teacher.component.scss'],
})
export class MainTeacherComponent implements OnInit, AfterViewInit {
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  buttons: any = Buttons;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  titlePage: string;

  data: any;
  dataHelp: any = [];
  columns = [
    'Docente',
    'Celular',
    'Correo Institucional',
    'Correo Personal',
    'Tipo de Documento',
    '# de Documento',
    'Acciones',
  ];
  noData = 'Sin docentes por mostrar.';
  isInMaintenance = true;
  isLoadingData = false;

  filters = [
    { Codigo: 'Nombre', Nombre: 'Nombre' },
    { Codigo: 'ApellidoPaterno', Nombre: 'Apellido paterno' },
    { Codigo: 'Celular', Nombre: 'Celular' },
    { Codigo: 'CorreoInstitucional', Nombre: 'Correo institucional' },
    { Codigo: 'CorreoPersonal', Nombre: 'Correo personal' },
  ];

  form = this.fb.group({
    TipoFiltro: ['Nombre'],
    ValorFiltro: [''],
  });

  constructor(
    private http: HttpClient,
    private router: Router,
    private modalsS: ModalsDialogService,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private globalStatusS: GlobalStatusServiceService,
    private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher
  ) {
    this.settingButtons();
    this.settingTitlePage();
    this.settingVisibitlyButtonsAcoordingPage();

    this.data = new MatTableDataSource(this.dataHelp);

    this.mngBootComponent();
    this.listenerForm();

    this.mobileQuery = media.matchMedia(responsiveSizes.longMobile);
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.data.paginator = this.paginator;
  }

  settingButtons() {
    this.buttons.back_bigger.tooltip = 'Ir a mantenimiento de docentes';
    this.buttons.add_small.tooltip = 'Ir a agregar docente';
    this.buttons.get_back_small.tooltip = 'Ir a recuperar docentes eliminados';
    this.buttons.list_bigger.tooltip = 'Listar';
    this.buttons.update_small.tooltip = 'Actualizar docente';
    this.buttons.delete_small.tooltip = 'Eliminar docente';

    const get_back_small_in_table = JSON.parse(
      JSON.stringify(this.buttons.get_back_small)
    );
    get_back_small_in_table.tooltip = 'Recuperar docente';

    this.buttons.get_back_small_in_table = get_back_small_in_table;
  }

  settingTitlePage() {
    this.router.url === '/mantenimientos/docentes'
      ? (this.titlePage = 'Mantenimientos de Docentes')
      : this.router.url === '/mantenimientos/docentes/recuperar'
      ? (this.titlePage = 'Recuperar Docentes')
      : (this.titlePage = 'Error al establecer Título de Página');
  }

  settingVisibitlyButtonsAcoordingPage() {
    this.router.url === '/mantenimientos/docentes'
      ? (this.isInMaintenance = true)
      : this.router.url === '/mantenimientos/docentes/recuperar'
      ? (this.isInMaintenance = false)
      : (this.isInMaintenance = false);
  }

  settingTitleTable(): string {
    let title = 'Error al establecer Título de Tabla';
    const existMantenimiento = this.globalStatusS.existsPage(
      'Docente',
      'Mantenimiento'
    );
    const existRecuperar = this.globalStatusS.existsPage(
      'Docente',
      'Recuperar'
    );

    if (existMantenimiento && this.router.url === '/mantenimientos/docentes') {
      const executedPage = this.globalStatusS.hasExecutedPage(
        'Docente',
        'Mantenimiento'
      );

      if (executedPage) {
        const formExecutedPage =
          this.globalStatusS.get().Docente.Mantenimiento.ExecutedState.Form;

        title = formExecutedPage.ValorFiltro
          ? 'Lista de los docentes cuyo ' +
            this.getFilterValue(formExecutedPage.TipoFiltro).toLowerCase() +
            " contiene: '" +
            formExecutedPage.ValorFiltro?.toLowerCase() +
            "'"
          : 'Lista de todos los docentes';
      } else {
        title = 'Lista de todos los docentes';
      }
    }

    if (!existMantenimiento && this.router.url === '/mantenimientos/docentes') {
      title = 'Lista de todos los docentes';
    }

    if (
      existRecuperar &&
      this.router.url === '/mantenimientos/docentes/recuperar'
    ) {
      const executedPage = this.globalStatusS.hasExecutedPage(
        'Docente',
        'Recuperar'
      );

      if (executedPage) {
        const formExecutedPage =
          this.globalStatusS.get().Docente.Recuperar.ExecutedState.Form;

        title = formExecutedPage.ValorFiltro
          ? 'Lista de los docentes eliminados cuyo ' +
            this.getFilterValue(formExecutedPage.TipoFiltro).toLowerCase() +
            " contiene: '" +
            formExecutedPage.ValorFiltro?.toLowerCase() +
            "'"
          : 'Lista de todos los docentes eliminados';
      } else {
        title = 'Lista de todos los docentes eliminados';
      }
    }

    if (
      !existRecuperar &&
      this.router.url === '/mantenimientos/docentes/recuperar'
    ) {
      title = 'Lista de todos los docentes eliminados';
    }

    return title;
  }

  list(fromManagingLoadComponent: boolean = false) {
    if (!this.isLoadingData) {
      this.isLoadingData = true;
      this.buttons.list_bigger.color = 'primary-disabled';

      const valuesForm = this.getValuesForm();
      const valuesExecutedPage = this.getValuesExecutedPage().Form;
      const tipoFiltro = fromManagingLoadComponent
        ? valuesExecutedPage.TipoFiltro
        : valuesForm.TipoFiltro;
      const valorFiltro = fromManagingLoadComponent
        ? valuesExecutedPage.ValorFiltro
        : valuesForm.ValorFiltro;

      this.http
        .get(
          `/api/Docentes/null/${this.isInMaintenance}/${tipoFiltro}/${valorFiltro}`
        )
        .subscribe(
          (e: any) => {
            this.afterList(
              e,
              false,
              fromManagingLoadComponent ? valuesExecutedPage : valuesForm
            );
          },
          (err: any) => {
            this.afterList(
              err,
              true,
              fromManagingLoadComponent ? valuesExecutedPage : valuesForm
            );
          }
        );
    }
  }

  afterList(response: any, error: boolean, valuesForm: any) {
    this.isLoadingData = false;
    this.buttons.list_bigger.color = 'primary';

    this.isLoadingData = false;
    if (error) {
      this.dataHelp = [];
    } else {
      this.dataHelp = response.data;
    }

    const globalStatus = this.globalStatusS.get();

    if (this.router.url === '/mantenimientos/docentes') {
      globalStatus.Docente.Mantenimiento.ExecutedState = {
        Form: {
          TipoFiltro: valuesForm.TipoFiltro,
          ValorFiltro: valuesForm.ValorFiltro,
        },
      };

      globalStatus.Docente.Mantenimiento.ExecutedState.Executed = true;
    } else {
      globalStatus.Docente.Recuperar.ExecutedState = {
        Form: {
          TipoFiltro: valuesForm.TipoFiltro,
          ValorFiltro: valuesForm.ValorFiltro,
        },
      };

      globalStatus.Docente.Recuperar.ExecutedState.Executed = true;
    }

    this.globalStatusS.set(globalStatus);

    this.data = new MatTableDataSource(this.dataHelp);
    this.data.paginator = this.paginator;
  }

  goToGetItBack() {
    this.router.navigateByUrl('/mantenimientos/docentes/recuperar');
  }

  goToAddNew() {
    this.router.navigateByUrl('/mantenimientos/docentes/nuevo');
  }

  goToUpdate(teacher: any) {
    this.globalStatusS.createOrUpdatePageOfEntity('Docente', 'Actualizar');

    const globalStatus = this.globalStatusS.get();

    globalStatus.Docente.Actualizar.CurrentState = {
      Form: {
        Codigo: '',
        Nombre: '',
        ApellidoPaterno: '',
        ApellidoMaterno: '',
        CorreoPersonal: '',
        CorreoInstitucional: '',
        Celular: '',
        Nombrado: false,
        Grado: 'N',
        TipoDocumento: 'DNI',
        NumeroDocumento: '',
      },
    };

    this.globalStatusS.set(globalStatus);
    globalStatus.Docente.Actualizar.CurrentState.Form = teacher;
    globalStatus.Docente.Actualizar.InitState.Form = teacher;

    this.globalStatusS.createOrUpdatePageOfEntity(
      'Docente',
      'Actualizar',
      globalStatus.Docente.Actualizar
    );

    this.router.navigateByUrl('/mantenimientos/docentes/actualizar');
  }

  gotToBack() {
    this.router.navigateByUrl('/mantenimientos/docentes');
  }

  delete(teacher: any) {
    const confirmDialog = modalsDialog.confirm;
    confirmDialog.description = 'Eliminar el(la) docente:' + teacher.Docente;

    this.modalsS.openModalDialog(confirmDialog);
    this.modalsS.afterClosedLastModalsDialog().subscribe((e: any) => {
      // console.log('123')
      if (e === true) {
        // console.log('1234')
        this.modalsS.openModalDialog(modalsDialog.load, true);
        this.http
          .patch('/api/Docentes', { Codigo: teacher.Codigo, Vigencia: false })
          .subscribe(
            (e: any) => {
              this.modalsS.closeLastOpenedModalDialog();

              const successDialog = modalsDialog.success;
              successDialog.description =
                'Se ha eliminado docente satisfactoriamente.';
              this.modalsS.openModalDialog(successDialog);

              this.dataHelp = this.dataHelp.filter(
                (e: any) => e.Codigo !== teacher.Codigo
              );
              this.data = new MatTableDataSource(this.dataHelp);
              this.data.paginator = this.paginator;

              localStorage.removeItem('teacher');
            },
            (err: any) => {
              this.modalsS.closeLastOpenedModalDialog();
              const errorDialog = modalsDialog.error;
              errorDialog.description =
                'Ha surgido un error al tratar de eliminar docente.';
              this.modalsS.openModalDialog(errorDialog);
            }
          );
      }
    });
  }

  getBack(teacher: any) {
    const confirmDialog = modalsDialog.confirm;
    confirmDialog.description = 'Recuperar el(la) docente:' + teacher.Docente;

    this.modalsS.openModalDialog(confirmDialog);
    this.modalsS.afterClosedLastModalsDialog().subscribe((e: any) => {
      // console.log('123')
      if (e === true) {
        // console.log('1234')
        this.modalsS.openModalDialog(modalsDialog.load, true);
        this.http
          .patch('/api/Docentes', { Codigo: teacher.Codigo, Vigencia: true })
          .subscribe(
            (e: any) => {
              this.modalsS.closeLastOpenedModalDialog();

              const successDialog = modalsDialog.success;
              successDialog.description =
                'Se ha recuperado docente satisfactoriamente.';
              this.modalsS.openModalDialog(successDialog);

              this.dataHelp = this.dataHelp.filter(
                (e: any) => e.Codigo !== teacher.Codigo
              );
              this.data = new MatTableDataSource(this.dataHelp);
              this.data.paginator = this.paginator;
            },
            (err: any) => {
              this.modalsS.closeLastOpenedModalDialog();
              const errorDialog = modalsDialog.error;
              errorDialog.description =
                'Ha surgido un error al tratar de recuperar docente.';
              this.modalsS.openModalDialog(errorDialog);
            }
          );
      }
    });
  }

  xd() {
    console.log('asdfasd');
  }

  getLabelValorFiltro(lowercased: boolean = false): string {
    const value: any = this.filters.find(
      (e: any) => e.Codigo === this.form.controls['TipoFiltro'].value
    )?.Nombre;

    return lowercased ? value.toLocaleLowerCase() : value;
  }

  // MANAGING BOOTING COMPONENT
  mngBootComponent() {
    const existEntity = this.globalStatusS.existsEntity('Docente');

    if (!existEntity) {
      this.createEntity();
      this.initEntity();
    } else {
      if (this.router.url === '/mantenimientos/docentes') {
        const existPage = this.globalStatusS.existsPage(
          'Docente',
          'Mantenimiento'
        );
        if (!existPage) {
          this.createEntityMaintenance();
          this.initPageMaintenance();
        }
      } else {
        const existPage = this.globalStatusS.existsPage('Docente', 'Recuperar');
        if (!existPage) {
          this.createEntityGetBack();
          this.initPageGetBack();
        }
      }
    }

    this.mngLoadComponent();
  }

  createEntity() {
    this.createEntityMaintenance();
    this.createEntityGetBack();
  }

  createEntityMaintenance() {
    this.globalStatusS.createOrUpdatePageOfEntity('Docente', 'Mantenimiento');
  }

  createEntityGetBack() {
    this.globalStatusS.createOrUpdatePageOfEntity('Docente', 'Recuperar');
  }

  initEntity() {
    this.initPageMaintenance();
    this.initPageGetBack();
  }

  initPageMaintenance() {
    const globalStatus = this.globalStatusS.get();

    globalStatus.Docente.Mantenimiento.CurrentState = {
      Form: { TipoFiltro: 'Nombre', ValorFiltro: '' },
    };

    this.globalStatusS.set(globalStatus);
  }

  initPageGetBack() {
    const globalStatus = this.globalStatusS.get();

    globalStatus.Docente.Recuperar.CurrentState = {
      Form: { TipoFiltro: 'Nombre', ValorFiltro: '' },
    };

    this.globalStatusS.set(globalStatus);
  }

  // MANAGING LOAD COMPONENT
  mngLoadComponent() {
    const globalStatus = this.globalStatusS.get();
    const teacher = globalStatus.Docente;
    this.router.url === '/mantenimientos/docentes'
      ? this.loadMaintenanceComponent(teacher)
      : this.loadGetBackComponent(teacher);
  }

  loadMaintenanceComponent(teacher: any) {
    const hasExecutedPage = this.globalStatusS.hasExecutedPage(
      'Docente',
      'Mantenimiento'
    );

    if (hasExecutedPage) {
      // update table
      // execute data table
      this.list(true);
      // give color table if updated
    }

    this.form.controls['TipoFiltro'].setValue(
      teacher.Mantenimiento.CurrentState.Form.TipoFiltro
    );
    this.form.controls['ValorFiltro'].setValue(
      teacher.Mantenimiento.CurrentState.Form.ValorFiltro
    );
  }

  loadGetBackComponent(teacher: any) {
    const hasExecutedPage = this.globalStatusS.hasExecutedPage(
      'Docente',
      'Recuperar'
    );

    if (hasExecutedPage) {
      // update table
      // execute data table
      this.list(true);
      // give color table if updated
    }

    this.form.controls['TipoFiltro'].setValue(
      teacher.Recuperar.CurrentState.Form.TipoFiltro
    );
    this.form.controls['ValorFiltro'].setValue(
      teacher.Recuperar.CurrentState.Form.ValorFiltro
    );
  }

  // HELPERS
  getValuesForm(): any {
    return {
      TipoFiltro: this.form.controls['TipoFiltro'].value,
      ValorFiltro: this.form.controls['ValorFiltro'].value
        ? this.form.controls['ValorFiltro'].value
        : null,
    };
  }

  getValuesExecutedPage(): any {
    const globalStatus = this.globalStatusS.get();
    const teacher = globalStatus.Docente;
    return this.router.url === '/mantenimientos/docentes'
      ? teacher.Mantenimiento.ExecutedState
      : teacher.Recuperar.ExecutedState;
  }

  listenerForm() {
    this.form.valueChanges.subscribe((e: any) => {
      const globalStatus = this.globalStatusS.get();
      const teacher = globalStatus.Docente;

      for (const key in e) {
        if (this.router.url === '/mantenimientos/docentes') {
          teacher.Mantenimiento.CurrentState.Form[key] = e[key];
          this.globalStatusS.createOrUpdatePageOfEntity(
            'Docente',
            'Mantenimiento',
            teacher.Mantenimiento
          );
        } else {
          teacher.Recuperar.CurrentState.Form[key] = e[key];
          this.globalStatusS.createOrUpdatePageOfEntity(
            'Docente',
            'Recuperar',
            teacher.Recuperar
          );
        }
      }
    });
  }

  getFilterValue(key: string): string {
    const foundFilter = this.filters.find(
      (filter: any) => filter.Codigo === key
    );
    return foundFilter
      ? foundFilter.Nombre
      : 'Error al encontrar el valor de filtro';
  }
}

// if ValorFiltro is null so
// title is gonna be Lista de todos los docentes
// else we have to pay attention of Tipo Filtro
// accordin this we have
// Nombre: title is goona be Lista de los docentes cuyo nombre tenga contenga "valorFiltro"
// ApellidoPaterno: title is goona be Lista de los docentes cuyo apellido paterno tenga contenga  "valorFiltro"
// Celular: title is goona be Lista de los docentes cuyo celular tenga contenga  "valorFiltro"
// CorreoInstitucional: title is goona be Lista de los docentes cuyo correo institucional tenga contenga  "valorFiltro"
// CorreoPersonal: title is goona be Lista de los docentes cuyo correo personal tenga contenga  "valorFiltro"
