import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatTooltipModule} from '@angular/material/tooltip';

import { SharedxdComponent } from './sharedxd/sharedxd.component';
import { TitlePageComponent } from './components/title-page/title-page.component';
import { TableSelectComponent } from './components/table-select/table-select.component';
import { ManagementButtonsComponent } from './components/management-buttons/management-buttons.component';
import { IconSharedComponent } from './components/icon-shared/icon-shared.component';
import { ButtonSharedComponent } from './components/button-shared/button-shared.component';
import { InputComponent } from './components/input/input.component';
import { SelectComponent } from './components/select/select.component';
import { PruebaComponent } from './components/prueba/prueba.component';
import { ModalsDialogComponent } from './components/modals-dialog/modals-dialog.component';
import { ModalsDialogService } from 'src/app/services/modals-dialog/modals-dialog.service';
import { ApiService } from 'src/app/services/api/api.service';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { TestComponent } from './components/test/test.component';
import { DateComponent } from './components/date/date.component';
import { TableSelectFilterComponent } from './components/table-select-filter/table-select-filter.component';
import { DatepickerFromToComponent } from './components/datepicker-from-to/datepicker-from-to.component';
import { TimeFromToComponent } from './components/time-from-to/time-from-to.component';
import { WeekDaysComponent } from './components/week-days/week-days.component';

@NgModule({
  declarations: [
    SharedxdComponent,
    TitlePageComponent,
    TableSelectComponent,
    ManagementButtonsComponent,
    IconSharedComponent,
    ButtonSharedComponent,
    InputComponent,
    SelectComponent,
    PruebaComponent,
    ModalsDialogComponent,
    SpinnerComponent,
    TestComponent,
    DateComponent,
    TableSelectFilterComponent,
    DatepickerFromToComponent,
    TimeFromToComponent,
    WeekDaysComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
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
  ],
  exports: [
    SharedxdComponent,
    TitlePageComponent,
    TableSelectComponent,
    TableSelectFilterComponent,
    ManagementButtonsComponent,
    IconSharedComponent,
    ButtonSharedComponent,
    InputComponent,
    SelectComponent,
    TestComponent,
    DateComponent,
    DatepickerFromToComponent,
    TimeFromToComponent,
    WeekDaysComponent,
  ],
  providers: [ModalsDialogService, ApiService],
})
export class SharedModule {}
