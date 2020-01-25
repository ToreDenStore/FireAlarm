import { User } from './../../models/user';
import { UserService } from '../../services/user.service';
import { AlarmResponseService } from './../../services/alarm-response.service';
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

  constructor(
    private alarmService: AlarmService,
    private alarmResponseService: AlarmResponseService,
    private userService: UserService
  ) { }

  ngOnInit() {
  }

  setStatus(status: number) {
    console.log('Setting alarm status to ' + status);
    this.alarm.status = status;
    this.alarmService.setStatus(this.alarm.id, status);

    if (status === 1) {
      this.createResponseObjects();
    }
  }

  deleteAlarm() {
    this.alarmService.delete(this.alarm);
  }

  createResponseObjects() {
    let users: User[];
    const sub = this.userService.getUsers().subscribe(
      usersFound => {
        console.log('Alarm component creating response objects');
        users = usersFound;
        users.forEach(user => {
          this.alarmResponseService.createAlarmResponse(user.id, this.alarm.id);
        });
        sub.unsubscribe();
      }
    );
  }

}
