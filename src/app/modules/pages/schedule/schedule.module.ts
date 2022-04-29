import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScheduleRoutingModule } from './schedule-routing.module';
import { SharedModule } from '../../shared/shared.module';

import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';

import { StartComponent } from './start/start.component';
import { DoctorateMainComponent } from './pages/doctorate-main/doctorate-main.component';
import { LanguageMainComponent } from './pages/language-main/language-main.component';
import { FormsModule } from '@angular/forms';
import { MasterMainComponent } from './pages/master-main/master-main.component';
import { MasterUpdateComponent } from './pages/master-update/master-update.component';
import { MasterSeeComponent } from './pages/master-see/master-see.component';
import { ModalsDialogService } from '../../../services/modals-dialog/modals-dialog.service';
import { NamePageService } from '../../../services/name-page/name-page.service';
import { MasterRegisterComponent } from './pages/master-register/master-register.component';
import { MasterRescheduleComponent } from './pages/master-reschedule/master-reschedule.component';
import { MasterSaveComponent } from './pages/master-save/master-save.component';
import { MatButtonModule } from '@angular/material/button';
import { MasterFollowComponent } from './pages/master-follow/master-follow.component';
import { MasterManagementComponentComponent } from './pages/master-management-component/master-management-component.component';
import { ExamNewComponent } from './exam/exam-new/exam-new.component';
import { ExamManagementComponent } from './exam/exam-management/exam-management.component';
import { ExamMainComponent } from './exam/exam-main/exam-main.component';
import { LiftManagementComponent } from './lift/lift-management/lift-management.component';
import { LiftNewComponent } from './lift/lift-new/lift-new.component';
import { LiftMainComponent } from './lift/lift-main/lift-main.component';
import { LiftGetItBackComponent } from './lift/lift-get-it-back/lift-get-it-back.component';
import { ExamGetItBackComponent } from './exam/exam-get-it-back/exam-get-it-back.component';

@NgModule({
  declarations: [
    StartComponent,
    DoctorateMainComponent,
    MasterMainComponent,
    LanguageMainComponent,
    MasterUpdateComponent,
    MasterSeeComponent,
    MasterRegisterComponent,
    MasterRescheduleComponent,
    MasterSaveComponent,
    MasterFollowComponent,
    MasterManagementComponentComponent,
    LiftMainComponent,
    ExamMainComponent,
    ExamNewComponent,
    ExamManagementComponent,
    LiftManagementComponent,
    LiftNewComponent,
    LiftGetItBackComponent,
    ExamGetItBackComponent,
  ],
  imports: [
    CommonModule,
    ScheduleRoutingModule,
    SharedModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    FormsModule,
    MatInputModule,
    MatTableModule,
    MatButtonModule,
  ],
  providers: [ModalsDialogService, NamePageService],
})
export class ScheduleModule {}
