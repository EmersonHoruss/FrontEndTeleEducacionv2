import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaintenanceRoutingModule } from './maintenance-routing.module';
import { MainProjectComponent } from './projects/main-project/main-project.component';
import { NewUpdateProjectComponent } from './projects/new-update-project/new-update-project.component';
import { StartComponent } from './start/start.component';
import { SharedModule } from '../../shared/shared.module';
import { ModalsDialogService } from '../../../services/modals-dialog/modals-dialog.service';
import { NamePageService } from '../../../services/name-page/name-page.service';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ModalMemberComponent } from './projects/modal-member/modal-member.component';
import { MainTeacherComponent } from './teachers/main-teacher/main-teacher.component';
import { NewUpdateTeacherComponent } from './teachers/new-update-teacher/new-update-teacher.component';
import { MainStudentComponent } from './students/main-student/main-student.component';
import { NewUpdateStudentComponent } from './students/new-update-student/new-update-student.component';
import { MainProgramComponent } from './programs/main-program/main-program.component';
import { NewUpdateProgramComponent } from './programs/new-update-program/new-update-program.component';
import { MainEntrantComponent } from './entrants/main-entrant/main-entrant.component';
import { NewUpdateEntrantComponent } from './entrants/new-update-entrant/new-update-entrant.component';

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
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTooltipModule,
    ReactiveFormsModule,
    MatCheckboxModule,
  ],
  providers: [ModalsDialogService, NamePageService],
})
export class MaintenanceModule {}
