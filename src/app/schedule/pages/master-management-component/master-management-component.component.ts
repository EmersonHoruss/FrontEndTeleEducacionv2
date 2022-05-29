import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Constants } from './master-main.constants';
@Component({
  selector: 'app-master-management-component',
  templateUrl: './master-management-component.component.html',
  styleUrls: ['./master-management-component.component.scss'],
})
export class MasterManagementComponentComponent implements OnInit {
  constants = Constants;
  constructor(private router: Router) {}

  ngOnInit(): void {}

  cancel() {
    this.router.navigateByUrl('programaciones/curso');
  }
}
