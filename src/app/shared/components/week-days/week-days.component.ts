import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Constants } from './week-days.constants';
import { WeekDayInterface } from '../../interfaces/week-day-interface';
import { DefaultInput } from '../../constants/default-input';

@Component({
  selector: 'app-week-days',
  templateUrl: './week-days.component.html',
  styleUrls: ['./week-days.component.scss'],
})
export class WeekDaysComponent implements OnInit {
  @Output() weekDays: EventEmitter<Array<WeekDayInterface>> = new EventEmitter<
    Array<WeekDayInterface>
  >();

  isDisabled: boolean = true;
  constants = Constants;

  constructor() {}

  ngOnInit(): void {}

  toggleDay(index: number) {
    if (!this.isDisabled) {
      this.constants.weekDays[index].selected =
        !this.constants.weekDays[index].selected;

      this.weekDays.emit(this.constants.weekDays);
    }
  }

  toggleIsDiabled($event: boolean) {
    this.resetDays();
    this.isDisabled = !this.isDisabled;
    console.log(this.isDisabled);
  }

  resetDays() {
    for (let index = 0; index < this.constants.weekDays.length; index++) {
      const weekDay = this.constants.weekDays[index];
      weekDay.selected = false;
    }
    this.weekDays.emit([]);
  }
}
