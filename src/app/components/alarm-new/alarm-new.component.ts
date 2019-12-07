import { AlarmService } from 'src/app/services/alarm.service';
import { Component, OnInit } from '@angular/core';
import { Alarm } from 'src/app/models/alarm';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-alarm-new',
  templateUrl: './alarm-new.component.html',
  styleUrls: ['./alarm-new.component.css']
})
export class AlarmNewComponent implements OnInit {

  newAlarm: Alarm;

  constructor(
    private alarmService: AlarmService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
  }

  createNewAlarm() {
    this.alarmService.createAlarm(this.newAlarm);
  }

}
