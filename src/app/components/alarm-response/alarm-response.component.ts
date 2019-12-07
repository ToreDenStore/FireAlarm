import { AlarmResponseService } from './../../services/alarm-response.service';
import { AlarmResponse } from './../../models/alarmResponse';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-alarm-response',
  templateUrl: './alarm-response.component.html',
  styleUrls: ['./alarm-response.component.css']
})
export class AlarmResponseComponent implements OnInit {

  alarmResponse: AlarmResponse;

  constructor(
    private route: ActivatedRoute,
    private alarmResponseService: AlarmResponseService
  ) { }

  ngOnInit() {
    this.getAlarmResponse();
  }

  getAlarmResponse() {
    const userId: string = this.route.snapshot.paramMap.get('userId');
    console.log('user id: ' + userId);
    const alarmId: string = this.route.snapshot.paramMap.get('alarmId');
    console.log('alarm id: ' + alarmId);
    this.alarmResponseService.getAlarmResponses(userId, alarmId).subscribe(r => {
      console.log(r);
      this.alarmResponse = r[0];
      if (r.length > 1) {
        console.log('ERROR! More than one alarm response was returned from query');
      }
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
