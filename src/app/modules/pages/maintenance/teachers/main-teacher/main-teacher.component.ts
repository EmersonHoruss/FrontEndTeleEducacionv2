import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { ModalsDialogService } from '../../../../../services/modals-dialog/modals-dialog.service';
import { modalsDialog } from 'src/app/modules/shared/constants/modals-dialog';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-main-teacher',
  templateUrl: './main-teacher.component.html',
  styleUrls: ['./main-teacher.component.scss'],
})
export class MainTeacherComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  titlePage: string;

  data: any;
  dataHelp: any = [];
  columns = [
    'Docente',
    'Celular',
    'Correo Insitucional',
    'Tipo de Documento',
    '# de Documento',
    'Acciones',
  ];
  noData = 'Sin docentes por mostrar.';
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
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.data.paginator = this.paginator;
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

  list() {
    this.isLoadingData = true;
    this.http
      .get(`/api/Docentes/null/${this.isInMaintenance}`)
      .subscribe((e: any) => {
        this.isLoadingData = false;

        this.dataHelp = e.data;
        this.data = new MatTableDataSource(this.dataHelp);
        this.data.paginator = this.paginator;
      });
  }

  goToGetItBack() {
    this.router.navigateByUrl('/mantenimientos/docentes/recuperar');
  }

  goToAddNew() {
    this.router.navigateByUrl('/mantenimientos/docentes/nuevo');
  }

  goToUpdate(teacher: any) {
    localStorage.setItem('teacher', JSON.stringify(teacher));
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
}

// modalsDialog;
// console.log(ModalsDialogComponent);
// this.modalsS.openModalDialog(modalsDialog.error);
