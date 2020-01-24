import { User } from './../../models/user';
import { UserService } from './../../user.service';
import { AlarmService } from 'src/app/services/alarm.service';
import { AlarmResponseService } from './../../services/alarm-response.service';
import { AlarmResponse } from './../../models/alarmResponse';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Alarm } from 'src/app/models/alarm';
import { Subscription } from 'rxjs';
import { DocumentReference } from '@angular/fire/firestore';

@Component({
  selector: 'app-alarm-response',
  templateUrl: './alarm-response.component.html',
  styleUrls: ['./alarm-response.component.css']
})
export class AlarmResponseComponent implements OnInit, OnDestroy {

  @Input()
  id: string;

  alarmResponse: AlarmResponse;
  user: User;
  alarm: Alarm;

  alarmResponseSubscription: Subscription;
  userSubscription: Subscription;
  alarmSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private alarmResponseService: AlarmResponseService,
    private alarmService: AlarmService,
    private userService: UserService
  ) { }

  ngOnInit() {
    // this.teamResponses = new Map();
    if (!this.id) {
      this.id = this.route.snapshot.paramMap.get('id');
    }
    console.log('Initializing alarmResponse component ' + this.id);
    this.getAlarmResponse();
  }

  ngOnDestroy(): void {
    console.log('Destroying alarmResponse component ' + this.id);
    this.alarmResponseSubscription.unsubscribe();
    this.alarmSubscription.unsubscribe();
    // this.teamResponseSubscriptions.forEach(sub => {
    //   sub.unsubscribe();
    // });
  }

  getAlarmResponse() {
    console.log('Looking for alarm response id: ' + this.id);
    this.alarmResponseSubscription = this.alarmResponseService.getAlarmResponseById(this.id).subscribe(r => {
      console.log('Alarm Response found for user: ' + r.userRef.id);
      if (!this.alarm || this.alarmResponse.alarmRef.id !== r.alarmRef.id) {
        this.getAlarm(r.alarmRef);
      }
      if (!this.user || this.alarmResponse.userRef.id !== r.userRef.id) {
        this.getUser(r.userRef);
      }
      this.alarmResponse = r;
      this.alarmResponse.id = this.id;
    });
  }

  getAlarm(alarmRef: DocumentReference) {
    console.log('Looking for alarm: ' + alarmRef.id);
    this.alarmSubscription = this.alarmService.getAlarmById(alarmRef.id).subscribe(a => {
      console.log('Alarm found: ' + a.text);
      this.alarm = a;
      this.alarm.id = alarmRef.id;
    });
  }

  getUser(userRef: DocumentReference) {
    console.log('Looking for user ' + userRef.id);
    this.userSubscription = this.userService.getUserById(userRef.id).subscribe(u => {
      console.log('User found: ' + u.name);
      this.user = u;
      this.user.id = userRef.id;
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
  }

}
