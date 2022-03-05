import { Component, OnInit, Input } from '@angular/core';
import { ButtonInterface } from '../../interfaces/button-interface';
import { ManagementButtonsNoRegister } from '../../constants/management-buttons';

@Component({
  selector: 'app-management-buttons',
  templateUrl: './management-buttons.component.html',
  styleUrls: ['./management-buttons.component.scss'],
})
export class ManagementButtonsComponent implements OnInit {
  @Input() managementButtons: Array<ButtonInterface> =
    ManagementButtonsNoRegister;

  constructor() {
    // console.log(ButtonRegister);
  }

  ngOnInit(): void {}

  clicked(value:boolean){
    console.log(value)
  }
}
