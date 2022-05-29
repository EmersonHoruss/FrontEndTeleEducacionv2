import { BreakpointObserver } from '@angular/cdk/layout';
import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { modalsDialog } from 'src/app/shared/constants/modals-dialog';
import { responsiveSizes } from '../../../responsive-sizes/responsive-sizes';
import { ModalsDialogService } from '../../../services/modals-dialog/modals-dialog.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss'],
})
export class TemplateComponent implements OnInit, AfterViewInit, OnChanges {
  @ViewChild(MatDrawer) matdrawer!: MatDrawer;

  constructor(
    private observer: BreakpointObserver,
    private modalsDS: ModalsDialogService
  ) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {}

  ngAfterContentInit(): void {

  }

  ngAfterViewInit(): void {
    this.modalsDS.openModalDialog(modalsDialog.load);
    setTimeout(() => {
      this.modalsDS.closeLastOpenedModalDialog();
      this.observer.observe([responsiveSizes.wideTablet]).subscribe((res) => {
        if (res.matches) {
          if (this.matdrawer) {
            this.matdrawer.mode = 'over';
            this.matdrawer.close();
          }
        } else {
          if (this.matdrawer) {
            this.matdrawer.mode = 'side';
            this.matdrawer.open();
          }
        }
      });

      // here we have to implement the logic, create a listener for routes
      // and a listener for screen size
    }, 10);
  }

  click() {
    this.matdrawer.toggle();
  }
}
