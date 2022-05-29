import {
  Component,
  EventEmitter,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
  AfterViewInit,
  Input,
  Output,
} from '@angular/core';
import { Constants } from './constants/main.constants';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators, NgForm } from '@angular/forms';

@Component({
  selector: 'app-program-master-update',
  templateUrl: './program-master-update.component.html',
  styleUrls: ['./program-master-update.component.scss'],
})
export class ProgramMasterUpdateComponent
  implements OnInit, OnChanges, AfterViewInit
{
  // START CONSTANTS ZONE
  constants = Constants;
  programa = '';
  // END CONSTANTS ZONE

  // START INPUT OUTPUT ZONE
  @Input() formValidate: boolean;
  @Output() formIsValid: EventEmitter<string> = new EventEmitter<string>();
  @Output() formValues: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('setDataFormHtml') setDataFormHtmlCode: NgForm;
  // END INPUT OUTPUT ZONE

  // START LOCAL STORAGE
  programation: any = localStorage.getItem('programation');
  programationObj = JSON.parse(this.programation);
  docentes: any = localStorage.getItem('docentes');
  docentesObj = JSON.parse(this.docentes);
  // EDN LOCAL STORAGE

  // START LOCAL VARIABLES ZONE
  startFormValues = {
    linkTeleEducacion: this.programationObj.LinkInstitucional,
    linkTeacher: this.programationObj.LinkNoInstitucional,
    teacher: this.programationObj.CodigoDocente,
    kindProgramation: this.programationObj.Dirigido === 0 ? 1 : 0,
  };
  selectedTeacher = '';
  teachers: any = this.docentesObj;
  setDataForm = this.fb.group({
    linkTeleEducacion: [
      this.startFormValues.linkTeleEducacion,
      [
        Validators.pattern(
          /[https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)]?/
        ),
        Validators.maxLength(50),
      ],
    ],
    linkTeacher: [
      this.startFormValues.linkTeacher,
      [
        Validators.pattern(
          /[https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)]?/
        ),
        Validators.maxLength(50),
      ],
    ],
    teacher: [this.startFormValues.teacher, [Validators.required]],
    kindProgramation: [
      this.startFormValues.kindProgramation,
      [Validators.required],
    ],
  });
  // END LOCAL VARIABLES
  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.formValues.emit(this.startFormValues);
    this.programa = this.getPrograma();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.setDataForm.invalid && !changes['formValidate'].firstChange) {
      Object.values(this.setDataForm.controls).forEach((control: any) => {
        control.markAsTouched();
      });
    }
  }

  ngAfterViewInit(): void {
    this.setDataForm.statusChanges.subscribe((e) => this.formIsValid.emit(e));
    this.setDataForm.valueChanges.subscribe((e) => this.formValues.emit(e));
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

  openRegisterModal($event: any) {
    console.log(this.setDataForm.controls);
  }

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

  
}
