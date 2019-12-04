import { AlarmService } from './../../services/alarm.service';
import { Component, OnInit } from '@angular/core';
import { Alarm } from 'src/app/model/alarm';

@Component({
  selector: 'app-alarm',
  templateUrl: './alarm.component.html',
  styleUrls: ['./alarm.component.css']
})
export class AlarmComponent implements OnInit {

  alarms: Alarm[];
  alarmsSearching: boolean;

  constructor(private alarmService: AlarmService) { }

  ngOnInit() {
    this.getAlarms();
  }

  getAlarms() {
    this.alarmsSearching = true;
    this.alarmService.getAlarms().subscribe(alarms => {
      console.log(alarms);
      this.alarms = alarms;
      this.alarmsSearching = false;
    });
  }

}
