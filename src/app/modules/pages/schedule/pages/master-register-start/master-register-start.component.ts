import { Component, OnInit } from '@angular/core';
import { Constants } from './master-register-start.constants';

@Component({
  selector: 'app-master-register-start',
  templateUrl: './master-register-start.component.html',
  styleUrls: ['./master-register-start.component.scss'],
})
export class MasterRegisterStartComponent implements OnInit {
  constants = Constants;

  constructor() {}

  ngOnInit(): void {}
}
