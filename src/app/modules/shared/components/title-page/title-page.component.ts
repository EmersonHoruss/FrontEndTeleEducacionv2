import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-title-page',
  templateUrl: './title-page.component.html',
  styleUrls: ['./title-page.component.scss'],
})
export class TitlePageComponent implements OnInit {
  @Input() titlePage: string = '';
  @Input() actionPage: string = '';
  @Input() sectionPage: string = '';
  
  constructor() {}

  ngOnInit(): void {}
}
