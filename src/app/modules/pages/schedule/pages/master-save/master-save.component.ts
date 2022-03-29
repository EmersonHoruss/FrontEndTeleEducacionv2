import { Component, OnInit } from '@angular/core';
import { ConstantsIn } from './constants/input.constants';
import { ConstantsReUpBu } from './constants/reschedule-update/reschedule-update-button.constants';
import { ConstantsReUpIn } from './constants/reschedule-update/reschedule-update-input.constants';
import { ConstantsReUpTeAr } from './constants/reschedule-update/reschedule-update-text-area.constants';
import { ConstantsTaGe } from './constants/table/table-general.constants';

@Component({
  selector: 'app-master-save',
  templateUrl: './master-save.component.html',
  styleUrls: ['./master-save.component.scss']
})
export class MasterSaveComponent implements OnInit {
  
  constantsInput = ConstantsIn;
  constantsTable = ConstantsTaGe;
  constantsReUpInput = ConstantsReUpIn;
  constantsReUpButton = ConstantsReUpBu;
  constantsReUpTextArea = ConstantsReUpTeAr;

  constructor() { }

  ngOnInit(): void {
  }

}
