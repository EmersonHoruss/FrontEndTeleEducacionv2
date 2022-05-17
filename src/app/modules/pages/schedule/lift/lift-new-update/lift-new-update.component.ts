import { Component, OnInit } from '@angular/core';
import { DefaultTitlePage } from '../../../../shared/constants/default-title-page';
import { TitlePageInterface } from '../../../../shared/interfaces/title-page-interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lift-new-update',
  templateUrl: './lift-new-update.component.html',
  styleUrls: ['./lift-new-update.component.scss'],
})
export class LiftNewUpdateComponent implements OnInit {
  titlePage: TitlePageInterface = JSON.parse(JSON.stringify(DefaultTitlePage));

  constructor(private router: Router) {
    this.settingTitlePage();
  }

  ngOnInit(): void {}

  settingTitlePage() {
    this.router.url === '/programaciones/sustentaciones/nuevo'
      ? (this.titlePage.titlePage = 'Nueva Programación de Sustentación')
      : this.router.url === '/programaciones/sustentaciones/actualizar'
      ? (this.titlePage.titlePage = 'Actualizar Programación de Sustentación')
      : (this.titlePage.titlePage = 'Error to load title page');
  }
}
