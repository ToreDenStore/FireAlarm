import { AlarmService } from 'src/app/services/alarm.service';
import { Component, OnInit } from '@angular/core';
import { Alarm } from 'src/app/models/alarm';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-alarm-new',
  templateUrl: './alarm-new.component.html',
  styleUrls: ['./alarm-new.component.css']
})
export class AlarmNewComponent implements OnInit {

  newAlarm: Alarm;

  constructor(
    private alarmService: AlarmService,
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit() {
    this.newAlarm = {
      status: 0,
      title: '',
      text: ''
    };
  }

  createNewAlarm() {
    this.alarmService.createAlarm(this.newAlarm);
    this.activeModal.close();
  }

}
