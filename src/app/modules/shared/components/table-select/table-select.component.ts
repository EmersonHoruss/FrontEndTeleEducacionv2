import { Component, Input, Output } from '@angular/core';

@Component({
  selector: 'app-table-select',
  templateUrl: './table-select.component.html',
  styleUrls: ['./table-select.component.scss'],
})
export class TableSelectComponent {
  @Input() columns: Array<string> = [];
  @Input() dataSource = [];
  @Output() selectedRow = { index: '0' };

  constructor() {}

  setSelectedRow(row: any) {
    this.selectedRow.index = row.index;
  }

  isSelectedRow(row: any) {
    return row.index === this.selectedRow.index;
  }

  foods= [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'},
  ];
}
