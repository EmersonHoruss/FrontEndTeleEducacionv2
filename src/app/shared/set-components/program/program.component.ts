import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Output } from '@angular/core';

@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.scss'],
})
export class ProgramComponent implements OnInit {
  // Input Output Zone
  @Input() programa: any;
  @Output() programaEE = new EventEmitter<any>();
  @Output() cursoEE = new EventEmitter<any>();

  // Input Output Zone

  // Local Variables Zone
  loadingPrograma: boolean = true;
  programaSeleccionado = '';
  programas: any = [];

  loadingCurricula: boolean = true;
  curriculaSeleccionada = '';
  curriculas: any = [];
  disabledCurricula: boolean = true;

  loadingCurso: boolean = true;
  cursoSeleccionado = '';
  cursos: any = [];
  disabledCurso: boolean = true;
  // Local Variables Zone

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  openProgramaSelect() {
    this.programa.http.subscribe((e: any) => {
      this.loadingPrograma = false;
      this.programas = e.data;
    });
  }

  openCurriculaSelect() {
    this.http
      .get(`/api/Curriculas/${this.programaSeleccionado}`)
      .subscribe((e: any) => {
        this.loadingCurricula = false;
        this.curriculas = e.data;
      });
  }

  openCursoSelect() {
    this.http
      .get(`/api/Cursos/${this.curriculaSeleccionada}`)
      .subscribe((e: any) => {
        this.loadingCurso = false;
        this.cursos = e.data;
      });
  }

  changedPrograma($eventValue: any) {
    if ($eventValue) {
      this.resetCurricula();
      this.resetCurso();
      this.programaEE.emit(this.getPrograma());
      this.cursoEE.emit(null);
    }
  }

  changedCurricula($eventValue: any) {
    if ($eventValue) {
      this.resetCurso();
      this.disabledCurso = false;
    }
  }

  changedCurso($eventValue: any) {
    if ($eventValue) this.cursoEE.emit(this.getCurso());
  }

  resetCurricula() {
    this.curriculas = [];
    this.curriculaSeleccionada = '';
    this.loadingCurricula = true;
    this.disabledCurricula = false;
  }

  resetCurso() {
    this.cursos = [];
    this.cursoSeleccionado = '';
    this.loadingCurso = true;
    this.disabledCurso = true;
  }

  getPrograma() {
    return this.programas.find(
      (e: any) => e.Codigo === this.programaSeleccionado
    );
  }

  getCurso() {
    return this.cursos.find((e: any) => e.Codigo === this.cursoSeleccionado);
  }
}
