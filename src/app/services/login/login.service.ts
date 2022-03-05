import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private logged$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  constructor() {}

  // should verify if user has access
  canAccess() {}

  setLogged(logged: boolean = true) {
    // this.toggleLog = !this.toggleLog;
    this.logged$.next(logged);
  }

  isLogged(): Observable<boolean> {
    return this.logged$.asObservable();
  }

  // isLogged():boolean {
  //   return this.logged$.value;
  // }
}
