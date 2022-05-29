import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Constants } from './datepicker.constants';
import { DateInterface } from '../../interfaces/date-interface';
import { InputInterface } from '../../interfaces/input-interface';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
})
export class DatepickerComponent implements OnInit {
  constants = Constants;
  @Input() date: DateInterface = Constants.dateStart;
  @Input() input: InputInterface = Constants.inputStart;
  @Output() selectedDate = new EventEmitter<any>();
  constructor() {}

  ngOnInit(): void {}

  selectedDateEE($event: any) {
    // console.log($event);
    this.selectedDate.emit($event);
  }
}
