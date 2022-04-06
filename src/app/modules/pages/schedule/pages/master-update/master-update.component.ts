import { Component, OnInit } from '@angular/core';
import { Constants } from './master-update.constants';
import { ConstantsRiSiBu } from './constants/left-side/left-side-buttons.constants';
import { ConstantsTaGe } from './constants/rigth-side/table/table-general.constants';

@Component({
  selector: 'app-master-update',
  templateUrl: './master-update.component.html',
  styleUrls: ['./master-update.component.scss']
})
export class MasterUpdateComponent implements OnInit {
  constants = Constants;
  constantsRiSiBu = ConstantsRiSiBu;
  constantsTaGe = ConstantsTaGe;

  constructor() { }

  ngOnInit(): void {
  }

  update(){}

  cancel(){}

}
