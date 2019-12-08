import { AlarmService } from 'src/app/services/alarm.service';
import { AlarmResponseService } from './../../services/alarm-response.service';
import { AlarmResponse } from './../../models/alarmResponse';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Alarm } from 'src/app/models/alarm';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-alarm-response',
  templateUrl: './alarm-response.component.html',
  styleUrls: ['./alarm-response.component.css']
})
export class AlarmResponseComponent implements OnInit, OnDestroy {

  alarmResponse: AlarmResponse;
  alarm: Alarm;
  alarmResponseSubscription: Subscription;
  alarmSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private alarmResponseService: AlarmResponseService,
    private alarmService: AlarmService
  ) { }

  ngOnInit() {
    console.log('Initializing alarmResponse component');
    this.getAlarmResponse();
  }

  ngOnDestroy(): void {
    this.alarmResponseSubscription.unsubscribe();
    this.alarmSubscription.unsubscribe();
  }

  getAlarm() {
    console.log('alarm id: ' + this.alarmResponse.alarmId.id);
    this.alarmSubscription = this.alarmService.getAlarmById(this.alarmResponse.alarmId.id).subscribe(a => {
      console.log('alarm found: ' + a.title);
      this.alarm = a;
    });
  }

  getAlarmResponse() {
    const alarmResponseId: string = this.route.snapshot.paramMap.get('id');
    console.log('alarm response id: ' + alarmResponseId);
    this.alarmResponseSubscription = this.alarmResponseService.getAlarmResponseByRef(alarmResponseId).subscribe(r => {
      console.log('Alarm Response found: ' + r);
      this.alarmResponse = r;
      this.alarmResponse.id = alarmResponseId;
      this.setButtonColors(this.alarmResponse.status);
      this.getAlarm();
    });
  }

  /*
    Status can be either 0 = none, 1 = safe, 2 = need help or 3 = away
  */
  setStatus(statusButton: number) {
    let newStatus = statusButton;
    if (this.alarmResponse.status === statusButton) {
      newStatus = 0;
    }
    this.alarmResponseService.setStatus(this.alarmResponse.id, newStatus);
    this.setButtonColors(newStatus);
  }

  setButtonColors(status: number) {
    document.getElementById('safeButton').style.backgroundColor = '#ffffff';
    document.getElementById('unSafeButton').style.backgroundColor = '#ffffff';
    document.getElementById('atHomeButton').style.backgroundColor = '#ffffff';
    if (status === 1) {
      document.getElementById('safeButton').style.backgroundColor = '#008000';
    } else if (status === 2) {
      document.getElementById('unSafeButton').style.backgroundColor = '#FF0000';
    } else if (status === 3) {
      document.getElementById('atHomeButton').style.backgroundColor = '#0000FF';
    }
  }

}
