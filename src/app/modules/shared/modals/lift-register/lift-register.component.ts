import { Component, OnInit } from '@angular/core';
import { ModalsDialogService } from '../../../../services/modals-dialog/modals-dialog.service';
import { modalsDialog } from '../../constants/modals-dialog';
import { FormBuilder } from '@angular/forms';
import { RegisterUpdateProyectsComponent } from '../register-update-proyects/register-update-proyects.component';

@Component({
  selector: 'app-lift-register',
  templateUrl: './lift-register.component.html',
  styleUrls: ['./lift-register.component.scss'],
})
export class LiftRegisterComponent implements OnInit {
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
        'asdffffffffjlkñlkñklñklñklñklñlkñklñklñklñlkñlkñlkñlkñklñklñklñklñlñlñlñlñflñasdlñlñsdsdsdsdsdlkjñfasd',
      Url: 'https://uwu.com',
    },
    {
      Codigo: 1,
      Nombre:
        '1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890',
      Url: 'https://uwu.com',
    },
  ];

  constructor(
    private fb: FormBuilder,
    private dialogService: ModalsDialogService
  ) {}

  ngOnInit(): void {}

  accept() {
    const error = modalsDialog.error;
    this.dialogService.openModalDialog(error);
  }

  cancel() {}

  mngProyects() {
    this.dialogService.openModalDialog(
      null,
      false,
      RegisterUpdateProyectsComponent,
      '50%',
      '70%'
    );
  }
}
