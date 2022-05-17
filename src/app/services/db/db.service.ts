import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import Dexie from 'dexie';

@Injectable({
  providedIn: 'root',
})
export class dbService extends Dexie {
  programacionSustentacion: Dexie.Table;

  constructor() {
    super('db');
    this.version(1).stores({ programacionSustentacion: '' });
  }
}
