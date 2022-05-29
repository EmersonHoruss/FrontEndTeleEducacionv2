import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { modalsDialog } from '../../constants/modals-dialog';
import { Router } from '@angular/router';
import { ModalsDialogService } from '../../../services/modals-dialog/modals-dialog.service';

@Component({
  selector: 'app-lift-new-update-content',
  templateUrl: './lift-new-update-content.component.html',
  styleUrls: ['./lift-new-update-content.component.scss'],
})
export class LiftNewUpdateContentComponent implements OnInit {
  liftRegisterForm = this.fb.group({
    date: [],
    startTime: [],
    endTime: [],
    link: [],
    numResolution: [],
    proyect: [],
  });

  proyects = [
    {
      Codigo: 0,
      Nombre:
        'RELACIÓN ENTRE LA CULTURA ORGANIZACIONAL Y LA MOTIVACIÓN LABORAL DE LOS TRABAJADORES EN LAINSTITUCIÓN EDUCATIVA SECUNDARIA JAVIER PÉREZ DE CUÉLLAR-LA VICTORIA-CHICLAYO-2015',
      Url: 'https://uwu.com',
    },
    {
      Codigo: 1,
      Nombre:
        'RELACIÓN ENTRE LA CULTURA ORGANIZACIONAL Y LA MOTIVACIÓN LABORAL DE LOS TRABAJADORES EN LAINSTITUCIÓN EDUCATIVA SECUNDARIA JAVIER PÉREZ DE CUÉLLAR-LA VICTORIA-CHICLAYO-2015',
      Url: 'https://uwu.com',
    },
    {
      Codigo: 3,
      Nombre:
        'RELACIÓN ENTRE LA CULTURA ORGANIZACIONAL Y LA MOTIVACIÓN LABORAL DE LOS TRABAJADORES EN LAINSTITUCIÓN EDUCATIVA SECUNDARIA JAVIER PÉREZ DE CUÉLLAR-LA VICTORIA-CHICLAYO-2015',
      Url: 'https://uwu.com',
    },
  ];

  constructor(
    private fb: FormBuilder,
    private dialogService: ModalsDialogService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  save() {
    const error = modalsDialog.error;
    this.dialogService.openModalDialog(error);
  }

  back() {
    this.router.navigateByUrl('programaciones/sustentaciones');
  }

  add() {
    // this.dialogService.openModalDialog(
    //   null,
    //   false,
    //   RegisterUpdateProyectsComponent,
    //   '50%',
    //   '70%'
    // );
  }

  update() {
    this.router.navigateByUrl('/mantenimientos/proyectos/actualizar');
  }
}
