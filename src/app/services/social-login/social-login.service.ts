import { Injectable } from '@angular/core';
import { SocialAuthService, GoogleLoginProvider } from 'angularx-social-login';

@Injectable({
  providedIn: 'root',
})
export class SocialLoginService {
  constructor(private authService: SocialAuthService) {}

  signInWithGoogle(): Promise<any> {
    return this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  logOut(): void {
    this.authService.signOut();
  }

  refreshToken(): void {
    this.authService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
  }

  getSocialAuthService(): SocialAuthService {
    return this.authService;
  }
}
