import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ModalsDialogService } from '../../../services/modals-dialog/modals-dialog.service';
import { modalsDialog } from '../../../shared/constants/modals-dialog';
import { MediaMatcher } from '@angular/cdk/layout';
import { responsiveSizes } from '../../../responsive-sizes/responsive-sizes';
import Buttons from 'src/app/shared2/constants/constant-tracking-postgrade-button';
import { documentTypes } from 'src/app/shared2/constants/constant-document-types';
import { GlobalStatusServiceService } from '../../../services/global-status/global-status-service.service';
// import 'rxjs/add/operator/filter';
import { lastValueFrom, Observable, of } from 'rxjs';

@Component({
  selector: 'app-new-update-teacher',
  templateUrl: './new-update-teacher.component.html',
  styleUrls: ['./new-update-teacher.component.scss'],
})
export class NewUpdateTeacherComponent implements OnInit {
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  tabletQuery: MediaQueryList;
  private _tabletQueryListener: () => void;

  desktop1Query: MediaQueryList;
  private _desktop1QueryListener: () => void;

  desktop2Query: MediaQueryList;
  private _desktop2QueryListener: () => void;

  buttons: any = Buttons;

  titlePage = '';

  grades = [
    { Codigo: 'N', Nombre: 'Sin definir' },
    { Codigo: 'M', Nombre: 'Maestro' },
    { Codigo: 'D', Nombre: 'Doctor' },
  ];

  nombrateds = [
    { Codigo: false, Nombre: 'No' },
    { Codigo: true, Nombre: 'Sí' },
  ];

  documentTypes = documentTypes;
  saved = false;

  form = this.fb.group({
    Nombre: ['', [Validators.required, Validators.maxLength(50)]],
    ApellidoPaterno: ['', [Validators.required, Validators.maxLength(50)]],
    ApellidoMaterno: ['', [Validators.maxLength(50)]],
    CorreoPersonal: ['', [Validators.maxLength(50)]],
    CorreoInstitucional: ['', [Validators.maxLength(50)]],
    Celular: ['', [Validators.maxLength(20)]],
    Nombrado: [false],
    Grado: ['N'],
    TipoDocumento: ['DNI'],
    NumeroDocumento: ['', [Validators.maxLength(30)]],
  });

