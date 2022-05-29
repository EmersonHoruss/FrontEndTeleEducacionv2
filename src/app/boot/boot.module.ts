// angular modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

// my modules
import { SharedModule } from '../shared/shared.module';

import { MatSidenavModule } from '@angular/material/sidenav';

// isn't used iconComponent

import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MenuComponent } from './components/menu/menu.component';
import { TemplateComponent } from './components/template/template.component';
import { BootComponent } from './components/boot/boot.component';
import { HomeComponent } from './components/home/home.component';
import { LogoutComponent } from './components/logout/logout.component';

// external services
import { SocialAuthService } from 'angularx-social-login';

// my services
import { LoginService } from 'src/app/services/login/login.service';

import { ApiService } from 'src/app/services/api/api.service';
import { NamePageService } from '../services/name-page/name-page.service';
import { ModalsDialogService } from '../services/modals-dialog/modals-dialog.service';

@NgModule({
  declarations: [
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    TemplateComponent,
    BootComponent,
    HomeComponent,
    LogoutComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    HttpClientModule,
    MatSidenavModule,
  ],
  providers: [
    SocialAuthService,
    LoginService,
    ModalsDialogService,
    ApiService,
    NamePageService,
  ],
  exports: [BootComponent],
})
export class BootModule {}
