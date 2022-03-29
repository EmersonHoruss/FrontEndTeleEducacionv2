import { Component, OnInit } from '@angular/core';
import { ConstantsIn } from './constants/input.constants';
import { ConstantsReUpBu } from './constants/reschedule-update/reschedule-update-button.constants';
import { ConstantsReUpIn } from './constants/reschedule-update/reschedule-update-input.constants';
import { ConstantsTaGe } from './constants/table/table-general.constants';

@Component({
  selector: 'app-master-reschedule',
  templateUrl: './master-reschedule.component.html',
  styleUrls: ['./master-reschedule.component.scss']
})
export class MasterRescheduleComponent implements OnInit {

  constantsInput = ConstantsIn;
  constantsTable = ConstantsTaGe;
  constantsReUpInput = ConstantsReUpIn;
  constantsReUpButton = ConstantsReUpBu;
  constructor() { }

  ngOnInit(): void {
  }

}
