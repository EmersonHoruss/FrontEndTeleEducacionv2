import { Injectable } from '@angular/core';
import { SocialAuthService, GoogleLoginProvider } from 'angularx-social-login';
import { SesionInterface } from '../../interfaces/sesion-interface';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SocialLoginService {
  private isLogged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    this.isLoggedIsSaveInLS()
  );

  constructor(private authService: SocialAuthService, private router: Router) {}

  // MANAGING LOG

  signIn(): Promise<any> {
    return this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.authService.signOut();
    this.deleteSesion();
    this.router.navigate(['/iniciar-sesion']);
  }

  // MANAGIN EXPIRATION
  expiration() {
    const timeout: number = this.getTimeout();
    of(null)
      .pipe(delay(timeout))
      .subscribe((expired) => {
        // console.log('EXPIRED!!');
        this.signOut();
        this.setIsLogged(false);
      });
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
  formatSesion(sesion: any): SesionInterface {
    const formatedSesion: SesionInterface = {
      email: sesion.email,
      token_type: sesion.response.token_type,
      access_token: sesion.response.access_token,
      expires_at: sesion.response.expires_at,
      expires_in: sesion.response.expires_in,
      photoUrl: sesion.photoUrl,
    };
    return formatedSesion;
  }

  saveSession(sesion: SesionInterface) {
    localStorage.setItem('sesion', JSON.stringify(sesion));
    // this.expiration();
    // console.log(sesion.expires_in, typeof sesion.expires_in);
    // console.log(sesion.expires_at, typeof sesion.expires_at);
    // console.log(new Date(sesion.expires_at).toString());
  }

  getSesion() {
    const sesion: any = localStorage.getItem('sesion');
    return JSON.parse(sesion);
  }

  deleteSesion() {
    localStorage.removeItem('sesion');
  }
}
