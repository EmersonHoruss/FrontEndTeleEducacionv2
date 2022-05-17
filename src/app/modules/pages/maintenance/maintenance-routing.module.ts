import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartComponent } from './start/start.component';
import { MainProjectComponent } from './projects/main-project/main-project.component';
import { NewUpdateProjectComponent } from './projects/new-update-project/new-update-project.component';
import { NamePageService } from '../../../services/name-page/name-page.service';
import { ModalsDialogService } from '../../../services/modals-dialog/modals-dialog.service';
import { MainTeacherComponent } from './teachers/main-teacher/main-teacher.component';
import { NewUpdateTeacherComponent } from './teachers/new-update-teacher/new-update-teacher.component';
import { MainStudentComponent } from './students/main-student/main-student.component';
import { NewUpdateStudentComponent } from './students/new-update-student/new-update-student.component';
import { MainProgramComponent } from './programs/main-program/main-program.component';
import { NewUpdateProgramComponent } from './programs/new-update-program/new-update-program.component';

const routes: Routes = [
  { path: '', component: StartComponent },

  { path: 'proyectos', component: MainProjectComponent },
  { path: 'proyectos/nuevo', component: NewUpdateProjectComponent },
  { path: 'proyectos/actualizar', component: NewUpdateProjectComponent },

  { path: 'docentes', component: MainTeacherComponent },
  { path: 'docentes/nuevo', component: NewUpdateTeacherComponent },
  { path: 'docentes/actualizar', component: NewUpdateTeacherComponent },
  { path: 'docentes/recuperar', component: MainTeacherComponent },

  { path: 'estudiantes', component: MainStudentComponent },
  { path: 'estudiantes/nuevo', component: NewUpdateStudentComponent },
  { path: 'estudiantes/actualizar', component: NewUpdateStudentComponent },
  { path: 'estudiantes/recuperar', component: MainStudentComponent },

  { path: 'programas', component: MainProgramComponent },
  { path: 'programas/nuevo', component: NewUpdateProgramComponent },
  { path: 'programas/actualizar', component: NewUpdateProgramComponent },
  { path: 'programas/recuperar', component: MainProgramComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaintenanceRoutingModule {}
