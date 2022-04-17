import { Component, OnInit } from '@angular/core';
import { NamePageService } from '../../../../services/name-page/name-page.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss'],
})
export class StartComponent implements OnInit {
  constructor(private namePageS: NamePageService) {
  }

  ngOnInit(): void {}
}
