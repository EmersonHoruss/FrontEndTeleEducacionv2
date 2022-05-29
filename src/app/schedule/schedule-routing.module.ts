import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StartComponent } from './start/start.component';
import { MasterMainComponent } from './pages/master-main/master-main.component';
import { MasterRegisterComponent } from './pages/master-register/master-register.component';
import { MasterManagementComponentComponent } from './pages/master-management-component/master-management-component.component';

import { ExamMainComponent } from './exam/exam-main/exam-main.component';
import { ExamNewComponent } from './exam/exam-new/exam-new.component';
import { ExamManagementComponent } from './exam/exam-management/exam-management.component';
import { LiftMainComponent } from './lift/lift-main/lift-main.component';
import { LiftGetItBackComponent } from './lift/lift-get-it-back/lift-get-it-back.component';
import { ExamGetItBackComponent } from './exam/exam-get-it-back/exam-get-it-back.component';
import { LiftNewUpdateComponent } from './lift/lift-new-update/lift-new-update.component';

const routes: Routes = [
  { path: '', component: StartComponent },

  { path: 'cursos', component: MasterMainComponent },
  { path: 'cursos/nuevo', component: MasterRegisterComponent },
  { path: 'cursos/gestionar', component: MasterManagementComponentComponent },

  { path: 'examenes', component: ExamMainComponent },
  { path: 'examenes/nuevo', component: ExamNewComponent },
  { path: 'examenes/recuperar', component: ExamGetItBackComponent },
  { path: 'examenes/gestionar', component: ExamManagementComponent },

  { path: 'sustentaciones', component: LiftMainComponent },
  { path: 'sustentaciones/nuevo', component: LiftNewUpdateComponent },
  { path: 'sustentaciones/actualizar', component: LiftNewUpdateComponent },
  { path: 'sustentaciones/recuperar', component: LiftGetItBackComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScheduleRoutingModule {}
