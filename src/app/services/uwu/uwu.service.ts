import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UwuService {
  dataChange = new BehaviorSubject(null);
  
  constructor() {}

  uwu: any = [];

  save(e: any) {
    this.dataChange.next(e);
  }

  show() {
    console.log(this.dataChange);
  }
}
