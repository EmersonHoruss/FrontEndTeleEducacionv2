import { Component, OnInit } from '@angular/core';
import { optionConstant } from './option.constants';
import { OptionInterface } from '../../interfaces/option-interface';
import { SocialLoginService } from '../../../services/social-login/social-login.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent implements OnInit {
  option: OptionInterface = optionConstant;

  constructor(private loginSS: SocialLoginService) {}

  ngOnInit(): void {}

  signOut() {
    this.loginSS.signOut();
    this.loginSS.setIsLogged(false);
  }
}
