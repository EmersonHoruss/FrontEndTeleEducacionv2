import { FormBuilder, FormGroup } from '@angular/forms';
import { GlobalStatusServiceService } from 'src/app/services/global-status/global-status-service.service';

export const listenerFormAutomatized = (
  fb: FormGroup,
  currentUrl: string = '/mantenimientos/docentes',
  routes: Array<string> = []
) => {
  const globalSS = new GlobalStatusServiceService();

  fb.controls['TipoFiltro'].valueChanges.subscribe((e: any) => {
    const globalStatus = globalSS.get();
    const teacher = globalStatus.Docente;

    if (currentUrl === '/mantenimientos/docentes') {
      teacher.Mantenimiento.CurrentState.Form.TipoFiltro = e;
      globalSS.createOrUpdatePageOfEntity(
        'Docente',
        'Mantenimiento',
        teacher.Mantenimiento
      );
    } else {
      teacher.Recuperar.CurrentState.Form.TipoFiltro = e;
      globalSS.createOrUpdatePageOfEntity(
        'Docente',
        'Recuperar',
        teacher.Recuperar
      );
    }
  });
};
