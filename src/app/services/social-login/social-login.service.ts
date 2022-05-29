import { Injectable } from '@angular/core';
import { SocialAuthService, GoogleLoginProvider } from 'angularx-social-login';
import { SesionInterface } from '../../interfaces/sesion-interface';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { GlobalStatusServiceService } from '../global-status/global-status-service.service';

@Injectable({
  providedIn: 'root',
})
export class SocialLoginService {
  private isLogged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    this.isLoggedIsSaveInLS()
  );

  constructor(
    private authService: SocialAuthService,
    private router: Router,
    private globalStatusS: GlobalStatusServiceService
  ) {}

  // MANAGING LOG

  signIn(): Promise<any> {
    return this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.authService.signOut();
    localStorage.clear();
    // this.deleteSesion();
    this.router.navigate(['/iniciar-sesion']);
  }

  // MANAGIN EXPIRATION
  hasExpired(): boolean {
    return false;
  }

  expiration() {
    // const timeout: number = this.getTimeout();
    const renewTimeExpiration = 5000; // each 5 seconds page renew expiration
    const now = Date.now();
    // console.log('2');
    const sesion = this.getSesion();
    // console.log(sesion, '1');

    if (sesion) {
      let expires_at = sesion.expires_at;
      // console.log(sesion, '2');

      // if () {
      // if now is less than expires time so renew expires time, else
      // logout
      if (now <= expires_at) {
        of(null)
          .pipe(delay(renewTimeExpiration))
          .subscribe((expired) => {
            expires_at = expires_at + renewTimeExpiration;
            sesion.expires_at = expires_at;
            // console.log(this.getValueIsLogged());
            if (this.getValueIsLogged()) {
              this.updateSesion(sesion);
              // console.log(this.getSesion());
              this.expiration();
            } else {
              // this.signOut();
              this.setIsLogged(false);
            }
          });
      } else {
        this.signOut();
        this.setIsLogged(false);
      }
      // }
    }
  }

  getTimeout(): number {
    // get current time
    const nowDate: number = Date.now();

    // get expires time
    const sesionLS: any = localStorage.getItem('sesion');
    if (!sesionLS) return 0;
    const expires_at = parseInt(JSON.parse(sesionLS).expires_at);

    // rest expires time less current time
    const restDates = expires_at - nowDate;

    // return the rest
    // return restDates < 0 ? 0 : restDates;
    // console.log(restDates);
    return restDates;
  }

  // MANAGIN ISLOGGED
  isLoggedIsSaveInLS(): boolean {
    const sesion: any = localStorage.getItem('sesion');

    return sesion !== null;
  }

  getIsLogged(): Observable<boolean> {
    return this.isLogged.asObservable();
  }

  setIsLogged(isLogged: boolean) {
    localStorage.setItem('isLogged', isLogged.toString());
    this.isLogged.next(isLogged);
  }

  getValueIsLogged(): boolean {
    return this.isLogged.value;
  }

  // LOCAL STORAGE
  formatSesion(sesion: any, tipoPerfil: string): SesionInterface {
    const formatedSesion: SesionInterface = {
      email: sesion.email,
      token_type: sesion.response.token_type,
      access_token: sesion.response.access_token,
      expires_at: sesion.response.expires_at,
      expires_in: sesion.response.expires_in,
      photoUrl: sesion.photoUrl,
      basic_token: btoa(sesion.email + ':' + tipoPerfil),
    };
    return formatedSesion;
  }

  saveSession(sesion: SesionInterface) {
    this.globalStatusS.boot();
    localStorage.setItem('sesion', JSON.stringify(sesion));
  }

  getSesion() {
    const sesion: any = localStorage.getItem('sesion');
    return sesion ? JSON.parse(sesion) : null;
  }

  updateSesion(sesion: any) {
    localStorage.setItem('sesion', JSON.stringify(sesion));
  }

  deleteSesion() {
    this.globalStatusS.clean();

    localStorage.removeItem('sesion');
  }

  savePersonal($personal: any) {
    localStorage.setItem('personal', JSON.stringify($personal));
  }
}
