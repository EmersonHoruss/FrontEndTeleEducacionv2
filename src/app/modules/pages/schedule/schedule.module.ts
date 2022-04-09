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
import { ExamMainComponent } from './pages/exam-main/exam-main.component';
import { LiftMainComponent } from './pages/lift-main/lift-main.component';
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

@NgModule({
  declarations: [
    StartComponent,
    DoctorateMainComponent,
    MasterMainComponent,
    LanguageMainComponent,
    ExamMainComponent,
    LiftMainComponent,
    MasterUpdateComponent,
    MasterSeeComponent,
    MasterRegisterComponent,
    MasterRescheduleComponent,
    MasterSaveComponent,
    MasterFollowComponent,
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
