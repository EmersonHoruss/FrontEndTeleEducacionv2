import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DefaultSelect } from 'src/app/modules/shared/constants/default-select';
import { SelectInterface } from 'src/app/modules/shared/interfaces/select-interface';
import { ButtonInterface } from '../../../../shared/interfaces/button-interface';
import { MasterMainService } from '../../services/master-main/master-main.service';
import { Constants } from './master-main.constants';

@Component({
  selector: 'app-master-main',
  templateUrl: './master-main.component.html',
  styleUrls: ['./master-main.component.scss'],
})
export class MasterMainComponent implements OnInit {
  // Facultades: SelectInterface = JSON.parse(JSON.stringify(DefaultSelect));
  //Maestrias: SelectInterface = JSON.parse(JSON.stringify(DefaultSelect));
  //Matricula: SelectInterface = JSON.parse(JSON.stringify(DefaultSelect));
  //Cursos: SelectInterface = JSON.parse(JSON.stringify(DefaultSelect));
  facultades: SelectInterface = Constants.facultades;
  maestrias: SelectInterface = Constants.maestrias;
  curriculas: SelectInterface = Constants.curriculas;
  cursos: SelectInterface = Constants.cursos;
  masterListener : Observable<string|number|null> = this.masterMainService.getSelectMaster();
  asd : string|number = 1;

  constructor(private http: HttpClient, private masterMainService:MasterMainService) {
    // this.http.get("/api/Facultades").subscribe(e=>{this.Facultades.items=Object.values(e)});
    // this.Facultades.label = 'Facultad';
    this.facultades.getHttp = this.http.get('/api/Facultades');
    console.log(this.facultades);
    this.maestrias.getHttp = this.http.get('/api/Maestrias');
    console.log(this.maestrias);
    this.curriculas.getHttp = this.http.get('/api/Curriculas');
    console.log(this.curriculas);
    this.cursos.getHttp = this.http.get('/api/Cursos');
    console.log(this.cursos);
  }
  ngOnInit(): void {}

  constants = Constants;
  
  selectedMaster($event:string|number){
    console.log($event);
    this.masterMainService.setSelectMaster(0);
    this.maestrias.getHttp = this.http.get('/api/Curriculas');
  }
}
