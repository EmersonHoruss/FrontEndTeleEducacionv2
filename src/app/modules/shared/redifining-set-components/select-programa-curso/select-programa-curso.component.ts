import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-select-programa-curso',
  templateUrl: './select-programa-curso.component.html',
  styleUrls: ['./select-programa-curso.component.scss'],
})
export class SelectProgramaCursoComponent implements OnInit, AfterViewInit {
  // START LOCAL VALUES HTML
  kindPrograms = [
    { Codigo: 'MA', Nombre: 'Maestria' },
    { Codigo: 'DO', Nombre: 'Doctorado' },
    { Codigo: 'ID', Nombre: 'Idioma' },
  ];
  // END LOCAL VALUES HTML

  // START LOCAL VALUES TS
  programIsLoading: boolean = true;
  // PCC = program course coordinator
  PCCForm = this.fb.group({
    kindProgram: [null],
    program: [null],
    curricula: [null],
    course: [null],
    nameCoordinator: [{ value: null, disabled: true }],
    emailCoordinator: [{ value: null, disabled: true }],
  });

  isLoaded = {
    program: false,
    curricula: false,
    course: false,
    coordinator: false,
  };

  dataSelects = {
    programs: null,
    curriculas: null,
    courses: null,
    coordinator: null,
  };
  // END LOCAL VALUES TS

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.mngSelectsPCC();
    this.mngPCC();
    this.initStateForm();

    this.setPreLoadedValueControlKindProgram();

    this.loadDataSelectsProgram();
    this.setPreLoadedValueControlProgram();

    this.loadDataSelectsCurricula();
    this.setPreLoadedValueControlCurricula();

    this.loadDataCoordinator();
    this.setPreloadedCoordinator();

