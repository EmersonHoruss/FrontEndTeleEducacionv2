import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/boot/components/login/login.component';
import { HomeComponent } from './modules/boot/components/home/home.component';

const routes: Routes = [
  { path: 'iniciar-sesion', component: LoginComponent },
  { path: 'casa', component: HomeComponent },
  {
    path: 'programar',
    loadChildren: () =>
      import('./modules/pages/schedule/schedule.module').then(
        (m) => m.ScheduleModule
      ),
  },
  {
    path: 'reprogramar',
    loadChildren: () =>
      import('./modules/pages/reschedule/reschedule.module').then(
        (m) => m.RescheduleModule
      ),
  },
  {
    path: 'dar-seguimiento',
    loadChildren: () =>
      import('./modules/pages/track/track.module').then((m) => m.TrackModule),
  },
  {
    path: 'matenimiento',
    loadChildren: () =>
      import('./modules/pages/maintenance/maintenance.module').then(
        (m) => m.MaintenanceModule
      ),
  },
  {
    path: 'reportes',
    loadChildren: () =>
      import('./modules/pages/reports/reports.module').then(
        (m) => m.ReportsModule
      ),
  },
  {
    path: 'configuracion',
    loadChildren: () =>
      import('./modules/pages/configuration/configuration.module').then(
        (m) => m.ConfigurationModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
