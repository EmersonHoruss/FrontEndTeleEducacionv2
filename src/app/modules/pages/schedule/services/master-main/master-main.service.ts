import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MasterMainService {
  private selectMaster: BehaviorSubject<string | number | null> =
    new BehaviorSubject<string | number | null>(null);

  constructor() {}

  getSelectMaster():Observable<string|number|null>{
    return this.selectMaster.asObservable();
  }

  setSelectMaster(selectedMaster:string|number|null):void{
    this.selectMaster.next(selectedMaster);
  }

  getValueSelectMaster():string|number|null{
    return this.selectMaster.getValue();
  }
}
