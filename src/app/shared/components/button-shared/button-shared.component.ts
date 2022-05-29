import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DefaultButton } from '../../constants/default-button';
import { ButtonInterface } from '../../interfaces/button-interface';
import { IconInterface } from '../../interfaces/icon-interface';

@Component({
  selector: 'app-button-shared',
  templateUrl: './button-shared.component.html',
  styleUrls: ['./button-shared.component.scss'],
})
export class ButtonSharedComponent implements OnInit {
  @Input() button: ButtonInterface = DefaultButton;
  @Output() clicked: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() disabled: boolean = false;

  constructor() {}

  ngOnInit(): void {
    // console.log(this.button);
  }

  isClicked(value: boolean) {
    this.clicked.emit(value);
  }
}
