import { Injectable } from '@angular/core';
import { SocialAuthService, GoogleLoginProvider } from 'angularx-social-login';
import { SesionInterface } from '../../interfaces/sesion-interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SocialLoginService {
  constructor(private authService: SocialAuthService) {}

  // MANAGING LOG
  signIn(): Promise<any> {
    return this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  logOut(): void {
    this.authService.signOut();
    this.deleteSesion();
  }

  // refreshToken(): void {
  //   this.authService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
  // }

  // getSocialAuthService(): SocialAuthService {
  //   return this.authService;
  // }

  // getStatus(): Observable<any> {
  //   return this.authService.authState;
  // }

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
  }

  getSesion() {
    const sesion: any = localStorage.getItem('sesion');
    return JSON.parse(sesion);
  }

  deleteSesion() {
    localStorage.removeItem('sesion');
  }
}
