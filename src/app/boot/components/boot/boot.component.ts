import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SocialLoginService } from 'src/app/services/social-login/social-login.service';

@Component({
  selector: 'app-boot',
  templateUrl: './boot.component.html',
  styleUrls: ['./boot.component.scss'],
})
export class BootComponent implements OnInit {
  isLogged: Observable<boolean> = this.loginSS.getIsLogged();

  constructor(private loginSS: SocialLoginService) {
    this.loginSS.expiration();
  }

  ngOnInit(): void {}
}
