import { Component, OnInit } from '@angular/core';
import { modalsDialog } from 'src/app/modules/shared/constants/modals-dialog';
import { ModalsDialogService } from '../../../../services/modals-dialog/modals-dialog.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss'],
})
export class StartComponent implements OnInit {
  
  constructor(private modalDialogService: ModalsDialogService) {}

  ngOnInit(): void {}

  openModal() {
    this.modalDialogService.successModalDialog(modalsDialog.success);
  }
}
