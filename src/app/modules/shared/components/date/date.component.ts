import { Component, OnInit,Input } from '@angular/core';
import { DefaultDate } from '../../constants/default-date';
import { DateInterface } from '../../interfaces/date-interface';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss']
})
export class DateComponent implements OnInit {
  @Input() date: DateInterface = DefaultDate;
  constructor() { }

  ngOnInit(): void {
  }

}
