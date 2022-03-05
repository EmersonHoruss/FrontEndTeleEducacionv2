import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { SocialLoginService } from '../../../../services/social-login/social-login.service';
import { Constants } from './login.constants';
import { ModalsDialogService } from '../../../../services/modals-dialog/modals-dialog.service';
import { modalsDialog } from 'src/app/modules/shared/constants/modals-dialog';
import { LoginService } from '../../../../services/login/login.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @Output() canAccessAndIsLogged: EventEmitter<boolean> =
    new EventEmitter<boolean>(false);

  constants: any = Constants;
  rolUser: any = null;
  xd = {
    id: 6,
    Codigo: 2,
    Nombre: 'Jose Ernesto',
    Correo: 'jernesto@unprg.edu.pe',
    Estado: 'A',
    Icono: 'The best football team in the world!',
    Vigencia: true,
    InicioAcceso: '12/11/21',
    FinAcceso: '12/11/22',
  };
  constructor(
    private socialLoginService: SocialLoginService,
    private loginService: LoginService,
    private dialogService: ModalsDialogService,
    private http: HttpClient
  ) {
    // this.http.post('/api/Usuario', this.xd).subscribe((e) => console.log(e));
    this.http.get('/api/TipoUsuario')
  }

  ngOnInit(): void {}

  signInWithGoogle(event: boolean) {
    const modalError = modalsDialog.error;
    modalError.description = 'Seleccione un rol para ingresar al sistema.';
    !this.rolUser
      ? this.dialogService.successModalDialog(modalsDialog.error)
      : this.socialLoginService
          .signInWithGoogle()
          .then((e) => this.canAccessAndIsLogged.emit(true))
          .catch((e) => this.canAccessAndIsLogged.emit(false));
  }

  getSelectedValue(event: string | number) {
    this.rolUser = event;
  }
}

// this.router.navigate(['mainpage'])
