import { AlarmService } from './../../services/alarm.service';
import { Component, OnInit, Input } from '@angular/core';
import { Alarm } from 'src/app/models/alarm';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-alarm',
  templateUrl: './alarm.component.html',
  styleUrls: ['./alarm.component.css']
})
export class AlarmComponent implements OnInit {

  @Input()
  alarm: Alarm;

  constructor(
    // private route: ActivatedRoute,
    // private location: Location,
    private alarmService: AlarmService
  ) { }

  ngOnInit() {
    // this.getAlarm(this.route.snapshot.paramMap.get('id'));
  }

  // getAlarm(ref: string) {
  //   this.alarmService.getAlarmByRef(ref).subscribe(a => {
  //     this.alarm = a;
  //   });
  // }

  setStatus(status: number) {
    console.log('Setting alarm status to ' + status);
    this.alarm.status = status;
    this.alarmService.setStatus(this.alarm.id, status);
  }

  // goBack() {
  //   throw new Error('Method not implemented.');
  //   // this.location.ancestorOrigins
  // }

}
