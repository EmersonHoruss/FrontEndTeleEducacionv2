import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ModalsDialogService } from '../../../../../services/modals-dialog/modals-dialog.service';

@Component({
  selector: 'app-modal-member',
  templateUrl: './modal-member.component.html',
  styleUrls: ['./modal-member.component.scss'],
})
export class ModalMemberComponent implements OnInit {
  @Input() titleModal = 'Nuevo Proyecto';
  @Input() updateMember = null;

  members = [
    { Codigo: 1, Nombre: 'Julio Bernal Santisteban Santisteban' },
    { Codigo: 2, Nombre: 'Alfonso Tomate Agustino Clérigo' },
    { Codigo: 3, Nombre: 'Julieta Tomaza Pazos Aquino' },
  ];
  rolMember = [
    { Codigo: 1, Nombre: 'Autor' },
    { Codigo: 2, Nombre: 'Asesor' },
    { Codigo: 3, Nombre: 'Presidente' },
    { Codigo: 4, Nombre: 'Secretario' },
    { Codigo: 5, Nombre: 'Vocal' },
  ];

  newUpdateForm = this.fb.group({
    member: [],
    program: [],
    rolMember: [],
  });

  constructor(
    private fb: FormBuilder,
    private dialogSerive: ModalsDialogService
  ) {}

  ngOnInit(): void {}

  add() {}

  cancel() {
    this.dialogSerive.closeLastOpenedModalDialog();
  }

  getError(control: string): any {
    const errors = this.newUpdateForm.controls[control].errors;

    if (errors) {
      if (errors.hasOwnProperty('required'))
        return {
          error: true,
          msg:
            'Seleccione un' +
            (control === 'rolMember'
              ? ' rol.'
              : control === 'member'
              ? ' integrante.'
              : control === 'program'
              ? ' programa.'
              : ' error showing errors.'),
        };
    }
    return { error: false, msg: '' };
  }
}
