import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalsDialogComponent } from 'src/app/modules/shared/components/modals-dialog/modals-dialog.component';
import { modalsDialog } from 'src/app/modules/shared/constants/modals-dialog';
import { ModalsDialogInterface } from '../../modules/shared/interfaces/modals-dialog-interface';

@Injectable({
  providedIn: 'root',
})
export class ModalsDialogService {
  width: string = '15rem';
  height: string = '17rem';

  constructor(private matDialog: MatDialog) {}

  successModalDialog(data: ModalsDialogInterface) {
    this.matDialog.open(ModalsDialogComponent, {
      data,
      width: this.width,
      height: this.height,
      disableClose: false,
    });
  }

  warningModalDialog() {}

  errorModalDialog() {}

  confirmModalDialog() {}

  loadingModalDialog() {}
}
