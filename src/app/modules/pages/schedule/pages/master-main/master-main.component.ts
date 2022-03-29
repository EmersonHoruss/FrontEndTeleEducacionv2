import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { modalsDialog } from 'src/app/modules/shared/constants/modals-dialog';
import { ModalsDialogService } from 'src/app/services/modals-dialog/modals-dialog.service';
import { Constants } from './master-main.constants';
import { ConstantsTaBu } from './constants/table/table-buttons.constants';
import { ConstantsTaGe } from './constants/table/table-general.constants';

@Component({
  selector: 'app-master-main',
  templateUrl: './master-main.component.html',
  styleUrls: ['./master-main.component.scss'],
})
export class MasterMainComponent implements OnInit {
  //INICIO: VARIABLES CON CONFIGURACIÓN PERSONALIZADA
  constants = Constants;
  //FIN: VARIABLES CON CONFIGURACIÓN PERSONALIZADA

  // INICIO: VARIABLES CON COMUNICACION A INPUTS
  programa = {
    placeholder: 'Seleccione maestría',
    http: this.http.get('api/Programas/MA'),
  };

  codigoCoordinador: null | undefined = null;
  switchedProgramaSelect: boolean = false;
  registrarUrl = './';
  searchAvailable = false;

  nameTable = 'Programaciones curso';
  columnsTable = [
    'Profesor',
    'Correo',
    'Celular',
    'Fecha de Inicio',
    'Fecha de Fin',
    'Acciones',
  ];
  buttonActionsTable = ConstantsTaGe.table.buttonsActions;
  // FIN: VARIABLES CON COMUNICACION A INPUTS

  // INICIO: VARIABLES LOCALES
  programaSeleccionado: any = null;
  cursoSeleccionado: any = null;
  coordinadorEncontrado: any = null;
  // FIN: VARIABLES LOCALES

  constructor(
    private http: HttpClient,
    private dialogService: ModalsDialogService
  ) {}

  ngOnInit(): void {}

  programaEE($event: any) {
    this.programaSeleccionado = $event;
    this.codigoCoordinador = this.programaSeleccionado.CodigoCoordinador;
    this.switchedProgramaSelect = !this.switchedProgramaSelect;
  }

  cursoEE($event: any) {
    this.cursoSeleccionado = $event;
    this.setRegisterUrl();
  }

  clickedRegisterBtnEE($event: any) {
    this.coordinadorEncontrado = $event;

    this.cursoSeleccionado
      ? this.saveCursoProgramaLS()
      : this.openErrorModalRegisterBtn();
  }

  setRegisterUrl() {
    this.cursoSeleccionado
      ? (this.registrarUrl = './registrar')
      : (this.registrarUrl = './');
  }

  openErrorModalRegisterBtn() {
    const modalError = modalsDialog.error;
    modalError.description = 'Seleccione curso.';

    this.dialogService.openModalDialog(modalError);
  }

  saveCursoProgramaLS() {
    const cursoPrograma = {
      curso: this.cursoSeleccionado,
      programa: this.programaSeleccionado,
      coordinador: this.coordinadorEncontrado,
    };

    localStorage.setItem('cursoPrograma', JSON.stringify(cursoPrograma));
  }
}
