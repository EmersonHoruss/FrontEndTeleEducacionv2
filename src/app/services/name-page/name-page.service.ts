import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NamePageService {
  private namePage$: BehaviorSubject<string> = new BehaviorSubject<string>(
    'asdf'
  );

  constructor() {}

  getNamePage() {
    return this.namePage$.asObservable();
  }

  setNamePage(namePage: string = ''): void {
    // localStorage.setItem('namePage', namePage);
    this.namePage$.next(namePage);
  }

  getValue() {
    const namePageLS: any = localStorage.getItem('namePage');
    return namePageLS;
  }

  getVal(){
    return this.namePage$.getValue()
  }
}
