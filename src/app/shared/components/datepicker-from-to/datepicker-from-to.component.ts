import { Component, OnInit, Input } from '@angular/core';
import { DateInterface } from '../../interfaces/date-interface';
import { DefaultDate } from '../../constants/default-date';
import { InputInterface } from '../../interfaces/input-interface';
import { DefaultInput } from '../../constants/default-input';
import { Constants } from './datepicker-from-to.constants';

@Component({
  selector: 'app-datepicker-from-to',
  templateUrl: './datepicker-from-to.component.html',
  styleUrls: ['./datepicker-from-to.component.scss'],
})
export class DatepickerFromToComponent implements OnInit {
  @Input() dateStart: DateInterface = Constants.dateStart;
  @Input() inputStart: InputInterface = Constants.inputStart;
  @Input() dateEnd: DateInterface = Constants.dateEnd;
  @Input() inputEnd: InputInterface = Constants.inputEnd;

  constructor() {}

  ngOnInit(): void {}
}
