import { Component, OnInit, Input } from '@angular/core';
import { IconInterface } from '../../interfaces/icon-interface';

@Component({
  selector: 'app-icon-shared',
  templateUrl: './icon-shared.component.html',
  styleUrls: ['./icon-shared.component.scss'],
})
export class IconSharedComponent implements OnInit {
  @Input() icon: IconInterface = {
    classCss: 'bi bi-check',
    width: '',
    height: '',
    fill: '',
  };
  
  constructor() {}

  ngOnInit(): void {}
}