  isInAddPage = false;
  teacherCode = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private modalsS: ModalsDialogService,
    private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher,
    private globalStatusS: GlobalStatusServiceService
  ) {
    this.settingResponsiveQueries();
    this.settingPage();
    this.settingButtons();
    this.setTitlePage();

    this.mngBootComponent();
    this.listenerForm();
  }

  ngOnInit(): void {}

  // false -> deactivate
  // true -> activate
  canDeactivate(): Observable<boolean> | boolean {
    if (!this.canNavigate()) {
      const confirmModal = modalsDialog.confirm;
      confirmModal.title = '¿Quieres salir de la página?';
      confirmModal.description = 'No has guardado los cambios';
      this.modalsS.openModalDialog(confirmModal);

      const leavePage = this.modalsS.afterClosedLastModalsDialog();

      leavePage.subscribe((e: any) => {
        if (e)
          this.router.url === '/mantenimientos/docentes/nuevo'
            ? this.deletePageNew()
            : this.deletePageUpdate();
      });

      return leavePage;
    }

    this.router.url === '/mantenimientos/docentes/nuevo'
      ? this.deletePageNew()
      : this.deletePageUpdate();

    return true;
  }

  // SETTINGS
  settingPage() {
    this.router.url === '/mantenimientos/docentes/nuevo'
      ? (this.isInAddPage = true)
      : (this.isInAddPage = false);
  }

  settingResponsiveQueries() {
    this.mobileQuery = this.media.matchMedia(responsiveSizes.longMobile);
    this._mobileQueryListener = () => this.changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    this.tabletQuery = this.media.matchMedia(responsiveSizes.longTablet);
    this._mobileQueryListener = () => this.changeDetectorRef.detectChanges();
    this.tabletQuery.addListener(this._tabletQueryListener);

    this.desktop1Query = this.media.matchMedia(responsiveSizes.wide1Desktop);
    this._mobileQueryListener = () => this.changeDetectorRef.detectChanges();
    this.desktop1Query.addListener(this._desktop1QueryListener);

    this.desktop2Query = this.media.matchMedia(responsiveSizes.wide2Desktop);
    this._mobileQueryListener = () => this.changeDetectorRef.detectChanges();
    this.desktop2Query.addListener(this._desktop2QueryListener);
  }

  settingButtons() {
    this.buttons.add_bigger.tooltip = 'Ir a agregar un nuevo docente';
    this.buttons.delete_bigger.tooltip = 'Eliminar docente';
    this.buttons.save_bigger.tooltip = 'Guardar docente';
    this.buttons.back_bigger.tooltip = 'Ir a mantenimiento de docente';
  }

  setTitlePage() {
    this.router.url === '/mantenimientos/docentes/nuevo'
      ? (this.titlePage = 'Docente Nuevo')
      : this.router.url === '/mantenimientos/docentes/actualizar'
      ? (this.titlePage = 'Actualizar Docente')
      : (this.titlePage = 'Error al cargar el título de la página');
  }

  getError(controlName: string): any {
    return { error: false, msg: '' };
  }

  // BUTTONS
  save() {
    for (const key in this.form.controls) {
      this.form.controls[key].markAsTouched();
    }

    if (this.form.status === 'INVALID') {
      const modal = modalsDialog.error;
      modal.description = 'El formulario es inválido.';
      this.modalsS.openModalDialog(modal);
    } else {
      let canProcede = true;
      if (this.router.url === '/mantenimientos/docentes/actualizar') {
        if (this.alikeStateUpdatePage()) {
          const modal = modalsDialog.warning;
          modal.description =
            'Operación de guardado no se ha ejecutado, haga cambios primero.';
          this.modalsS.openModalDialog(modal);
        } else this.savePostPatch();
      } else this.savePostPatch();
    }
  }

  savePostPatch() {
    this.modalsS.openModalDialog(modalsDialog.load, true);
    const objectToSendBackend = this.form.value;

    if (this.router.url === '/mantenimientos/docentes/actualizar')
      objectToSendBackend.Codigo = this.teacherCode;

    const dynamicHttp: any =
      this.router.url === '/mantenimientos/docentes/nuevo'
        ? this.http.post('/api/Docentes', objectToSendBackend)
        : this.http.patch('/api/Docentes', objectToSendBackend);
    // console.log(objectToSendBackend);

    dynamicHttp.subscribe(
      (e: any) => {
        this.saved = true;
        this.modalsS.closeLastOpenedModalDialog();

        const modal = modalsDialog.success;

        this.router.url === '/mantenimientos/docentes/nuevo'
          ? (modal.description =
              'Se ha guardado el docente satisfactoriamente.')
          : (modal.description =
              'Se ha actualizado el docente satisfactoriamente.');

        this.modalsS.openModalDialog(modal);

        if (this.router.url === '/mantenimientos/docentes/nuevo') {
          this.createEntityUpdate();
          const pageUpdate = this.initPageUpdate();
          pageUpdate.CurrentState.Form = e.data;
          pageUpdate.InitState.Form = e.data;

          this.globalStatusS.createOrUpdatePageOfEntity(
            'Docente',
            'Actualizar',
            pageUpdate
          );

          this.router.navigateByUrl('/mantenimientos/docentes/actualizar');
        } else {
          this.createEntityUpdate();
          const pageUpdate = this.initPageUpdate();
          pageUpdate.CurrentState.Form = e.data;
          pageUpdate.InitState.Form = e.data;

          this.globalStatusS.createOrUpdatePageOfEntity(
            'Docente',
            'Actualizar',
            pageUpdate
          );

          this.router.navigateByUrl('/mantenimientos/docentes/actualizar');
        }
      },
      (err: any) => {
        this.modalsS.closeLastOpenedModalDialog();

        const modal = modalsDialog.error;
        modal.description = 'Ha surgido un error.';

        this.modalsS.openModalDialog(modal);
      }
    );
  }

  goToBack() {
    this.router.navigateByUrl('/mantenimientos/docentes');
  }

  goToAdd() {
    this.createEntityNew();
    this.initPageNew();

    this.router.navigateByUrl('/mantenimientos/docentes/nuevo');

    // this.deletePageUpdate();
  }

  // delete() {
  //   this.router.navigateByUrl('/mantenimientos/docentes');
  // }

  // MANAGING BOOTING COMPONENT
  mngBootComponent() {
    const existEntity = this.globalStatusS.existsEntity('Docente');

    if (!existEntity) {
      this.createEntity();
      this.initEntity();
    } else {
      if (this.router.url === '/mantenimientos/docentes/nuevo') {
        const existPage = this.globalStatusS.existsPage('Docente', 'Nuevo');
        if (!existPage) {
          this.createEntityNew();
          this.initPageNew();
        }
      } else {
        const existPage = this.globalStatusS.existsPage(
          'Docente',
          'Actualizar'
        );
        if (!existPage) {
          this.createEntityUpdate();
          this.initPageUpdate();
        }
      }
    }

    this.mngLoadComponent();
  }

  createEntity() {
    this.createEntityNew();
    this.createEntityUpdate();
  }

  createEntityNew() {
    this.globalStatusS.createOrUpdatePageOfEntity('Docente', 'Nuevo');
  }

  createEntityUpdate() {
    this.globalStatusS.createOrUpdatePageOfEntity('Docente', 'Actualizar');
  }

  initEntity() {
    this.initPageNew();
    this.initPageUpdate();
  }

  initPageNew(): any {
    const globalStatus = this.globalStatusS.get();
    const initStatus = {
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

    globalStatus.Docente.Nuevo.CurrentState = initStatus;
    globalStatus.Docente.Nuevo.InitState = initStatus;

    this.globalStatusS.set(globalStatus);
    return globalStatus.Docente.Nuevo;
  }

  initPageUpdate(): any {
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
    return globalStatus.Docente.Actualizar;
  }

  deletePageNew() {
    this.globalStatusS.deletePageOfEntity('Docente', 'Nuevo');
  }

  deletePageUpdate() {
    this.globalStatusS.deletePageOfEntity('Docente', 'Actualizar');
  }

  hasChangedPageNew() {}

  // MANAGING LOAD COMPONENT
  mngLoadComponent() {
    const globalStatus = this.globalStatusS.get();
    const teacher = globalStatus.Docente;
    this.router.url === '/mantenimientos/docentes/nuevo'
      ? this.loadNewComponent(teacher)
      : this.loadUpdateComponent(teacher);
  }

  loadNewComponent(teacher: any) {
    this.form.controls['Nombre'].setValue(
      teacher.Nuevo.CurrentState.Form.Nombre
    );

    this.form.controls['ApellidoPaterno'].setValue(
      teacher.Nuevo.CurrentState.Form.ApellidoPaterno
    );

    this.form.controls['ApellidoMaterno'].setValue(
      teacher.Nuevo.CurrentState.Form.ApellidoMaterno
    );

    this.form.controls['CorreoPersonal'].setValue(
      teacher.Nuevo.CurrentState.Form.CorreoPersonal
    );

    this.form.controls['CorreoInstitucional'].setValue(
      teacher.Nuevo.CurrentState.Form.CorreoInstitucional
    );

    this.form.controls['Celular'].setValue(
      teacher.Nuevo.CurrentState.Form.Celular
    );

    this.form.controls['Nombrado'].setValue(
      teacher.Nuevo.CurrentState.Form.Nombrado
    );

    this.form.controls['Grado'].setValue(teacher.Nuevo.CurrentState.Form.Grado);

    this.form.controls['TipoDocumento'].setValue(
      teacher.Nuevo.CurrentState.Form.TipoDocumento
    );

    this.form.controls['NumeroDocumento'].setValue(
      teacher.Nuevo.CurrentState.Form.NumeroDocumento
    );
  }

  loadUpdateComponent(teacher: any) {
    this.teacherCode = teacher.Actualizar.CurrentState.Form.Codigo;

    this.form.controls['Nombre'].setValue(
      teacher.Actualizar.CurrentState.Form.Nombre
    );

    this.form.controls['ApellidoPaterno'].setValue(
      teacher.Actualizar.CurrentState.Form.ApellidoPaterno
    );

    this.form.controls['ApellidoMaterno'].setValue(
      teacher.Actualizar.CurrentState.Form.ApellidoMaterno
    );

    this.form.controls['CorreoPersonal'].setValue(
      teacher.Actualizar.CurrentState.Form.CorreoPersonal
    );

    this.form.controls['CorreoInstitucional'].setValue(
      teacher.Actualizar.CurrentState.Form.CorreoInstitucional
    );

    this.form.controls['Celular'].setValue(
      teacher.Actualizar.CurrentState.Form.Celular
    );

    this.form.controls['Nombrado'].setValue(
      teacher.Actualizar.CurrentState.Form.Nombrado
    );

    this.form.controls['Grado'].setValue(
      teacher.Actualizar.CurrentState.Form.Grado
    );

    this.form.controls['TipoDocumento'].setValue(
      teacher.Actualizar.CurrentState.Form.TipoDocumento
    );

    this.form.controls['NumeroDocumento'].setValue(
      teacher.Actualizar.CurrentState.Form.NumeroDocumento
    );
  }

  // HELPERS
  listenerForm() {
    this.form.valueChanges.subscribe((e: any) => {
      const globalStatus = this.globalStatusS.get();
      const teacher = globalStatus.Docente;

      for (const key in e) {
        if (this.router.url === '/mantenimientos/docentes/nuevo') {
          teacher.Nuevo.CurrentState.Form[key] = e[key];
          this.globalStatusS.createOrUpdatePageOfEntity(
            'Docente',
            'Nuevo',
            teacher.Nuevo
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

  canNavigate(): boolean {
    return this.router.url === '/mantenimientos/docentes/nuevo'
      ? this.canNavigateNewPage()
      : this.canNavigateUpdatePage();
  }

  canNavigateNewPage() {
    const initState = this.globalStatusS.getState(
      'Docente',
      'Nuevo',
      'InitState',
      true
    );

    const currentState = this.globalStatusS.getState(
      'Docente',
      'Nuevo',
      'CurrentState',
      true
    );

    const alikeStates = initState === currentState;

    return alikeStates ? alikeStates : this.saved;
  }

  canNavigateUpdatePage() {
    const alikeStates = this.alikeStateUpdatePage();

    return alikeStates ? alikeStates : this.saved;
  }

  alikeStateUpdatePage() {
    const initState = this.globalStatusS.getState(
      'Docente',
      'Actualizar',
      'InitState',
      true
    );

    const currentState = this.globalStatusS.getState(
      'Docente',
      'Actualizar',
      'CurrentState',
      true
    );

    return initState === currentState;
  }
}

// this.router.navigate(['../../'], { relativeTo: this.route })

// this.form.controls['Nombre'].valueChanges.subscribe((e: any) => {
//   const globalStatus = this.globalStatusS.get();
//   const teacher = globalStatus.Docente;
//   if (this.router.url === '/mantenimientos/docentes/nuevo') {
//     teacher.Nuevo.CurrentState.Form.Nombre = e;
//     this.globalStatusS.createOrUpdatePageOfEntity(
//       'Docente',
//       'Nuevo',
//       teacher.Nuevo
//     );
//   } else {
//     teacher.Actualizar.CurrentState.Form.Nombre = e;
//     this.globalStatusS.createOrUpdatePageOfEntity(
//       'Docente',
//       'Actualizar',
//       teacher.Actualizar
//     );
//   }
// });

// this.form.controls['ApellidoPaterno'].valueChanges.subscribe((e: any) => {
//   const globalStatus = this.globalStatusS.get();
//   const teacher = globalStatus.Docente;
//   if (this.router.url === '/mantenimientos/docentes/nuevo') {
//     teacher.Nuevo.CurrentState.Form.ApellidoPaterno = e;
//     this.globalStatusS.createOrUpdatePageOfEntity(
//       'Docente',
//       'Nuevo',
//       teacher.Nuevo
//     );
//   } else {
//     teacher.Actualizar.CurrentState.Form.ApellidoPaterno = e;
//     this.globalStatusS.createOrUpdatePageOfEntity(
//       'Docente',
//       'Actualizar',
//       teacher.Actualizar
//     );
//   }
// });

// this.form.controls['ApellidoMaterno'].valueChanges.subscribe((e: any) => {
//   const globalStatus = this.globalStatusS.get();
//   const teacher = globalStatus.Docente;
//   if (this.router.url === '/mantenimientos/docentes/nuevo') {
//     teacher.Nuevo.CurrentState.Form.ApellidoMaterno = e;
//     this.globalStatusS.createOrUpdatePageOfEntity(
//       'Docente',
//       'Nuevo',
//       teacher.Nuevo
//     );
//   } else {
//     teacher.Actualizar.CurrentState.Form.ApellidoMaterno = e;
//     this.globalStatusS.createOrUpdatePageOfEntity(
//       'Docente',
//       'Actualizar',
//       teacher.Actualizar
//     );
//   }
// });

// this.form.controls['CorreoPersonal'].valueChanges.subscribe((e: any) => {
//   const globalStatus = this.globalStatusS.get();
//   const teacher = globalStatus.Docente;
//   if (this.router.url === '/mantenimientos/docentes/nuevo') {
//     teacher.Nuevo.CurrentState.Form.CorreoPersonal = e;
//     this.globalStatusS.createOrUpdatePageOfEntity(
//       'Docente',
//       'Nuevo',
//       teacher.Nuevo
//     );
//   } else {
//     teacher.Actualizar.CurrentState.Form.CorreoPersonal = e;
//     this.globalStatusS.createOrUpdatePageOfEntity(
//       'Docente',
//       'Actualizar',
//       teacher.Actualizar
//     );
//   }
// });

// this.form.controls['CorreoInstitucional'].valueChanges.subscribe(
//   (e: any) => {
//     const globalStatus = this.globalStatusS.get();
//     const teacher = globalStatus.Docente;
//     if (this.router.url === '/mantenimientos/docentes/nuevo') {
//       teacher.Nuevo.CurrentState.Form.CorreoInstitucional = e;
//       this.globalStatusS.createOrUpdatePageOfEntity(
//         'Docente',
//         'Nuevo',
//         teacher.Nuevo
//       );
//     } else {
//       teacher.Actualizar.CurrentState.Form.CorreoInstitucional = e;
//       this.globalStatusS.createOrUpdatePageOfEntity(
//         'Docente',
//         'Actualizar',
//         teacher.Actualizar
//       );
//     }
//   }
// );

// this.form.controls['Celular'].valueChanges.subscribe((e: any) => {
//   const globalStatus = this.globalStatusS.get();
//   const teacher = globalStatus.Docente;
//   if (this.router.url === '/mantenimientos/docentes/nuevo') {
//     teacher.Nuevo.CurrentState.Form.Celular = e;
//     this.globalStatusS.createOrUpdatePageOfEntity(
//       'Docente',
//       'Nuevo',
//       teacher.Nuevo
//     );
//   } else {
//     teacher.Actualizar.CurrentState.Form.Celular = e;
//     this.globalStatusS.createOrUpdatePageOfEntity(
//       'Docente',
//       'Actualizar',
//       teacher.Actualizar
//     );
//   }
// });

// this.form.controls['Nombrado'].valueChanges.subscribe((e: any) => {
//   const globalStatus = this.globalStatusS.get();
//   const teacher = globalStatus.Docente;
//   if (this.router.url === '/mantenimientos/docentes/nuevo') {
//     teacher.Nuevo.CurrentState.Form.Nombrado = e;
//     this.globalStatusS.createOrUpdatePageOfEntity(
//       'Docente',
//       'Nuevo',
//       teacher.Nuevo
//     );
//   } else {
//     teacher.Actualizar.CurrentState.Form.Nombrado = e;
//     this.globalStatusS.createOrUpdatePageOfEntity(
//       'Docente',
//       'Actualizar',
//       teacher.Actualizar
//     );
//   }
// });

// this.form.controls['Grado'].valueChanges.subscribe((e: any) => {
//   const globalStatus = this.globalStatusS.get();
//   const teacher = globalStatus.Docente;
//   if (this.router.url === '/mantenimientos/docentes/nuevo') {
//     teacher.Nuevo.CurrentState.Form.Grado = e;
//     this.globalStatusS.createOrUpdatePageOfEntity(
//       'Docente',
//       'Nuevo',
//       teacher.Nuevo
//     );
//   } else {
//     teacher.Actualizar.CurrentState.Form.Grado = e;
//     this.globalStatusS.createOrUpdatePageOfEntity(
//       'Docente',
//       'Actualizar',
//       teacher.Actualizar
//     );
//   }
// });

// this.form.controls['TipoDocumento'].valueChanges.subscribe((e: any) => {
//   const globalStatus = this.globalStatusS.get();
//   const teacher = globalStatus.Docente;
//   if (this.router.url === '/mantenimientos/docentes/nuevo') {
//     teacher.Nuevo.CurrentState.Form.TipoDocumento = e;
//     this.globalStatusS.createOrUpdatePageOfEntity(
//       'Docente',
//       'Nuevo',
//       teacher.Nuevo
//     );
//   } else {
//     teacher.Actualizar.CurrentState.Form.TipoDocumento = e;
//     this.globalStatusS.createOrUpdatePageOfEntity(
//       'Docente',
//       'Actualizar',
//       teacher.Actualizar
//     );
//   }
// });

// this.form.controls['NumeroDocumento'].valueChanges.subscribe((e: any) => {
//   const globalStatus = this.globalStatusS.get();
//   const teacher = globalStatus.Docente;
//   if (this.router.url === '/mantenimientos/docentes/nuevo') {
//     teacher.Nuevo.CurrentState.Form.NumeroDocumento = e;
//     this.globalStatusS.createOrUpdatePageOfEntity(
//       'Docente',
//       'Nuevo',
//       teacher.Nuevo
//     );
//   } else {
//     teacher.Actualizar.CurrentState.Form.NumeroDocumento = e;
//     this.globalStatusS.createOrUpdatePageOfEntity(
//       'Docente',
//       'Actualizar',
//       teacher.Actualizar
//     );
//   }
// });
