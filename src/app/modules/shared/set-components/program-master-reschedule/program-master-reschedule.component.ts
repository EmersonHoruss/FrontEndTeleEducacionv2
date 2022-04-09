import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-program-master-reschedule',
  templateUrl: './program-master-reschedule.component.html',
  styleUrls: ['./program-master-reschedule.component.scss'],
})
export class ProgramMasterRescheduleComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  getPrograma(): string {
    const cursoPrograma: any = localStorage.getItem('cursoPrograma');
    const cursoProgramaObject = JSON.parse(cursoPrograma);
    return cursoProgramaObject.programa.Nombre;
  }

  getCurso(): string {
    const cursoPrograma: any = localStorage.getItem('cursoPrograma');
    const cursoProgramaObject = JSON.parse(cursoPrograma);
    return cursoProgramaObject.curso.Nombre;
  }

  getCoordinador(): string {
    const cursoPrograma: any = localStorage.getItem('cursoPrograma');
    const cursoProgramaObject = JSON.parse(cursoPrograma);
    return (
      cursoProgramaObject.coordinador.Nombre +
      ' ' +
      cursoProgramaObject.coordinador.ApellidoPaterno +
      ' ' +
      cursoProgramaObject.coordinador.ApellidoMaterno
    );
  }

  getDocente() {
    const programation: any = localStorage.getItem('programation');
    const programationObj = JSON.parse(programation);
    return (
      programationObj.Nombre +
      ' ' +
      programationObj.ApellidoPaterno +
      ' ' +
      programationObj.ApellidoMaterno
    );
  }
}
