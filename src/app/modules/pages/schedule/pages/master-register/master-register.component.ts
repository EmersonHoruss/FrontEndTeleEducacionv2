import { Component, OnInit } from '@angular/core';
import { Constants } from './master-register.constants';
import { WeekDayInterface } from '../../../../shared/interfaces/week-day-interface';
import { ConstantsRiSiBu } from './constants/left-side/left-side-buttons.constants';
import { ConstantsTaGe } from './constants/rigth-side/table/table-general.constants';

@Component({
  selector: 'app-master-register',
  templateUrl: './master-register.component.html',
  styleUrls: ['./master-register.component.scss'],
})
export class MasterRegisterComponent implements OnInit {
  constants = Constants;
  constantsRiSiBu = ConstantsRiSiBu;
  constantsTaGe = ConstantsTaGe;

  toggleFormValidate: boolean = false;
  formIsValid: string = 'INVALID';
  constructor() {}

  ngOnInit(): void {}

  selectedDays($event: Array<WeekDayInterface>) {
    console.log($event);
  }

  formValidate() {
    this.toggleFormValidate = !this.toggleFormValidate;
  }

  formIsValidEE($event: any) {
    // console.log('ASDKLFJASÑLDKFJ', $event);
    this.formIsValid = $event;
  }

  formValuesEE($event: any) {
    console.log($event);
  }
}
