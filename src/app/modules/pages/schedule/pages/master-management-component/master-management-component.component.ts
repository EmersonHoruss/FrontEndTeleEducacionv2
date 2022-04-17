import { Component, OnInit } from '@angular/core';
import { Constants } from './master-main.constants';
@Component({
  selector: 'app-master-management-component',
  templateUrl: './master-management-component.component.html',
  styleUrls: ['./master-management-component.component.scss'],
})
export class MasterManagementComponentComponent implements OnInit {
  constants = Constants;
  constructor() {}

  ngOnInit(): void {}
}
