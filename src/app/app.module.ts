// internal modules
import { NgModule, Injectable } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

// external modules
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
  GoogleLoginProvider,
  SocialAuthServiceConfig,
} from 'angularx-social-login';

// module to start aplication

// bootstraped component
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptorServiceService } from './interceptors/auth/auth-interceptor-service.service';

import Dexie from 'dexie';

import { dbService } from './services/db/db.service';
import { BootModule } from './boot/boot.module';
import { CanDeactivateGuardService } from './services/can-deactivate-guard/can-deactivate-guard.service';

export const db = new dbService();

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BootModule,
    NoopAnimationsModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: true,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '325406166900-d4ch0ksuolkkieb79d9i09ii3qktmpoe.apps.googleusercontent.com'
            ),
          },
        ],
      } as SocialAuthServiceConfig,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorServiceService,
      multi: true,
    },
    dbService,
    CanDeactivateGuardService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
