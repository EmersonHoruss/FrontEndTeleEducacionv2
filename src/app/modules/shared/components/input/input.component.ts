import { Component, OnInit, Input, Output, ViewEncapsulation } from '@angular/core';
import { DefaultInput } from '../../constants/default-input';
import { InputInterface } from '../../interfaces/input-interface';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class InputComponent implements OnInit {
  @Input() input: InputInterface = DefaultInput;
  
  constructor() {}

  ngOnInit(): void {}
}
