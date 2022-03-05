import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { modalsDialog } from '../../constants/modals-dialog';
import { ModalsDialogInterface } from '../../interfaces/modals-dialog-interface';
@Component({
  selector: 'app-modals-dialog',
  templateUrl: './modals-dialog.component.html',
  styleUrls: ['./modals-dialog.component.scss'],
})
export class ModalsDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: ModalsDialogInterface) {
    // console.log(modalsDialog);
  }

  ngOnInit(): void {}
}

// [icon]="listIcons[0]"
