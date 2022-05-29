import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-exam-main-select',
  templateUrl: './exam-main-select.component.html',
  styleUrls: ['./exam-main-select.component.scss'],
})
export class ExamMainSelectComponent implements OnInit {
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
  });

  isLoaded = {
    program: false,
  };

  dataSelects = {
    programs: null,
  };
  // END LOCAL VALUES TS

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.mngSelectsPCCExam();
    this.mngPCCExam();
    this.initStateForm();

    this.setPreLoadedValueControlKindProgram();

    this.loadDataSelectsProgram();
    this.setPreLoadedValueControlProgram();
  }

  initStateForm() {
    const selectsPCC = this.getSelectsPCCExam();

    if (selectsPCC.kindProgram === null) {
      this.PCCForm.controls['program'].disable();
    }
  }

  // Kind program
  setPreLoadedValueControlKindProgram() {
    const selectsPCC = this.getSelectsPCCExam();
    const preLoadedValueKindProgram = selectsPCC.kindProgram;

    this.PCCForm.controls['kindProgram'].setValue(preLoadedValueKindProgram);
  }

  selectedKindProgram($event: any) {
    this.setSelectsPCCExam($event, 'kindProgram');
    this.behaviorAccordingKindProgram();
  }

  behaviorAccordingKindProgram() {
    // Reseting
    this.PCCForm.controls['program'].setValue(null);

    // Enabling
    this.PCCForm.controls['program'].enable();

    // Setting null to elements have been reseted
    this.setSelectsPCCExam(null, 'program');
  }

  // Program
  openProgramSelect() {
    console.log('open program select');
    const selectsPCC = this.getSelectsPCCExam();
    const selectedKindProgram = selectsPCC.kindProgram;
    const PCCExam = this.getPCCExam();
    const programs = PCCExam[selectedKindProgram];

    if (!programs) {
      this.isLoaded.program = false;
      this.dataSelects.programs = null;
      this.http
        .get(`/api/Programas/${selectedKindProgram}`)
        .subscribe((e: any) => {
          this.isLoaded.program = true;
          this.dataSelects.programs = e.data;
          this.setPCCExam(e.data, 'programs', selectedKindProgram);
        });
    } else {
      const newPCCExam = this.getPCCExam();
      this.dataSelects.programs = newPCCExam[selectedKindProgram];
      this.isLoaded.program = true;
    }
  }

  loadDataSelectsProgram() {
    const PCCExam = this.getPCCExam();
    const selectedKindProgram = this.PCCForm.controls['kindProgram'].value;

    this.dataSelects.programs = PCCExam[selectedKindProgram];
  }

  setPreLoadedValueControlProgram() {
    const selectsPCC = this.getSelectsPCCExam();
    const preLoadedValueProgram = selectsPCC.program;

    this.PCCForm.controls['program'].setValue(preLoadedValueProgram);
  }

  selectedProgram($event: any) {
    this.setSelectsPCCExam($event, 'program');
  }

  // LOCAL STORAGE
  initSelectsPCCExam() {
    const selectsPCCExam = {
      kindProgram: null,
      program: null,
      curricula: null,
      course: null,
    };

    localStorage.setItem('selectsPCCExam', JSON.stringify(selectsPCCExam));
  }

  getSelectsPCCExam() {
    const selectsPCCExam: any = localStorage.getItem('selectsPCCExam');
    const selectsPCCExamObj = JSON.parse(selectsPCCExam);
    return selectsPCCExamObj;
  }

  setSelectsPCCExam(data: any, type: string) {
    const newSelectsPCCExam = this.getSelectsPCCExam();
    newSelectsPCCExam[type] = data;
    localStorage.setItem('selectsPCCExam', JSON.stringify(newSelectsPCCExam));
  }

  mngSelectsPCCExam() {
    const selectsPCC = this.getSelectsPCCExam();

    if (!selectsPCC) this.initSelectsPCCExam();
  }

  initPCCExam() {
    const PCC = {
      MA: null,
      DO: null,
      ID: null,
    };

    localStorage.setItem('PCCExam', JSON.stringify(PCC));
  }

  getPCCExam() {
    const PCCExam: any = localStorage.getItem('PCCExam');
    const PCCExamObj = JSON.parse(PCCExam);
    return PCCExamObj;
  }

  setPCCExam(data: any, type: string, kindProgram: string) {
    const selectsPCCExam = this.getSelectsPCCExam();
    const newPCCExam = this.getPCCExam();

    if (type === 'programs') newPCCExam[kindProgram] = data;
    // if (type === 'programs') newPCCExam[selectsPCCExam.kindProgram] = data;

    localStorage.setItem('PCCExam', JSON.stringify(newPCCExam));
  }

  mngPCCExam() {
    const PCC: any = this.getPCCExam();
    if (!PCC) this.initPCCExam();
  }
}
