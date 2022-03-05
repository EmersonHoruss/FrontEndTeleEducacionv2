import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RescheduleRoutingModule } from './reschedule-routing.module';
import { StartComponent } from './start/start.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [StartComponent],
  imports: [CommonModule, RescheduleRoutingModule, SharedModule],
})
export class RescheduleModule {}
