import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../../services/navigation/navigation.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  sizeIcons: string = '1rem';
  constructor(private navigationS: NavigationService) {}

  ngOnInit(): void {}
  toggleSideNav() {
    this.navigationS.setShowNav(true);
  }
}
