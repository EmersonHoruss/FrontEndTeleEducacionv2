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
import { MasterRegisterStartComponent } from './pages/master-register-start/master-register-start.component';
import { MasterRegisterContinueComponent } from './pages/master-register-continue/master-register-continue.component';

const routes: Routes = [
  { path: '', component: StartComponent },
  { path: 'maestria', component: MasterMainComponent },
  {
    path: 'maestria/empezar-registrar',
    component: MasterRegisterStartComponent,
  },
  {
    path: 'maestria/continuar-registrar',
    component: MasterRegisterContinueComponent,
  },
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
