import { Component, OnInit } from '@angular/core';
import { NamePageService } from '../../../../services/name-page/name-page.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss'],
})
export class StartComponent implements OnInit {
  constructor(private namePageS: NamePageService) {
    this.namePageS.setNamePage('Elegir qué vas a programar');
    console.log(this.namePageS.getVal());
  }

  kinds: string[] = [
    'Maestría',
    'Doctorado',
    'Idioma',
    'Examen',
    'Sustentación',
  ];
  selected = 'option2';
  ngOnInit(): void {}
}
