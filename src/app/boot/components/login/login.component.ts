import { Component, OnInit, EventEmitter, Output } from '@angular/core';
// import { SocialLoginService } from '../../../../services/social-login/social-login.service';
import { Constants } from './login.constants';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
// import { db } from '../../../../app.module';
import { SocialLoginService } from '../../../services/social-login/social-login.service';
import { ModalsDialogService } from '../../../services/modals-dialog/modals-dialog.service';
import { modalsDialog } from '../../../shared/constants/modals-dialog';

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
    this.constants.selectRol.getHttp = this.http.get('/api/TipoPerfiles');
  }

  ngOnInit(): void {}

  getSelectedValue(event: any) {
    // console.log(event);
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
    this.dialogService.openModalDialog(modalsDialog.load, true);

    this.loginSS.saveSession(this.loginSS.formatSesion(sesion, this.rolUser));

    this.http.get('/api/AccesoSistemaTeleEducacion').subscribe(
      (e: any) => {
        this.dialogService.closeLastOpenedModalDialog();
        this.loginSS.setIsLogged(true);
        this.loginSS.expiration();
        this.loginSS.savePersonal(e.personal);
        // console.log(e);
        this.router.navigateByUrl('/casa');
      },
      (error) => {
        this.loginSS.deleteSesion();
        this.dialogService.closeLastOpenedModalDialog();
        this.openErrorModalDialog();
        // console.log('no pass');
      }
    );
  }

  openErrorModalDialog() {
    modalsDialog.error.description =
      'Usted no tiene acceso, comuníquese con tele-educacion_epg@unprg.edu.pe';
    this.dialogService.openModalDialog(modalsDialog.error);
  }

  // uwu() {
  //   const myDB = db;
  //   myDB.destinos.add({ nombre: 'hola', imgUrl: 'asdf' });
  // }
}
