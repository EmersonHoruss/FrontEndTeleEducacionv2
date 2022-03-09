// angular modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

// my modules
import { SharedModule } from '../shared/shared.module';

import { MatSidenavModule } from '@angular/material/sidenav';

import { BootComponent } from './components/boot/boot.component';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { HomeComponent } from './components/home/home.component';
import { TemplateComponent } from './components/template/template.component';
import { MenuComponent } from './components/menu/menu.component';
import { IconComponent } from './components/icon/icon.component';
import { LogoutComponent } from './components/logout/logout.component';

// external services
import { SocialAuthService } from 'angularx-social-login';

// my services
import { LoginService } from 'src/app/services/login/login.service';
import { NavigationService } from './services/navigation/navigation.service';
import { ModalsDialogService } from '../../services/modals-dialog/modals-dialog.service';
import { ApiService } from 'src/app/services/api/api.service';
import { NamePageService } from '../../services/name-page/name-page.service';

@NgModule({
  declarations: [
    BootComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    SidenavComponent,
    HomeComponent,
    TemplateComponent,
    MenuComponent,
    IconComponent,
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
    NavigationService,
    SocialAuthService,
    LoginService,
    ModalsDialogService,
    ApiService,
    NamePageService,
  ],
  exports: [BootComponent],
})
export class BootModule {}
