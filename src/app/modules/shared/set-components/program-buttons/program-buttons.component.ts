import {
  Component,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-program-buttons',
  templateUrl: './program-buttons.component.html',
  styleUrls: ['./program-buttons.component.scss'],
})
export class ProgramButtonsComponent implements OnInit, OnChanges {
  @Input() codigoCoordinador: number | null | undefined;
  @Input() registrarUrl: string;
  @Input() switchedProgramaSelect: boolean;
  @Output() clickedRegisterBtnEE = new EventEmitter();
  @Output() foundCoordinador = new EventEmitter();
  // @Output() coordinador =

  nombreCoordinador: any;
  coordinador: any;

  constructor(private http: HttpClient) {
    this.nombreCoordinador = null;
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    const switchedProgramaSelect = changes['switchedProgramaSelect'];

    if (switchedProgramaSelect) {
      const switchedProgramaSelectFC =
        changes['switchedProgramaSelect'].firstChange;
      if (!switchedProgramaSelectFC) {
        this.nombreCoordinador = 'Buscando coordinador...';
        this.http.get(`/api/Docentes/${this.codigoCoordinador}`).subscribe(
          (e: any) => {
            this.nombreCoordinador =
              e.data.Nombre +
              ' ' +
              e.data.ApellidoPaterno +
              ' ' +
              e.data.ApellidoMaterno;
            this.coordinador = e.data;
            this.foundCoordinador.emit(this.coordinador);
          },
          (error) => {
            this.nombreCoordinador = 'Sin coordinador';
            this.coordinador = null;
            this.foundCoordinador.emit(null);
          }
        );
      }
    }
  }

  clickedRegisterBtn() {
    // console.log(this.registrarUrl);
    this.clickedRegisterBtnEE.emit(this.coordinador);
  }

  saveInLS() {}
}
