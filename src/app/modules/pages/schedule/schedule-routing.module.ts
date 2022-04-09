import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StartComponent } from './start/start.component';
import { DoctorateMainComponent } from './pages/doctorate-main/doctorate-main.component';
import { LanguageMainComponent } from './pages/language-main/language-main.component';
import { ExamMainComponent } from './pages/exam-main/exam-main.component';
import { LiftMainComponent } from './pages/lift-main/lift-main.component';
import { MasterMainComponent } from './pages/master-main/master-main.component';
import { MasterUpdateComponent } from './pages/master-update/master-update.component';
import { MasterSeeComponent } from './pages/master-see/master-see.component';
import { MasterRegisterComponent } from './pages/master-register/master-register.component';
import { MasterRescheduleComponent } from './pages/master-reschedule/master-reschedule.component';
import { MasterSaveComponent } from './pages/master-save/master-save.component';
import { MasterFollowComponent } from './pages/master-follow/master-follow.component';

const routes: Routes = [
  { path: '', component: StartComponent },
  { path: 'maestria', component: MasterMainComponent },
  {
    path: 'maestria/registrar',
    component: MasterRegisterComponent,
  },
  { path: 'maestria/reprogramar', component: MasterRescheduleComponent },
  { path: 'maestria/dar-seguimiento', component: MasterFollowComponent },
  { path: 'maestria/guardar', component: MasterSaveComponent },
  { path: 'maestria/actualizar', component: MasterUpdateComponent },
  { path: 'maestria/ver', component: MasterSeeComponent },
  { path: 'doctorado', component: DoctorateMainComponent },
  { path: 'idioma', component: LanguageMainComponent },
  { path: 'examen', component: ExamMainComponent },
  { path: 'sustentacion', component: LiftMainComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScheduleRoutingModule {}
