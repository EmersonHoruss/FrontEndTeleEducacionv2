import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DefaultSelect } from '../../constants/default-select';
import { SelectInterface } from '../../interfaces/select-interface';
import { ApiService } from '../../../../services/api/api.service';
import { Observable } from 'rxjs';

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

  // This attributes are just for async
  dataIsLoaded: boolean = false;
  clicked: boolean = false;

  constructor() {}

  ngOnInit(): void {
    this.select.isAsync
      ? this.select.getHttp.subscribe((serviceData: any) => {
          for (const iterator of serviceData) this.data.push(iterator);
          this.dataIsLoaded = true;
        })
      : (this.data = this.select.items);
  }

  // for output
  selectionChange(itemValue: any) {
    this.selectedValue.emit(itemValue);
  }

  // for loading
  haveBeenClicked() {
    this.clicked = true;
  }

  // for loading
  showLoader(): boolean {
    return this.clicked && !this.dataIsLoaded && this.select.isAsync;
  }

  // for disabling
  itemToDisable(itemValue: any): boolean {
    const array: any = this.select.optionsToDisable;
    
    for (let index = 0; index < array!.length; index++)
      if (array[index] === itemValue) return true;
    return false;
  }
}
