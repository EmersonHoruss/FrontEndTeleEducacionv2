import { Component, OnInit } from '@angular/core';
import { menuConstant } from './menu.constants';
import { MenuInterface } from '../../interfaces/menu-interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  statusOptionsClicked: any = {
    home: false,
    schedules: false,
    maintenances: false,
    reports: false,
    settings: false,
  };

  menu: any = [
    {
      nameOption: 'home',
      statusOption: false,
      urlOpiton: 'casa',
      subOptions: [],
    },
    {
      nameOption: 'schedules',
      statusOption: false,
      urlOption: 'programaciones',
      subOptions: [
        { nameSubOption: 'projects', urlSubOption: 'proyectos' },
        { nameSubOption: 'teachers', urlSubOption: 'docentes' },
        { nameSubOption: 'students', urlSubOption: 'estudiantes' },
        { nameSubOption: 'programs', urlSubOption: 'programas' },
      ],
    },
    {
      nameOption: 'maintenances',
      urlOption: 'mantenimientos',
      statusOption: false,
      subOptions: [
        { nameSubOption: 'projects', urlSubOption: 'proyectos' },
        { nameSubOption: 'teachers', urlSubOption: 'docentes' },
        { nameSubOption: 'students', urlSubOption: 'estudiantes' },
        { nameSubOption: 'programs', urlSubOption: 'programas' },
      ],
    },
    {
      nameOption: 'resports',
      statusOption: false,
      subOptions: [{ nameSubOption: '' }],
    },
    {
      nameOption: 'settings',
      statusOption: false,
      subOptions: [{ nameSubOption: '' }],
    },
  ];

  constructor(private router: Router) {
    // console.log(this.menu)
    // console.log(this.lastIndex)
  }

  ngOnInit(): void {}

  optionClicked(nameOption: string) {
    const copiedMenu = JSON.parse(JSON.stringify(this.menu));

    for (const iterator of this.menu)
      iterator.nameOption === nameOption
        ? (iterator.statusOption = !iterator.statusOption)
        : (iterator.statusOption = false);
  }

  isOptionActivated(nameOption: string): boolean {
    let statusOption = null;
    for (const iterator of this.menu)
      if (iterator.nameOption === nameOption) {
        statusOption = iterator.statusOption;
        break;
      }

    return statusOption;
  }

  getActivatedOption(): boolean {
    let option = null;
    for (const iterator of this.menu)
      if (iterator.statusOption) {
        option = iterator;
        break;
      }

    return option;
  }

  subOptionClicked(nameSubOption: string) {
    const activatedOption: any = this.getActivatedOption();
    console.log(nameSubOption);
    console.log(activatedOption);

    for (const iterator of activatedOption.subOptions)
      if (iterator.nameSubOption === nameSubOption) {
        const url =
          '/' + activatedOption.urlOption + '/' + iterator.urlSubOption;
        this.router.navigateByUrl(url);
        break;
      }
  }
}
