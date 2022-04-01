import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
export interface TableElements {
  Profesor: string;
  Correo: string;
  Celular: string;
  HoraInicio: string;
  HoraFin: string;
  Acciones: string;
}

const ELEMENT_DATA: TableElements[] = [
  {
    Profesor: "Juan Perez",
    Correo: "correo@gmail.com",
    Celular: "123456789",
    HoraInicio: "10:00",
    HoraFin: "11:00",
    Acciones: "Acciones"
  }
]

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  public itemForm: FormGroup;
  displayedColumns: any[] = ['Profesor', 'Correo', 'Celular', 'HoraInicio','HoraFin','Acciones'];

  public dataSource:TableElements[] = ELEMENT_DATA;


  constructor(
    private fb: FormBuilder,

  ) {

    this.itemForm = fb.group({
      Desde: fb.control('', Validators.required),
      Hasta: fb.control('', Validators.required),
    });


    this.buildFormBD();


  }

  buildFormBD() {
    this.itemForm = this.fb.group({
      Desde: ['', Validators.required],
      Hasta: ['', Validators.required],


    })

  }

  ngOnInit(): void {
  }

  registrar() {
    console.log('Registrar')
  }
  listar() {
    console.log('listar')
  }

  submit() {



    let desdeToString = this.itemForm.value.Desde.toString();
    this.itemForm.controls["Desde"].setValue(
      moment(desdeToString).add(1, 'days').format("YYYY-MM-DD")
    );

    let hastaToString = this.itemForm.value.Desde.toString();
    this.itemForm.controls["Hasta"].setValue(
      moment(hastaToString).add(1, 'days').format("YYYY-MM-DD")
    );


    console.log(this.itemForm.value)

    this.itemForm.reset();

    this.itemForm.controls["Desde"].setValue(
      moment(new Date()).add(1, 'days').format("YYYY-MM-DD")
    );

    this.itemForm.controls["Hasta"].setValue(
null    );

  }

}
