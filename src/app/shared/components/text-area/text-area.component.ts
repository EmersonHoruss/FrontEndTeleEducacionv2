import { Component, OnInit, Input, Output, } from '@angular/core';
import { DefaultTextArea } from '../../constants/default-text-area';
import { TextAreaInterface } from '../../interfaces/text-area-interface';

@Component({
  selector: 'app-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.scss']
})


export class TextAreaComponent implements OnInit {
  @Input() text_area: TextAreaInterface = DefaultTextArea; 
  constructor() { 
    
  }

  ngOnInit(): void {
  }

}
