import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaintenanceRoutingModule } from './maintenance-routing.module';
import { MainProjectComponent } from './projects/main-project/main-project.component';
import { NewUpdateProjectComponent } from './projects/new-update-project/new-update-project.component';
import { StartComponent } from './start/start.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ModalMemberComponent } from './projects/modal-member/modal-member.component';
import { MainTeacherComponent } from './teachers/main-teacher/main-teacher.component';
import { NewUpdateTeacherComponent } from './teachers/new-update-teacher/new-update-teacher.component';
import { MainStudentComponent } from './students/main-student/main-student.component';
import { NewUpdateStudentComponent } from './students/new-update-student/new-update-student.component';
import { MainProgramComponent } from './programs/main-program/main-program.component';
import { NewUpdateProgramComponent } from './programs/new-update-program/new-update-program.component';
import { MainEntrantComponent } from './entrants/main-entrant/main-entrant.component';
import { NewUpdateEntrantComponent } from './entrants/new-update-entrant/new-update-entrant.component';
import { ModalsDialogService } from '../services/modals-dialog/modals-dialog.service';
import { NamePageService } from '../services/name-page/name-page.service';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { Shared2Module } from '../shared2/shared2.module';

@NgModule({
  declarations: [
    MainProjectComponent,
    NewUpdateProjectComponent,
    StartComponent,
    ModalMemberComponent,
    MainTeacherComponent,
    NewUpdateTeacherComponent,
    MainStudentComponent,
    NewUpdateStudentComponent,
    MainProgramComponent,
    NewUpdateProgramComponent,
    MainEntrantComponent,
    NewUpdateEntrantComponent,
  ],
  imports: [
    CommonModule,
    MaintenanceRoutingModule,
    ReactiveFormsModule,


    AngularMaterialModule,
    Shared2Module
  ],
  providers: [ModalsDialogService, NamePageService],
})
export class MaintenanceModule {}
