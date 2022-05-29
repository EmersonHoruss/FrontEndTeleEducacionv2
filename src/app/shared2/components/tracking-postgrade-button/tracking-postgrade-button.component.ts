import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { InterfaceTrackingPostgradeButton } from '../../interfaces/interface-tracking-postgrade-button';

@Component({
  selector: 'app-tracking-postgrade-button',
  templateUrl: './tracking-postgrade-button.component.html',
  styleUrls: ['./tracking-postgrade-button.component.scss'],
})
export class TrackingPostgradeButtonComponent implements OnInit {
  sizeBiggerIcon: number = 25;
  sizeSmallIcon: number = 20;

  @Input() button: InterfaceTrackingPostgradeButton;
  @Output() clicked: EventEmitter<boolean> = new EventEmitter(false);

  constructor() {}

  ngOnInit(): void {}

  // OUTPUT FUNCTIONS
  hasClicked() {
    this.clicked.emit(true);
  }

  // INPUT FUNCTIONS
  getClass(): string {
    return this.getColorButton() + ' ' + this.getSizeButton();
  }

  getStyle(): any {
    return { width: this.getSizeIcon(), height: this.getSizeIcon() };
  }

  getSizeIcon(): string {
    return (
      (this.button.size === 'small'
        ? this.sizeSmallIcon
        : this.sizeBiggerIcon) + 'px'
    );
  }

  getColorButton(): string {
    return 'tracking-postgrade-' + this.button.color;
  }

  getSizeButton(): string {
    return 'tracking-postgrade-' + this.button.size + '-button';
  }
}
