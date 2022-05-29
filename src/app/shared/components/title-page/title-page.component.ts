import { Component, Input, OnInit } from '@angular/core';
import { DefaultTitlePage } from '../../constants/default-title-page';
import { TitlePageInterface } from '../../interfaces/title-page-interface';

@Component({
  selector: 'app-title-page',
  templateUrl: './title-page.component.html',
  styleUrls: ['./title-page.component.scss'],
})
export class TitlePageComponent implements OnInit {
  @Input() titlePage : TitlePageInterface  = DefaultTitlePage
  
  constructor() {}

  ngOnInit(): void {}
}
