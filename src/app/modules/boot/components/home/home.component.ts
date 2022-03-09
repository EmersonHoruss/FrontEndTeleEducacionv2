import { Component, OnInit } from '@angular/core';
import { NamePageService } from '../../../../services/name-page/name-page.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  namePage: string = 'Casa';

  constructor(private namePageS: NamePageService) {}

  ngOnInit(): void {
    this.namePageS.setNamePage(this.namePage);
  }
}
