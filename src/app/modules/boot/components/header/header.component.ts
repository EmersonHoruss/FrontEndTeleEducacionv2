import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { NavigationService } from '../../services/navigation/navigation.service';
import { Observable } from 'rxjs';
import { NamePageService } from '../../../../services/name-page/name-page.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  sizeIcons: string = '1rem';
  sesion: any = localStorage.getItem('sesion');
  photoUrl: string = JSON.parse(this.sesion).photoUrl;

  namePage: Observable<string> = this.namePageS.getNamePage();

  @Output() navBarClicked = new EventEmitter<boolean>();

  constructor(
    private navigationS: NavigationService,
    public namePageS: NamePageService
  ) {
    // this.namePagex.subscribe((e) => (this.namePage = e));
    // console.log(this.namePage);
  }

  ngOnInit(): void {}

  click() {
    this.navBarClicked.emit();
  }
}
