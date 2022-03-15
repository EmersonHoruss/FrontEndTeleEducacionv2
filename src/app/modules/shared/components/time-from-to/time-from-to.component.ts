import { Component, Input, OnInit } from '@angular/core';
import { InputInterface } from '../../interfaces/input-interface';
import { DefaultInput } from '../../constants/default-input';
import { Constants } from './time-from-to.constants';

@Component({
  selector: 'app-time-from-to',
  templateUrl: './time-from-to.component.html',
  styleUrls: ['./time-from-to.component.scss'],
})
export class TimeFromToComponent implements OnInit {
  @Input() inputTextStart: InputInterface = Constants.inputTextStart;
  @Input() inputTimeStart: InputInterface = Constants.inputTimeStart;
  @Input() inputTextEnd: InputInterface = Constants.inputTextEnd;
  @Input() inputTimeEnd: InputInterface = Constants.inputTimeEnd;

  constructor() {}

  ngOnInit(): void {}
}
