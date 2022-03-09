import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
export class Options {
  tag: string | undefined;
  data: number | undefined;
}

export class OptionsResult {
  options: Options[] | undefined;
  loadID: number | undefined;
  error: string | undefined;
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  optionsResult: OptionsResult = {
    options: [],
    loadID: 1,
    error: '',
  };
  private optionsSubject: BehaviorSubject<OptionsResult> = new BehaviorSubject(
    this.optionsResult
  );
  options: Observable<OptionsResult> = this.optionsSubject.asObservable();

  counter = 0;

  constructor() {}

  getOptions(loadID: number) {
    setTimeout(() => {
      let ops: Options[] = [];
      for (let i = 0; i < 10; i++) {
        ops.push({ tag: 'Option ' + ++this.counter, data: this.counter });
      }
      this.counter -= 8;
      if (Math.random() < 0.1) {
        this.optionsSubject.next({
          options: [],
          loadID: loadID,
          error: 'simulated service fail',
        });
      } else {
        this.optionsSubject.next({ options: ops, loadID: loadID, error: '' });
      }
    }, 3000);
  }
}
