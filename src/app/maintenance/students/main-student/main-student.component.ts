import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ModalsDialogService } from '../../../services/modals-dialog/modals-dialog.service';
import { modalsDialog } from '../../../shared/constants/modals-dialog';

@Component({
  selector: 'app-main-student',
  templateUrl: './main-student.component.html',
  styleUrls: ['./main-student.component.scss'],
})
export class MainStudentComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  titlePage: string;

  data: any;
  dataHelp: any = [];
  columns = [
    'Estudiante',
    'Celular',
    'Correo Insitucional',
    'Tipo de Documento',
    '# de Documento',
    'Acciones',
  ];
  noData = 'Sin estudiantes por mostrar.';
  isInMaintenance = true;
  isLoadingData = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private modalsS: ModalsDialogService,
    private dialog: MatDialog
  ) {
    this.settingTitlePage();
    this.settingVisibitlyButtonsAcoordingPage();

    this.data = new MatTableDataSource(this.dataHelp);
    console.log(this.isInMaintenance)
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.data.paginator = this.paginator;
  }

  settingTitlePage() {
    this.router.url === '/mantenimientos/estudiantes'
      ? (this.titlePage = 'Mantenimientos de Estudiantes')
      : this.router.url === '/mantenimientos/estudiantes/recuperar'
      ? (this.titlePage = 'Recuperar Estudiantes')
      : (this.titlePage = 'Error al establecer Título de Página');
  }

  settingVisibitlyButtonsAcoordingPage() {
    this.router.url === '/mantenimientos/estudiantes'
      ? (this.isInMaintenance = true)
      : this.router.url === '/mantenimientos/estudiantes/recuperar'
      ? (this.isInMaintenance = false)
      : (this.isInMaintenance = false);
  }

  list() {
    this.isLoadingData = true;
    this.http
      .get(`/api/Estudiantes/null/${this.isInMaintenance}`)
      .subscribe((e: any) => {
        this.isLoadingData = false;

        this.dataHelp = e.data;
        this.data = new MatTableDataSource(this.dataHelp);
        this.data.paginator = this.paginator;
      });
  }

  goToGetItBack() {
    this.router.navigateByUrl('/mantenimientos/estudiantes/recuperar');
  }

  goToAddNew() {
    this.router.navigateByUrl('/mantenimientos/estudiantes/nuevo');
  }

  goToUpdate(student: any) {
    localStorage.setItem('student', JSON.stringify(student));
    this.router.navigateByUrl('/mantenimientos/estudiantes/actualizar');
  }

  gotToBack() {
    this.router.navigateByUrl('/mantenimientos/estudiantes');
  }

  delete(student: any) {
    const confirmDialog = modalsDialog.confirm;
    confirmDialog.description =
      'Eliminar el(la) estudiante:' + student.Estudiante;

    this.modalsS.openModalDialog(confirmDialog);
    this.modalsS.afterClosedLastModalsDialog().subscribe((e: any) => {
      // console.log('123')
      if (e === true) {
        // console.log('1234')
        this.modalsS.openModalDialog(modalsDialog.load, true);
        this.http
          .patch('/api/Estudiantes', {
            Codigo: student.Codigo,
            Vigencia: false,
          })
          .subscribe(
            (e: any) => {
              this.modalsS.closeLastOpenedModalDialog();

              const successDialog = modalsDialog.success;
              successDialog.description =
                'Se ha eliminado estudiante satisfactoriamente.';
              this.modalsS.openModalDialog(successDialog);

              this.dataHelp = this.dataHelp.filter(
                (e: any) => e.Codigo !== student.Codigo
              );
              this.data = new MatTableDataSource(this.dataHelp);
              this.data.paginator = this.paginator;

              localStorage.removeItem('student');
            },
            (err: any) => {
              this.modalsS.closeLastOpenedModalDialog();
              const errorDialog = modalsDialog.error;
              errorDialog.description =
                'Ha surgido un error al tratar de eliminar estudiante.';
              this.modalsS.openModalDialog(errorDialog);
            }
          );
      }
    });
  }

  getBack(student: any) {
    const confirmDialog = modalsDialog.confirm;
    confirmDialog.description =
      'Recuperar el(la) estudiante:' + student.Estudiante;

    this.modalsS.openModalDialog(confirmDialog);
    this.modalsS.afterClosedLastModalsDialog().subscribe((e: any) => {
      // console.log('123')
      if (e === true) {
        // console.log('1234')
        this.modalsS.openModalDialog(modalsDialog.load, true);
        this.http
          .patch('/api/Estudiantes', { Codigo: student.Codigo, Vigencia: true })
          .subscribe(
            (e: any) => {
              this.modalsS.closeLastOpenedModalDialog();

              const successDialog = modalsDialog.success;
              successDialog.description =
                'Se ha recuperado estudiante satisfactoriamente.';
              this.modalsS.openModalDialog(successDialog);

              this.dataHelp = this.dataHelp.filter(
                (e: any) => e.Codigo !== student.Codigo
              );
              this.data = new MatTableDataSource(this.dataHelp);
              this.data.paginator = this.paginator;
            },
            (err: any) => {
              this.modalsS.closeLastOpenedModalDialog();
              const errorDialog = modalsDialog.error;
              errorDialog.description =
                'Ha surgido un error al tratar de recuperar estudiante.';
              this.modalsS.openModalDialog(errorDialog);
            }
          );
      }
    });
  }
}
