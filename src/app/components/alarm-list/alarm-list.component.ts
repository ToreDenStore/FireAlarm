import { Component, OnInit } from '@angular/core';
import { AlarmService } from 'src/app/services/alarm.service';
import { Alarm } from 'src/app/models/alarm';

@Component({
  selector: 'app-alarm-list',
  templateUrl: './alarm-list.component.html',
  styleUrls: ['./alarm-list.component.css']
})
export class AlarmListComponent implements OnInit {

  alarms: Alarm[] = [];
  activeAlarms: Alarm[] = [];
  scheduledAlarms: Alarm[] = [];
  oldAlarms: Alarm[] = [];
  alarmsSearching: boolean;

  constructor(private alarmService: AlarmService) { }

  ngOnInit() {
    this.getAlarms();
  }

  getAlarms() {
    this.alarmsSearching = true;
    this.alarmService.getAlarms().subscribe(alarms => {
      console.log('Found: ' + alarms);
      this.alarms = alarms;
      this.activeAlarms = alarms;
      this.alarmsSearching = false;
    });
  }

  deleteAlarm(alarm: Alarm) {
    this.alarmService.delete(alarm);
  }

  // updateActiveAlarms() {
  //   this.activeAlarms = this.alarms.filter(a => {
  //     return (a.status === 2) && (a.startDate.valueOf() > Date.now());
  //   });
  // }

}
