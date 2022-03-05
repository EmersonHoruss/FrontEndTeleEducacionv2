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
  constructor() {
    // console.log(this.menu)
    // console.log(this.lastIndex)
  }

  ngOnInit(): void {}
}
