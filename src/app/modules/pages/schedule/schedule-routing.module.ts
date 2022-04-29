import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StartComponent } from './start/start.component';
import { MasterMainComponent } from './pages/master-main/master-main.component';
import { MasterRegisterComponent } from './pages/master-register/master-register.component';
import { MasterManagementComponentComponent } from './pages/master-management-component/master-management-component.component';

import { ExamMainComponent } from './exam/exam-main/exam-main.component';
import { ExamNewComponent } from './exam/exam-new/exam-new.component';
import { ExamManagementComponent } from './exam/exam-management/exam-management.component';
import { LiftNewComponent } from './lift/lift-new/lift-new.component';
import { LiftManagementComponent } from './lift/lift-management/lift-management.component';
import { LiftMainComponent } from './lift/lift-main/lift-main.component';
import { LiftGetItBackComponent } from './lift/lift-get-it-back/lift-get-it-back.component';
import { ExamGetItBackComponent } from './exam/exam-get-it-back/exam-get-it-back.component';

const routes: Routes = [
  { path: '', component: StartComponent },
  
  { path: 'curso', component: MasterMainComponent },
  { path: 'curso/nuevo', component: MasterRegisterComponent },
  { path: 'curso/gestionar', component: MasterManagementComponentComponent },

  { path: 'examen', component: ExamMainComponent },
  { path: 'examen/nuevo', component: ExamNewComponent },
  { path: 'examen/recuperar', component: ExamGetItBackComponent },
  { path: 'examen/gestionar', component: ExamManagementComponent },

  { path: 'sustentacion', component: LiftMainComponent },
  { path: 'sustentacion/nuevo', component: LiftNewComponent },
  { path: 'sustentacion/recuperar', component: LiftGetItBackComponent },
  { path: 'sustentacion/gestionar', component: LiftManagementComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScheduleRoutingModule {}
