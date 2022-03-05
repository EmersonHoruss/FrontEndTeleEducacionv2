import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  private showNav$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  constructor(private router: Router) {
    // here any navigation events (i.e. clicking on the nav items to go to a separate page)
    // will be captured inside this subscription, then we hide the nav by setting
    // the showNav$ to false or in our case, calling the setShowNav to false, which does the same.
    // If the route is the same, so, it too exceute events and showNav$ is false
    this.router.onSameUrlNavigation = 'reload';
    router.events.subscribe((event) => {
      this.setShowNav(false);
      // console.log(event);
    });
  }

  ngOnInit() {}

  getShowNav(): Observable<boolean> {
    return this.showNav$.asObservable();
  }

  setShowNav(showHide: boolean) {
    this.showNav$.next(showHide);
  }

  toggleNavState() {
    this.showNav$.next(!this.showNav$.value);
  }

  isNavOpen() {
    return this.showNav$.value;
  }
}