    this.loadDataSelectsCourse();
    this.setPreLoadedValueControlCourse();
  }

  ngAfterViewInit(): void {}

  initStateForm() {
    const selectsPCC = this.getSelectsPCC();

    if (selectsPCC.kindProgram === null) {
      this.PCCForm.controls['program'].disable();
      this.PCCForm.controls['curricula'].disable();
      this.PCCForm.controls['course'].disable();
    } else if (selectsPCC.program === null) {
      this.PCCForm.controls['curricula'].disable();
      this.PCCForm.controls['course'].disable();
    } else if (selectsPCC.curricula === null) {
      this.PCCForm.controls['course'].disable();
    } else if (
      selectsPCC.curricula !== null &&
      selectsPCC.kindProgram === 'ID'
    ) {
      this.PCCForm.controls['course'].disable();
    }
  }

  // Kind program
  setPreLoadedValueControlKindProgram() {
    const selectsPCC = this.getSelectsPCC();
    const preLoadedValueKindProgram = selectsPCC.kindProgram;

    this.PCCForm.controls['kindProgram'].setValue(preLoadedValueKindProgram);
  }

  selectedKindProgram($event: any) {
    this.setSelectsPCC($event, 'kindProgram');
    this.behaviorAccordingKindProgram();
  }

  behaviorAccordingKindProgram() {
    // Reseting
    this.PCCForm.controls['program'].setValue(null);
    this.PCCForm.controls['curricula'].setValue(null);
    this.PCCForm.controls['course'].setValue(null);

    // Disabling
    this.PCCForm.controls['curricula'].disable();
    this.PCCForm.controls['course'].disable();

    // Enabling
    this.PCCForm.controls['program'].enable();

    // Setting null to elements have been reseted
    this.setSelectsPCC(null, 'program');
    this.setSelectsPCC(null, 'curricula');
    this.setSelectsPCC(null, 'course');
  }

  // Program
  openProgramSelect() {
    const selectsPCC = this.getSelectsPCC();
    const selectedKindProgram = selectsPCC.kindProgram;

    const PCC = this.getPCC();
    const programs = PCC[selectedKindProgram];

    if (!programs) {
      this.isLoaded.program = false;
      this.dataSelects.programs = null;
      this.http
        .get(`/api/Programas/${selectedKindProgram}`)
        .subscribe((e: any) => {
          this.isLoaded.program = true;
          this.dataSelects.programs = e.data;
          this.setPCC(e.data, 'programs');
        });
    } else {
      const newPCC = this.getPCC();

      this.dataSelects.programs = newPCC[selectedKindProgram];
      this.isLoaded.program = true;
    }
  }

  loadDataSelectsProgram() {
    const PCC = this.getPCC();
    const selectedKindProgram = this.PCCForm.controls['kindProgram'].value;

    this.dataSelects.programs = PCC[selectedKindProgram];
  }

  setPreLoadedValueControlProgram() {
    const selectsPCC = this.getSelectsPCC();
    const preLoadedValueProgram = selectsPCC.program;

    this.PCCForm.controls['program'].setValue(preLoadedValueProgram);
  }

  selectedProgram($event: any) {
    this.setSelectsPCC($event, 'program');

    this.behaviorFormAccordingProgram();
    this.openCoordinator();
  }

  behaviorFormAccordingProgram() {
    // Reseting
    this.PCCForm.controls['curricula'].setValue(null);
    this.PCCForm.controls['course'].setValue(null);

    // Disabling
    this.PCCForm.controls['course'].disable();

    // Enabling
    this.PCCForm.controls['curricula'].enable();

    // Setting null to elements have been reseted
    this.setSelectsPCC(null, 'curricula');
    this.setSelectsPCC(null, 'course');
  }

  // Curricula
  openCurriculaSelect() {
    const selectsPCC = this.getSelectsPCC();
    const selectedKindProgram = selectsPCC.kindProgram;
    const selectedProgram = selectsPCC.program;

    const PCC = this.getPCC();
    const programs = PCC[selectedKindProgram];
    let curriculas = null;
    programs.forEach((program: any) => {
      if (
        program.Codigo === parseInt(selectedProgram) &&
        program.hasOwnProperty('Curriculas')
      ) {
        curriculas = program.Curriculas;
      }
    });

    if (!curriculas) {
      this.isLoaded.curricula = false;
      this.dataSelects.curriculas = null;
      this.http
        .get(`/api/Curriculas/${selectedProgram}`)
        .subscribe((e: any) => {
          this.isLoaded.curricula = true;
          this.dataSelects.curriculas = e.data;
          this.setPCC(e.data, 'curriculas');
        });
    } else {
      const newPCC = this.getPCC();
      const indexProgram = newPCC[selectsPCC.kindProgram].findIndex(
        (program: any) => program.Codigo === parseInt(selectsPCC.program)
      );

      this.isLoaded.curricula = true;
      this.dataSelects.curriculas =
        newPCC[selectedKindProgram][indexProgram].Curriculas;
    }
  }

  loadDataSelectsCurricula() {
    const PCC = this.getPCC();
    const selectedKindProgram = this.PCCForm.controls['kindProgram'].value;
    const selectedProgram = this.PCCForm.controls['program'].value;
    if (PCC[selectedKindProgram]) {
      const indexProgram = PCC[selectedKindProgram].findIndex(
        (program: any) => program.Codigo === parseInt(selectedProgram)
      );

      if (PCC[selectedKindProgram][indexProgram])
        if (PCC[selectedKindProgram][indexProgram].hasOwnProperty('Curriculas'))
          this.dataSelects.curriculas =
            PCC[selectedKindProgram][indexProgram].Curriculas;
    }
  }

  setPreLoadedValueControlCurricula() {
    const selectsPCC = this.getSelectsPCC();
    const preLoadedValueCurricula = selectsPCC.curricula;

    this.PCCForm.controls['curricula'].setValue(preLoadedValueCurricula);
  }

  selectedCurricula($event: any) {
    this.setSelectsPCC($event, 'curricula');
    this.behaviorFormAccordingCurricula();
  }

  behaviorFormAccordingCurricula() {
    // Reseting
    this.PCCForm.controls['course'].setValue(null);

    // Disabling

    // Enabling
    const kindProgram = this.getSelectsPCC().kindProgram;
    kindProgram !== 'ID'
      ? this.PCCForm.controls['course'].enable()
      : this.PCCForm.controls['course'].disable();

    // Setting null to elements have been reseted
    this.setSelectsPCC(null, 'course');
  }

  // Course
  openCourseSelect() {
    const selectsPCC = this.getSelectsPCC();
    const selectedKindProgram = selectsPCC.kindProgram;
    const selectedProgram = selectsPCC.program;
    const selectedCurricula = selectsPCC.curricula;

    const PCC = this.getPCC();
    const programs = PCC[selectedKindProgram];

    const indexSelectedProgram = programs.findIndex(
      (program: any) => program.Codigo === parseInt(selectedProgram)
    );

    const curriculas = programs[indexSelectedProgram].Curriculas;
    let courses = null;

    curriculas.forEach((curricula: any) => {
      if (
        curricula.Codigo === parseInt(selectedCurricula) &&
        curricula.hasOwnProperty('Cursos')
      ) {
        courses = curricula.Cursos;
      }
    });

    if (!courses) {
      this.isLoaded.course = false;
      this.dataSelects.courses = null;
      this.http.get(`/api/Cursos/${selectedCurricula}`).subscribe((e: any) => {
        this.isLoaded.course = true;
        this.dataSelects.courses = e.data;

        this.setPCC(e.data, 'courses');
      });
    } else {
      const newPCC = this.getPCC();
      const indexProgram = newPCC[selectsPCC.kindProgram].findIndex(
        (program: any) => program.Codigo === parseInt(selectsPCC.program)
      );
      const indexCurricula = newPCC[selectsPCC.kindProgram][
        indexProgram
      ].Curriculas.findIndex(
        (curricula: any) => curricula.Codigo === parseInt(selectsPCC.curricula)
      );

      this.isLoaded.course = true;
      this.dataSelects.courses =
        newPCC[selectedKindProgram][indexProgram].Curriculas[
          indexCurricula
        ].Cursos;
    }
  }

  loadDataSelectsCourse() {
    const PCC = this.getPCC();
    const selectedKindProgram = this.PCCForm.controls['kindProgram'].value;
    const selectedProgram = this.PCCForm.controls['program'].value;
    const selectedCurricula = this.PCCForm.controls['curricula'].value;

    if (PCC[selectedKindProgram]) {
      const indexProgram = PCC[selectedKindProgram].findIndex(
        (program: any) => program.Codigo === parseInt(selectedProgram)
      );

      if (PCC[selectedKindProgram][indexProgram]) {
        if (
          PCC[selectedKindProgram][indexProgram].hasOwnProperty('Curriculas')
        ) {
          const indexCurricula = PCC[selectedKindProgram][
            indexProgram
          ].Curriculas.findIndex(
            (curricula: any) => curricula.Codigo === parseInt(selectedCurricula)
          );

          if (PCC[selectedKindProgram][indexProgram].Curriculas[indexCurricula])
            if (
              PCC[selectedKindProgram][indexProgram].Curriculas[
                indexCurricula
              ].hasOwnProperty('Cursos')
            )
              this.dataSelects.courses =
                PCC[selectedKindProgram][indexProgram].Curriculas[
                  indexCurricula
                ].Cursos;
        }
      }
    }
  }

  setPreLoadedValueControlCourse() {
    const selectsPCC = this.getSelectsPCC();
    const preLoadedValueCourse = selectsPCC.course;

    this.PCCForm.controls['course'].setValue(preLoadedValueCourse);
  }

  selectedCourse($event: any) {
    this.setSelectsPCC($event, 'course');
  }

  // Coordinator (Name and Email)
  openCoordinator() {
    const selectsPCC = this.getSelectsPCC();
    const selectedKindProgram = selectsPCC.kindProgram;
    const selectedProgram = selectsPCC.program;

    const PCC = this.getPCC();
    const programs = PCC[selectedKindProgram];

    let coordinator = null;

    const indexProgram = programs.findIndex(
      (program: any) => program.Codigo === parseInt(selectedProgram)
    );

    programs.forEach((program: any) => {
      if (
        program.Codigo === parseInt(selectedProgram) &&
        program.hasOwnProperty('Coordinador')
      ) {
        coordinator = program.Coordinador;
      }
    });
    console.log(coordinator);

    if (!coordinator) {
      this.isLoaded.coordinator = false;
      this.dataSelects.coordinator = null;
      const coordinatorCode =
        PCC[selectedKindProgram][indexProgram].CodigoCoordinador;

      if (coordinatorCode) {
        this.http
          .get(`/api/Docentes/${coordinatorCode}`)
          .subscribe((e: any) => {
            this.isLoaded.coordinator = true;
            this.dataSelects.coordinator = e.data;
            this.setPCC(e.data, 'coordinator');
          });
      } else {
        this.isLoaded.coordinator = true;
        this.dataSelects.coordinator = null;
      }
    } else {
      const newPCC = this.getPCC();

      this.dataSelects.coordinator =
        newPCC[selectedKindProgram][indexProgram].Coordinador;
      this.isLoaded.coordinator = true;
    }
  }

  loadDataCoordinator() {
    const PCC = this.getPCC();
    const selectedKindProgram = this.PCCForm.controls['kindProgram'].value;
    const selectedProgram = this.PCCForm.controls['program'].value;

    if (PCC[selectedKindProgram]) {
      const indexProgram = PCC[selectedKindProgram].findIndex(
        (program: any) => program.Codigo === parseInt(selectedProgram)
      );

      if (PCC[selectedKindProgram][indexProgram])
        if (
          PCC[selectedKindProgram][indexProgram].hasOwnProperty('Coordinador')
        ) {
          this.dataSelects.coordinator =
            PCC[selectedKindProgram][indexProgram].Coordinador;
          console.log(this.dataSelects);
        }
    }
  }

  setPreloadedCoordinator() {
    const selectsPCC = this.getSelectsPCC();
    const PCC = this.getPCC();
    const kindProgram = selectsPCC.kindProgram;
    const program = selectsPCC.program;

    if (PCC[kindProgram]) {
      const indexProgram = PCC[kindProgram].findIndex(
        (element: any) => parseInt(program) === element.Codigo
      );

      this.dataSelects.coordinator = null;

      if (PCC[kindProgram]) {
        if (PCC[kindProgram][indexProgram]) {
          if (PCC[kindProgram][indexProgram].hasOwnProperty('Coordinador')) {
            this.dataSelects.coordinator =
              PCC[kindProgram][indexProgram].Coordinador;
          }
        }
      }

      this.isLoaded.coordinator = true;
    }
  }

  // LOCAAAL STORAGE

  initSelectsPCC() {
    const selectsPCC = {
      kindProgram: null,
      program: null,
      curricula: null,
      course: null,
    };

    localStorage.setItem('selectsPCC', JSON.stringify(selectsPCC));
  }

  getSelectsPCC() {
    const selectsPCC: any = localStorage.getItem('selectsPCC');
    const selectsPCCobj = JSON.parse(selectsPCC);
    return selectsPCCobj;
  }

  setSelectsPCC(data: any, type: string) {
    const newSelectsPCC = this.getSelectsPCC();
    newSelectsPCC[type] = data;
    localStorage.setItem('selectsPCC', JSON.stringify(newSelectsPCC));
  }

  mngSelectsPCC() {
    const selectsPCC = this.getSelectsPCC();

    if (!selectsPCC) this.initSelectsPCC();
  }

  initPCC() {
    const PCC = {
      MA: null,
      DO: null,
      ID: null,
    };

    localStorage.setItem('PCC', JSON.stringify(PCC));
  }

  getPCC() {
    const PCC: any = localStorage.getItem('PCC');
    const PCCObj = JSON.parse(PCC);
    return PCCObj;
  }

  setPCC(data: any, type: string) {
    // ERROR LOGICO
    // CUANDO SE CAMBIA Y SE HA ENVIADO LA PETICION AL ABRIR EL SELECT
    // LOS DATOS SE CARGAN EL EL ÚLTIMO ABIERTO, ES DECIR, SI ABRO LA
    // MAESTRIA Y SELECCIONO PROGRAMA, EMPIEZAN A CARGAR LOS DATOS
    // Y SI LUEGO PRESIONO EN DOCTORADO, LA DATA CARGADA PASA A DOCTORADO
    // Y NO A MAESTRÍA, ESTO SUCEDE POR MANTENER LOS DATOS DINAMICAMENTE Y SE
    // SOLICIONA ENVIANDO UN UNICO VALOR Y QUE NO CAMBIE, A TRAVÉS DE PARAMETROS
    const selectsPCC = this.getSelectsPCC();
    const newPCC = this.getPCC();

    if (type === 'programs') {
      newPCC[selectsPCC.kindProgram] = data;
    } else if (type === 'curriculas') {
      const indexProgram = newPCC[selectsPCC.kindProgram].findIndex(
        (program: any) => program.Codigo === parseInt(selectsPCC.program)
      );
      const program = newPCC[selectsPCC.kindProgram][indexProgram];
      program.Curriculas = data;
    } else if (type === 'courses') {
      const indexProgram = newPCC[selectsPCC.kindProgram].findIndex(
        (program: any) => program.Codigo === parseInt(selectsPCC.program)
      );
      const indexCurricula = newPCC[selectsPCC.kindProgram][
        indexProgram
      ].Curriculas.findIndex(
        (curricula: any) => curricula.Codigo === parseInt(selectsPCC.curricula)
      );

      const curricula =
        newPCC[selectsPCC.kindProgram][indexProgram].Curriculas[indexCurricula];
      curricula.Cursos = data;
    } else if (type === 'coordinator') {
      const indexProgram = newPCC[selectsPCC.kindProgram].findIndex(
        (program: any) => program.Codigo === parseInt(selectsPCC.program)
      );
      const program = newPCC[selectsPCC.kindProgram][indexProgram];
      program.Coordinador = data;
    }

    localStorage.setItem('PCC', JSON.stringify(newPCC));
  }

  mngPCC() {
    const PCC: any = this.getPCC();
    if (!PCC) this.initPCC();
  }

  curriculaHasNoElements() {
    const curriculas: any = this.dataSelects.curriculas;
    return curriculas.length === 0;
  }

  courseHasNoElements() {
    const courses: any = this.dataSelects.courses;
    return courses.length === 0;
  }

  nameCoordinatorValue() {
    const coordinator: any = this.dataSelects.coordinator;
    return coordinator
      ? coordinator.Nombre +
          ' ' +
          coordinator.ApellidoPaterno +
          ' ' +
          coordinator.ApellidoMaterno
      : null;
  }

  emailCoordinatorValue() {
    const coordinator: any = this.dataSelects.coordinator;
    return !coordinator
      ? null
      : coordinator.CorreoInstitucional
      ? coordinator.CorreoInstitucional
      : coordinator.CorreoPersonal;
  }
}
