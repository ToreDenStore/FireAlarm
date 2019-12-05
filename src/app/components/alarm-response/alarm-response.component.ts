import { AlarmResponse } from './../../models/alarmResponse';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-alarm-response',
  templateUrl: './alarm-response.component.html',
  styleUrls: ['./alarm-response.component.css']
})
export class AlarmResponseComponent implements OnInit {

  @Input()
  userRef: string;
  @Input()
  alarmRef: string;

  alarmResponse: AlarmResponse;

  constructor() { }

  ngOnInit() {
  }

}
