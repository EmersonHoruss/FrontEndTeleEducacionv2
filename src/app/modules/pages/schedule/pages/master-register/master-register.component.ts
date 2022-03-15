import { Component, OnInit } from '@angular/core';
import { Constants } from './master-register.constants';
import { WeekDayInterface } from '../../../../shared/interfaces/week-day-interface';

@Component({
  selector: 'app-master-register',
  templateUrl: './master-register.component.html',
  styleUrls: ['./master-register.component.scss'],
})
export class MasterRegisterComponent implements OnInit {
  constants = Constants;

  constructor() {}

  ngOnInit(): void {}

  selectedDays($event: Array<WeekDayInterface>) {
    console.log($event);
  }
}
