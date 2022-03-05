import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NavigationService } from '../../services/navigation/navigation.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  showSideNav: Observable<boolean> = this.navService.getShowNav();

  @Input() sidenavTemplateRef: any;
  @Input() duration: number = 0.25;
  @Input() navWidth: number = window.innerWidth;

  constructor(private navService: NavigationService) {}

  ngOnInit(): void {
    // this.showSideNav = this.navService.getShowNav();
  }

  onSidebarClose() {
    this.navService.setShowNav(false);
  }

  getSideNavBarStyle() {
    let navBarStyle: any = {};

    navBarStyle.transition =
      'left' + ' ' + this.duration + 's, visibility ' + this.duration + 's';
    navBarStyle.width = this.navWidth + 'px';
    navBarStyle['left'] = (this.navService.isNavOpen() ? 0 : this.navWidth * -1) + 'px';

    return navBarStyle;
  }

}
