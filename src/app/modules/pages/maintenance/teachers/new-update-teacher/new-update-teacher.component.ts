import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalsDialogService } from '../../../../../services/modals-dialog/modals-dialog.service';
import { HttpClient } from '@angular/common/http';
import { modalsDialog } from '../../../../shared/constants/modals-dialog';

@Component({
  selector: 'app-new-update-teacher',
  templateUrl: './new-update-teacher.component.html',
  styleUrls: ['./new-update-teacher.component.scss'],
})
export class NewUpdateTeacherComponent implements OnInit {
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
    Nombrado: [false],
    Grado: ['N'],
    TipoDocumento: ['DNI'],
    NumeroDocumento: ['', [Validators.maxLength(30)]],
  });

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
    this.router.url === '/mantenimientos/docentes/nuevo'
      ? (this.titlePage = 'Docente Nuevo')
      : this.router.url === '/mantenimientos/docentes/actualizar'
      ? (this.titlePage = 'Actualizar Docente')
      : (this.titlePage = 'Error al cargar el título de la página');
  }

  loadData() {
    if (this.router.url === '/mantenimientos/docentes/actualizar') {
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
      this.form.controls['Nombrado'].setValue(
        teacher['Nombrado'] == 0 ? false : true
      );
      this.form.controls['Grado'].setValue(teacher['Grado']);
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
      if (this.router.url === '/mantenimientos/docentes/actualizar') {
        const deserializateTeacher = this.deserializateTeacher();
        objectToSendBackend.Codigo = deserializateTeacher.Codigo;
      }

      const dynamicHttp: any =
        this.router.url === '/mantenimientos/docentes/nuevo'
          ? this.http.post('/api/Docentes', objectToSendBackend)
          : this.http.patch('/api/Docentes', objectToSendBackend);
      console.log(objectToSendBackend);

      dynamicHttp.subscribe(
        (e: any) => {
          this.modalsS.closeLastOpenedModalDialog();

          const modal = modalsDialog.success;

          this.router.url === '/mantenimientos/docentes/nuevo'
            ? (modal.description =
                'Se ha guardado el docente satisfactoriamente.')
            : (modal.description =
                'Se ha actualizado el docente satisfactoriamente.');

          this.modalsS.openModalDialog(modal);
          this.router.navigateByUrl('/mantenimientos/docentes');
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
    this.router.navigateByUrl('/mantenimientos/docentes');
  }

  getError(controlName: string): any {
    return { error: false, msg: '' };
  }

  deserializateTeacher(): any {
    const teacher: any = localStorage.getItem('teacher');
    return JSON.parse(teacher);
  }
}
