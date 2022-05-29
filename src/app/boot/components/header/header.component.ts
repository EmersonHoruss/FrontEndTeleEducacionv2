import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NamePageService } from 'src/app/services/name-page/name-page.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  sizeIcons: string = '1rem';
  sesion: any = localStorage.getItem('sesion');
  photoUrl: string = JSON.parse(this.sesion).photoUrl;

  @Output() navBarClicked = new EventEmitter<boolean>();

  constructor(public namePageS: NamePageService) {}

  ngOnInit(): void {}

  click() {
    this.navBarClicked.emit();
  }
}
