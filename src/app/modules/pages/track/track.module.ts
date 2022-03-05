import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrackRoutingModule } from './track-routing.module';
import { StartComponent } from './start/start.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [StartComponent],
  imports: [CommonModule, TrackRoutingModule,SharedModule],
})
export class TrackModule {}
