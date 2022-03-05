import { Component, OnInit, Input } from '@angular/core';
import { IconInterface } from '../../interfaces/icon-interface';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
})
export class IconComponent implements OnInit {
  @Input() icon: IconInterface = {
    classCss: '',
    width: '',
    height: '',
    fill: '',
  };

  constructor() {}

  ngOnInit(): void {}
}
