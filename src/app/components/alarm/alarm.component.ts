import { AlarmService } from './../../services/alarm.service';
import { Component, OnInit, Input } from '@angular/core';
import { Alarm } from 'src/app/models/alarm';

@Component({
  selector: 'app-alarm',
  templateUrl: './alarm.component.html',
  styleUrls: ['./alarm.component.css']
})
export class AlarmComponent implements OnInit {

  @Input()
  alarm: Alarm;

  constructor(private alarmService: AlarmService) { }

  ngOnInit() {
  }

}
