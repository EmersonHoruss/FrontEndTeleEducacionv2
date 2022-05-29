// Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../angular-material/angular-material.module';

// Components
import { TrackingPostgradeButtonComponent } from './components/tracking-postgrade-button/tracking-postgrade-button.component';

@NgModule({
  declarations: [TrackingPostgradeButtonComponent],
  imports: [CommonModule, AngularMaterialModule],
  exports: [TrackingPostgradeButtonComponent],
})
export class Shared2Module {}
