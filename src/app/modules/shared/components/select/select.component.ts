import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { DefaultSelect } from '../../constants/default-select';
import { SelectInterface } from '../../interfaces/select-interface';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent implements OnInit, OnChanges {
  @Input() select: SelectInterface = DefaultSelect;
  @Input() reset: string | number = 0;
  @Output() selectedValue: EventEmitter<string | number> = new EventEmitter<
    string | number
  >();
  data: any = [];
  valuee = '';

  // This attributes are just for async
  dataIsLoaded: boolean = false;
  clicked: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    // console.log(changes['reset']);
    // // this.data = [];
    // // if (changes['reset'] !== undefined) {
    //   this.dataIsLoaded = false;
    //   this.clicked = false;
    //   this.data = [];
    //   this.valuee = '';
    // // }
    // console.log(
    //   this.clicked,
    //   this.dataIsLoaded,
    //   this.select.isAsync,
    //   this.isDisabled()
    // );
  }

  // for output
  selectionChange(itemValue: any) {
    this.selectedValue.emit(itemValue);
  }

  // for loading
  haveBeenClicked() {
    this.clicked = true;
    this.select.isAsync
      ? this.select.getHttp.subscribe(
          (serviceData: any) => {
            this.data = [];
            // console.log(serviceData);

            const data = serviceData.data;
            for (const iterator of data) this.data.push(iterator);
            this.dataIsLoaded = true;
          },
          (e: any) => {
            // console.log(e);
          }
        )
      : (this.data = this.select.items);
  }

  // for loading
  showLoader(): boolean {
    return (
      this.clicked &&
      !this.dataIsLoaded &&
      this.select.isAsync &&
      !this.isDisabled()
    );
  }

  // for disabling
  itemToDisable(itemValue: any): boolean {
    const array: any = this.select.optionsToDisable;

    for (let index = 0; index < array!.length; index++)
      if (array[index] === itemValue) return true;
    return false;
  }

  isDisabled(): boolean {
    return this.select.disabled ? true : false;
  }
}
