import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../../services/login/login.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-boot',
  templateUrl: './boot.component.html',
  styleUrls: ['./boot.component.scss'],
})
export class BootComponent implements OnInit {
  isAuthenticatedObservable: Observable<boolean> = this.loginService.isLogged();
  isAuthenticated: boolean = true;
  constructor(private loginService: LoginService) {
    // console.log(this.isAuthenticatedObservable);
  }

  ngOnInit(): void {}

  canAccesAndIsLogged($event: boolean) {
    // console.log($event,'asdfasdf')
    this.isAuthenticated = $event;
  }
}
