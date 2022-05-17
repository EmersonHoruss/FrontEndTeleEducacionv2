import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { TitlePageInterface } from '../../../../shared/interfaces/title-page-interface';
import { DefaultTitlePage } from '../../../../shared/constants/default-title-page';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ModalsDialogService } from 'src/app/services/modals-dialog/modals-dialog.service';
import { ModalMemberComponent } from '../modal-member/modal-member.component';

@Component({
  selector: 'app-new-update-project',
  templateUrl: './new-update-project.component.html',
  styleUrls: ['./new-update-project.component.scss'],
})
export class NewUpdateProjectComponent implements OnInit {
  titlePage: TitlePageInterface = JSON.parse(JSON.stringify(DefaultTitlePage));

  columns = ['Participante', 'Rol', 'Acciones'];
  data: any;
  dataHelp = [];
  noData = 'Sin participantes por mostrar.';

  newUpdateForm = this.fb.group({
    project: [],
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private dialogService: ModalsDialogService
  ) {
    this.settingTitlePage();
    this.data = new MatTableDataSource(this.dataHelp);
  }

  ngOnInit(): void {}

  settingTitlePage() {
    this.router.url === '/mantenimientos/proyectos/nuevo'
      ? (this.titlePage.titlePage = 'Nuevo Proyecto')
      : this.router.url === '/mantenimientos/proyectos/actualizar'
      ? (this.titlePage.titlePage = 'Actualizar Proyecto')
      : (this.titlePage.titlePage = 'Error to load title page');
  }

  // BUTTONS TABLE
  add() {
    this.dialogService.openModalDialog(
      null,
      false,
      ModalMemberComponent,
      '60%',
      '55%'
    );
  }

  update(member: any) {
    console.log('update', member);
  }

  delete(member: any) {
    console.log('delete', member);
  }

  // BUTTONS FORM
  back() {
    this.router.navigateByUrl('/mantenimientos/proyectos');
  }

  save() {}

  goNewOrUpdateScheduleLift() {}
}
