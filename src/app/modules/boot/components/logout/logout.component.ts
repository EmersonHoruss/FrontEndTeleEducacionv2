import { Component, OnInit } from '@angular/core';
import { optionConstant } from './option.constants';
import { OptionInterface } from '../../interfaces/option-interface';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent implements OnInit {
  option: OptionInterface = optionConstant;

  constructor() {}

  ngOnInit(): void {}

  logout(){
    console.log('logOut')
  }
}
