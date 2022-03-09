import {
  Component,
  OnInit,
  OnDestroy,
  ViewEncapsulation,
  ViewChild,
} from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { Options, DataService } from './data.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent implements OnInit {
  constructor(private optionService: DataService) {}


  hint = 'list of options';

  isAlive = false;
  options: Options[] = [];
  selected = new FormControl(null, [Validators.required]);
  savedValue: number = 0;
  isLoading = false;
  isOpen = false;
  loadID = 0;

  ngOnInit() {
    this.isAlive = true;
    this.optionService.options.subscribe((serviceData: any) => {
      if (serviceData && this.isLoading && this.loadID === serviceData.loadID) {
        this.options = serviceData.options === null ? [] : serviceData.options;
        this.isLoading = false;
        if (
          this.options &&
          this.options.length &&
          this.savedValue !== null &&
          this.options.some((option) => option.data == this.savedValue)
        ) {
          this.selected.setValue(this.savedValue);
        }
        if (serviceData.error) {
          this.selected.setValue(this.savedValue);
          this.selected.setErrors({ serviceFail: serviceData.error });
        }
      }
    });
  }

  getErrorMessage() {
    if (this.selected.hasError('serviceFail')) {
      return this.selected.getError('serviceFail');
    } else if (this.selected.hasError('required')) {
      return 'this field is required';
    }
  }

  openChanged(event: any) {
    this.isOpen = event;
    this.isLoading = event;
    if (event) {
      this.savedValue = this.selected.value;
      this.options = [];
      this.selected.reset();
      this.optionService.getOptions(++this.loadID);
    }
  }
}
