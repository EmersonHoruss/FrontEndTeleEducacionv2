import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DefaultSelect } from 'src/app/modules/shared/constants/default-select';
import { SelectInterface } from 'src/app/modules/shared/interfaces/select-interface';
import { ButtonInterface } from '../../../../shared/interfaces/button-interface';
import { Constants } from './master-main.constants';

@Component({
  selector: 'app-master-main',
  templateUrl: './master-main.component.html',
  styleUrls: ['./master-main.component.scss'],
})
export class MasterMainComponent implements OnInit {
  // Facultades: SelectInterface = JSON.parse(JSON.stringify(DefaultSelect));
  facultades: SelectInterface = Constants.facultades;
  Maestrias: SelectInterface = JSON.parse(JSON.stringify(DefaultSelect));
  Matricula: SelectInterface = JSON.parse(JSON.stringify(DefaultSelect));
  Cursos: SelectInterface = JSON.parse(JSON.stringify(DefaultSelect));

  constructor(private http: HttpClient) {
    // this.http.get("/api/Facultades").subscribe(e=>{this.Facultades.items=Object.values(e)});
    // this.Facultades.label = 'Facultad';
    this.facultades.getHttp = this.http.get('/api/Facultades');
    console.log(this.facultades)
    this.http.get('/api/Maestrias').subscribe((e) => {
      this.Maestrias.items = Object.values(e);
    });
    this.Maestrias.label = 'Maestria';
    this.http.get('/api/Matricula').subscribe((e) => {
      this.Matricula.items = Object.values(e);
    });
    this.Matricula.label = 'Matricula';
    this.http.get('/api/Cursos').subscribe((e) => {
      this.Cursos.items = Object.values(e);
    });
    this.Cursos.label = 'Curso';
  }
  ngOnInit(): void {}

  constants = Constants;
}
