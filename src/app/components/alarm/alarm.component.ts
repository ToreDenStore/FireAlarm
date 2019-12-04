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

  setStatus(status: number) {
    console.log('Setting alarm status to ' + status);
    this.alarm.status = status;
    this.alarmService.setStatus(this.alarm.id, status);
  }

}
