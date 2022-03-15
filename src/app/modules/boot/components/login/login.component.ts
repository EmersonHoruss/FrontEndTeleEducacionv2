import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { SocialLoginService } from '../../../../services/social-login/social-login.service';
import { Constants } from './login.constants';
import { ModalsDialogService } from '../../../../services/modals-dialog/modals-dialog.service';
import { modalsDialog } from 'src/app/modules/shared/constants/modals-dialog';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constants: any = Constants;
  rolUser: any = null;

  constructor(
    private loginSS: SocialLoginService,
    private dialogService: ModalsDialogService,
    private http: HttpClient,
    private router: Router
  ) {
    this.constants.selectRol.getHttp = this.http.get('/api/TipoPerfil');
  }

  ngOnInit(): void {}

  getSelectedValue(event: string | number) {
    this.rolUser = event;
  }

  signInWithGoogle(event: boolean) {
    const modalError = modalsDialog.error;
    modalError.description = 'Seleccione un rol para ingresar al sistema.';

    !this.rolUser
      ? this.dialogService.openModalDialog(modalError)
      : this.loginSS.signIn().then((e) => {
          this.afterSignInWithGoogle(e);
        });
  }

  afterSignInWithGoogle(sesion: any) {
    const correo: string = sesion.email;

    this.dialogService.openModalDialog(modalsDialog.load, true);

    this.http
      .get(`/api/Acceso?Correo=${correo}&TipoPerfil=${this.rolUser}`)
      .subscribe((e: any) => {
        this.dialogService.closeLastOpenedModalDialog();
        if (!e.length) this.openErrorModalDialog();
        else {
          this.loginSS.saveSession(this.loginSS.formatSesion(sesion));
          this.loginSS.setIsLogged(true);
          this.loginSS.expiration();
          this.router.navigateByUrl('/casa');
        }
      });
  }

  openErrorModalDialog() {
    modalsDialog.error.description =
      'Usted no tiene acceso, comuníquese con tele-educacion_epg@unprg.edu.pe';
    this.dialogService.openModalDialog(modalsDialog.error);
  }
}
