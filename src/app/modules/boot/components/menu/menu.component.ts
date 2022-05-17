import { Component, OnInit } from '@angular/core';
import { menuConstant } from './menu.constants';
import { MenuInterface } from '../../interfaces/menu-interface';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  menu: MenuInterface = menuConstant;
  lastIndex: number = this.menu.options.length - 1;

  statusOptionsClicked: any = {
    home: false,
    schedules: false,
    maintenances: false,
    reports: false,
    settings: false,
  };

  constructor() {
    // console.log(this.menu)
    // console.log(this.lastIndex)
  }

  ngOnInit(): void {}

  optionClicked(nameOption: string) {
    for (const key in this.statusOptionsClicked)
      this.statusOptionsClicked[key] = false;

    this.statusOptionsClicked[nameOption] = true;
  }
}
