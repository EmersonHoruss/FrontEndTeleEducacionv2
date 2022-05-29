import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { DefaultDate } from '../../constants/default-date';
import { DateInterface } from '../../interfaces/date-interface';
import * as moment from 'moment';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss'],
})
export class DateComponent implements OnInit {
  // START: INPUT OUTPUT VARIABLES
  @Input() date: DateInterface = DefaultDate;
  @Output() selectedDate = new EventEmitter<any>();
  // END: INPUT OUTPUT VARIABLES

  // START: LOCAL VARIABLES
  formatoEntrada = 'DD/MM/YYYY';
  formatoSalida = 'YYYY-MM-DD';
  // END: LOCAL VARIABLES

  constructor() {}

  ngOnInit(): void {}

  setDate(dateHtml: any) {
    const date = dateHtml.targetElement.value;
    const dateFormatedIn = moment(date, this.formatoEntrada);
    const dateFormatedOut = dateFormatedIn.format(this.formatoSalida);
    this.selectedDate.emit(dateFormatedOut);
  }
}
