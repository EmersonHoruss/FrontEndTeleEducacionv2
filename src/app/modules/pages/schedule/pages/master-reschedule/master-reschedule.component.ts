import { Component, OnInit } from '@angular/core';
import { Constants } from './master-reschedule.constants';

@Component({
  selector: 'app-master-reschedule',
  templateUrl: './master-reschedule.component.html',
  styleUrls: ['./master-reschedule.component.scss'],
})
export class MasterRescheduleComponent implements OnInit {
  constants = Constants
  
  constructor() {}

  ngOnInit(): void {}

  reschedule() {}

  cancel() {}
}
