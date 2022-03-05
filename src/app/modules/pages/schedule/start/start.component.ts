import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss'],
})
export class StartComponent implements OnInit {
  titlePage: string = 'Programar';
  actionPage: string = 'Elección';
  constructor() {}
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
