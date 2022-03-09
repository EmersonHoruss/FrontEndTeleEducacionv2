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
import { MasterRegisterStartComponent } from './pages/master-register-start/master-register-start.component';
import { MasterRegisterContinueComponent } from './pages/master-register-continue/master-register-continue.component';
import { ModalsDialogService } from '../../../services/modals-dialog/modals-dialog.service';
import { NamePageService } from '../../../services/name-page/name-page.service';

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
    MasterRegisterStartComponent,
    MasterRegisterContinueComponent,
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
  ],
  providers: [ModalsDialogService, NamePageService],
})
export class ScheduleModule {}
