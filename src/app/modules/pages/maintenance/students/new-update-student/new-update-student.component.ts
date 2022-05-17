import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ModalsDialogService } from '../../../../../services/modals-dialog/modals-dialog.service';
import { modalsDialog } from '../../../../shared/constants/modals-dialog';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-new-update-student',
  templateUrl: './new-update-student.component.html',
  styleUrls: ['./new-update-student.component.scss'],
})
export class NewUpdateStudentComponent implements OnInit {
  titlePage = '';

  documentTypes = [
    { Codigo: 'DNI', Nombre: 'DNI' },
    { Codigo: 'Extranjero', Nombre: 'Extranjero' },
  ];

  form = this.fb.group({
    Nombre: ['', [Validators.required, Validators.maxLength(50)]],
    ApellidoPaterno: ['', [Validators.required, Validators.maxLength(50)]],
    ApellidoMaterno: ['', [Validators.maxLength(50)]],
    CorreoPersonal: ['', [Validators.maxLength(50)]],
    CorreoInstitucional: ['', [Validators.maxLength(50)]],
    Celular: ['', [Validators.maxLength(20)]],
    TipoDocumento: ['DNI'],
    NumeroDocumento: ['', [Validators.maxLength(30)]],
  });

  // ENTRANTS
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  data: any;
  dataHelp: any = [];
  columns = [
    'Fecha de Ingreso',
    'Programa',
    'Curricula',
    'Admision',
    'Acciones',
  ];
  noData = 'Sin estudiantes por mostrar.';
  isInMaintenance = true;
  isLoadingData = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private modalsS: ModalsDialogService
  ) {
    this.setTitlePage();
    this.loadData();
  }

  ngOnInit(): void {}

  setTitlePage() {
    this.router.url === '/mantenimientos/estudiantes/nuevo'
      ? (this.titlePage = 'Estudiante Nuevo')
      : this.router.url === '/mantenimientos/estudiantes/actualizar'
      ? (this.titlePage = 'Actualizar Estudiante')
      : (this.titlePage = 'Error al cargar el título de la página');
  }

  loadData() {
    if (this.router.url === '/mantenimientos/estudiantes/actualizar') {
      const teacher = this.deserializateTeacher();
      this.form.controls['Nombre'].setValue(teacher.Nombre);
      this.form.controls['ApellidoPaterno'].setValue(
        teacher['Apellido Paterno']
      );
      this.form.controls['ApellidoMaterno'].setValue(
        teacher['Apellido Materno']
      );

      this.form.controls['CorreoPersonal'].setValue(teacher['Correo Personal']);
      this.form.controls['CorreoInstitucional'].setValue(
        teacher['Correo Institucional']
      );
      this.form.controls['Celular'].setValue(teacher['Celular']);
      this.form.controls['TipoDocumento'].setValue(
        teacher['Tipo de Documento']
      );
      this.form.controls['NumeroDocumento'].setValue(
        teacher['Numero de Documento']
      );
    }
  }

  save() {
    for (const key in this.form.controls) {
      this.form.controls[key].markAsTouched();
    }

    if (this.form.status === 'INVALID') {
      const modal = modalsDialog.error;
      modal.description = 'El formulario es inválido.';
      this.modalsS.openModalDialog(modal);
    } else {
      this.modalsS.openModalDialog(modalsDialog.load, true);
      const objectToSendBackend = this.form.value;
      if (this.router.url === '/mantenimientos/estudiantes/actualizar') {
        const deserializateTeacher = this.deserializateTeacher();
        objectToSendBackend.Codigo = deserializateTeacher.Codigo;
      }

      const dynamicHttp: any =
        this.router.url === '/mantenimientos/estudiantes/nuevo'
          ? this.http.post('/api/Estudiantes', objectToSendBackend)
          : this.http.patch('/api/Estudiantes', objectToSendBackend);
      console.log(objectToSendBackend);

      dynamicHttp.subscribe(
        (e: any) => {
          this.modalsS.closeLastOpenedModalDialog();

          const modal = modalsDialog.success;

          this.router.url === '/mantenimientos/estudiantes/nuevo'
            ? (modal.description =
                'Se ha guardado el estudiante satisfactoriamente.')
            : (modal.description =
                'Se ha actualizado el estudiante satisfactoriamente.');

          this.modalsS.openModalDialog(modal);
          this.router.navigateByUrl('/mantenimientos/estudiantes');
        },
        (err: any) => {
          this.modalsS.closeLastOpenedModalDialog();

          const modal = modalsDialog.error;
          modal.description = 'Ha surgido un error.';

          this.modalsS.openModalDialog(modal);
        }
      );
    }
  }

  back() {
    this.router.navigateByUrl('/mantenimientos/estudiantes');
  }

  getError(controlName: string): any {
    return { error: false, msg: '' };
  }

  deserializateTeacher(): any {
    const teacher: any = localStorage.getItem('student');
    return JSON.parse(teacher);
  }

  // ENTRANTS PART
  showMaintenanceEntrants() {}
}
