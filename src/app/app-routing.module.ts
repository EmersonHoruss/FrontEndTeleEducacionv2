import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './boot/components/login/login.component';
import { HomeComponent } from './boot/components/home/home.component';

const routes: Routes = [
  { path: 'iniciar-sesion', component: LoginComponent },
  { path: 'casa', component: HomeComponent },
  {
    path: 'programaciones',
    loadChildren: () =>
      import('./schedule/schedule.module').then((m) => m.ScheduleModule),
  },
  {
    path: 'mantenimientos',
    loadChildren: () =>
      import('./maintenance/maintenance.module').then(
        (m) => m.MaintenanceModule
      ),
  },
  // {
  //   path: 'reportes',
  //   loadChildren: () =>
  //     import('./reports/reports.module').then(
  //       (m) => m.ReportsModule
  //     ),
  // },
  // {
  //   path: 'configuracion',
  //   loadChildren: () =>
  //     import('./configuration/configuration.module').then(
  //       (m) => m.ConfigurationModule
  //     ),
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
