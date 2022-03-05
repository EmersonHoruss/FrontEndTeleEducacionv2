import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DefaultSelect } from '../../constants/default-select';
import { SelectInterface } from '../../interfaces/select-interface';
import { ApiService } from '../../../../services/api/api.service';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent implements OnInit {
  @Input() select: SelectInterface = DefaultSelect;
  @Output() selectedValue: EventEmitter<string | number> = new EventEmitter<
    string | number
  >();

  data: any = [];

  constructor(private apiService: ApiService) {
    console.log(this.select);
  }

  selectionChange(itemValue: any) {
    this.selectedValue.emit(itemValue);
  }

  ngOnInit(): void {
    this.apiService.getProfiles().subscribe((e) => {
      console.log(e, typeof e);
      const h = { itemValue: '', viewValue: '' };
      this.data.push(h);
    });
  }
}
