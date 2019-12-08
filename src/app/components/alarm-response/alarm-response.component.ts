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
      this.getAlarm();
    });
  }

  /*
    Status can be either 0 = none, 1 = safe, 2 = need help or 3 = away
  */
  setStatus(status: number) {
    if (this.alarmResponse.status === status) {
      // Set to 0, remove current status
      this.alarmResponseService.setStatus(this.alarmResponse.id, 0);
    } else {
      this.alarmResponseService.setStatus(this.alarmResponse.id, status);
    }
  }

}
