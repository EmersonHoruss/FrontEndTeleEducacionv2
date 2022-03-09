import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { SocialLoginService } from '../../../../services/social-login/social-login.service';
import { Constants } from './login.constants';
import { ModalsDialogService } from '../../../../services/modals-dialog/modals-dialog.service';
import { modalsDialog } from 'src/app/modules/shared/constants/modals-dialog';
import { LoginService } from '../../../../services/login/login.service';
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
    private loginService: LoginService,
    private dialogService: ModalsDialogService,
    private http: HttpClient,
    private router: Router
  ) {
    this.constants.selectRol.getHttp = this.http.get('/api/TipoPerfil');
  }

  ngOnInit(): void {}

  signInWithGoogle(event: boolean) {
    const modalError = modalsDialog.error;
    modalError.description = 'Seleccione un rol para ingresar al sistema.';

    !this.rolUser
      ? this.dialogService.successModalDialog(modalsDialog.error)
      : this.loginSS.signIn().then((e) => {
          // saving session
          this.loginSS.saveSession(this.loginSS.formatSesion(e));
          // redirecting after logged
          this.router.navigate(['casa']);
        });
  }

  getSelectedValue(event: string | number) {
    this.rolUser = event;
  }
}
