import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { modalsDialog } from '../../constants/modals-dialog';
import { Constants } from './constants/main.constants';
import { ModalsDialogService } from '../../../../services/modals-dialog/modals-dialog.service';

@Component({
  selector: 'app-update-schedule-course',
  templateUrl: './update-schedule-course.component.html',
  styleUrls: ['./update-schedule-course.component.scss'],
})
export class UpdateScheduleCourseComponent implements OnInit {
  constants = Constants;
  setDataForm = this.fb.group({
    linkTeleEducacion: [
      this.getLinkTeleEducacion(),
      [
        Validators.pattern(
          /[https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)]?/
        ),
        Validators.maxLength(50),
      ],
    ],
    linkTeacher: [
      this.getLinkTeacher(),
      [
        Validators.pattern(
          /[https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)]?/
        ),
        Validators.maxLength(50),
      ],
    ],
    teacher: [this.getCodigoTeacher(), [Validators.required]],
    kindProgramation: [this.getKindProgramation(), [Validators.required]],
  });

  teachers: any = [this.getTeacher()];
  loadedTeacher: any = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private dialogService: ModalsDialogService
  ) {}

  ngOnInit(): void {
    // console.log()
  }

  getPrograma() {
    const PCC = this.getPCC();
    const selectsPCC = this.getSelectsPCC();

    const indexProgram = PCC[selectsPCC.kindProgram].findIndex(
      (e: any) => e.Codigo === selectsPCC.program
    );

    return PCC[selectsPCC.kindProgram][indexProgram].Nombre;
  }

  getCurso() {
    const PCC = this.getPCC();
    const selectsPCC = this.getSelectsPCC();

    const indexProgram = PCC[selectsPCC.kindProgram].findIndex(
      (e: any) => e.Codigo === selectsPCC.program
    );

    const indexCurricula = PCC[selectsPCC.kindProgram][
      indexProgram
    ].Curriculas.findIndex((e: any) => e.Codigo === selectsPCC.curricula);

    const indexCourse = PCC[selectsPCC.kindProgram][indexProgram].Curriculas[
      indexCurricula
    ].Cursos.findIndex((e: any) => e.Codigo === selectsPCC.course);

    return PCC[selectsPCC.kindProgram][indexProgram].Curriculas[indexCurricula]
      .Cursos[indexCourse].Nombre;
  }

  getCoordinador() {
    const programation = this.getProgramationLS();
    return (
      programation.Coordinador.Nombre +
      ' ' +
      programation.Coordinador.ApellidoPaterno +
      ' ' +
      programation.Coordinador.ApellidoMaterno
    );
  }

  getKindProgramation() {
    const programation = this.getProgramationLS();
    return programation.Dirigido;
  }

  getLinkTeleEducacion() {
    const programation = this.getProgramationLS();
    return programation.LinkInstitucional;
  }

  getLinkTeacher() {
    const programation = this.getProgramationLS();
    return programation.LinkNoInstitucional;
  }

  getCodigoTeacher() {
    const programation = this.getProgramationLS();
    return programation.CodigoDocente;
  }

  getTeacher() {
    const programation = this.getProgramationLS();
    return {
      CodigoDocente: programation.CodigoDocente,
      Profesor: programation.Profesor,
    };
  }

  getProgramationLS() {
    const programation: any = localStorage.getItem('programation');
    return JSON.parse(programation);
  }

  getPCC() {
    const PCC: any = localStorage.getItem('PCC');
    return JSON.parse(PCC);
  }

  getSelectsPCC() {
    const selectsPCC: any = localStorage.getItem('selectsPCC');
    return JSON.parse(selectsPCC);
  }

  getPersonalPCC() {
    const personalPCC: any = localStorage.getItem('personal');
    return JSON.parse(personalPCC);
  }

  openRegisterModal($event: any) {
    console.log(this.setDataForm.controls);
  }

  openTeacherSelect() {
    this.http.get('/api/DocentesVigentes').subscribe((e: any) => {
      this.loadedTeacher = true;
      this.teachers = this.transformTeachers(e.data);
    });
  }

  transformTeachers(teachers: any) {
    const transformedTeachers = teachers.map((e: any) => {
      e.Profesor = e.Nombre + ' ' + e.ApellidoPaterno + ' ' + e.ApellidoMaterno;
      e.CodigoDocente = e.Codigo;
      return e;
    });

    console.log(transformedTeachers);

    const selectedTeacher = teachers.findIndex(
      (e: any) => e.Codigo === this.teachers[0].CodigoDocente
    );

    if (selectedTeacher === -1) transformedTeachers.push(this.teachers[0]);
    return transformedTeachers;
  }

  getError(control: string): any {
    let errors: any = {};
    control === 'linkTeleEducacion'
      ? (errors = this.setDataForm.controls['linkTeleEducacion'].errors)
      : control === 'linkTeacher'
      ? (errors = this.setDataForm.controls['linkTeacher'].errors)
      : control === 'teacher'
      ? (errors = this.getTeacherErros())
      : null;
    // console.log(errors);

    for (const key in errors) {
      if (key === 'pattern')
        return {
          error: true,
          msg: 'El link debe ser similar a: https://meet.google.com/wow-pfux-kfv',
        };
      if (key === 'maxlength')
        return { error: true, msg: 'No debe exceder a 50 caracteres.' };
      if (key === 'required')
        return { error: true, msg: 'Seleccione un docente.' };
    }
    return { error: false, msg: '' };
  }

  getTeacherErros() {
    return this.setDataForm.controls['teacher'].errors &&
      this.setDataForm.controls['teacher'].touched
      ? this.setDataForm.controls['teacher'].errors
      : {};
  }

  update() {
    if (this.setDataForm.status === 'INVALID') {
      const modalError = modalsDialog.error;

      modalError.description =
        'El formulario de datos de programación curso tiene errores.';
      this.dialogService.openModalDialog(modalError);
    } else {
      const modalLoading = modalsDialog.load;
      this.dialogService.openModalDialog(modalLoading);

      this.http
        .patch(
          'api/ActualizarProgramacionesCurso',
          this.getProgramationToUpdate()
        )
        .subscribe(
          (e: any) => {
            this.dialogService.closeLastOpenedModalDialog();
            const modalSuccess = modalsDialog.success;
            this.updateProgramationLS();
            modalSuccess.description = 'Actualización exitosa.';
            this.dialogService.openModalDialog(modalSuccess);
          },
          (err: any) => {
            this.dialogService.closeLastOpenedModalDialog();
            const modalError = modalsDialog.error;

            modalError.description = 'Ha surgido un problema.';
            this.dialogService.openModalDialog(modalError);
          }
        );
    }
  }

  getProgramationToUpdate() {
    return {
      Codigo: this.getProgramationLS().Codigo,
      LinkInstitucional: this.setDataForm.controls['linkTeleEducacion'].value,
      LinkNoInstitucional: this.setDataForm.controls['linkTeacher'].value,
      Dirigido: this.setDataForm.controls['kindProgramation'].value,
      CodigoDocente: this.setDataForm.controls['teacher'].value,
      CodigoPersonal: this.getPersonalPCC().Codigo,
    };
  }

  updateProgramationLS() {
    const programationToUpdate = this.getProgramationToUpdate();
    console.log(programationToUpdate);
    const programation = this.getProgramationLS();

    programation.LinkInstitucional = programationToUpdate.LinkInstitucional;
    programation.LinkNoInstitucional = programationToUpdate.LinkNoInstitucional;
    programation.Dirigido = programationToUpdate.Dirigido;
    programation.CodigoDocente = programationToUpdate.CodigoDocente;
    programation.Profesor = this.teachers.find(
      (e: any) =>
        e.CodigoDocente === parseInt(programationToUpdate.CodigoDocente)
    ).Profesor;
    programation.CodigoPersonal = programationToUpdate.CodigoPersonal;

    this.setProgramationLS(programation);
  }

  setProgramationLS(programation: any) {
    console.log(programation);
    localStorage.setItem('programation', JSON.stringify(programation));
  }
}
