import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalsDialogComponent } from 'src/app/modules/shared/components/modals-dialog/modals-dialog.component';
import { ModalsDialogInterface } from '../../modules/shared/interfaces/modals-dialog-interface';

@Injectable({
  providedIn: 'root',
})
export class ModalsDialogService {
  width: string = '15rem';
  height: string = '17rem';

  openedModalDialog: any = undefined;

  constructor(private matDialog: MatDialog) {}

  openModalDialog(
    data: ModalsDialogInterface,
    disableClose: boolean = false,
  ) {
    const matDialogRef = this.matDialog.open(ModalsDialogComponent, {
      data,
      width: this.width,
      height: this.height,
      disableClose,
    });
  }

  closeLastOpenedModalDialog() {
    // const modalDialogRef: MatDialogRef = this.matDialog.openDialogs[0]
    const numberOpenedDialog: number = this.matDialog.openDialogs.length;
    const lastModalDialogRef: MatDialogRef<any> =
      this.matDialog.openDialogs[numberOpenedDialog - 1];

    lastModalDialogRef.close();
  }

  openModalDialogv2(){

  }
}
