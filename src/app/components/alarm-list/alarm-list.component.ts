import { AlarmNewComponent } from './../alarm-new/alarm-new.component';
import { Component, OnInit } from '@angular/core';
import { AlarmService } from 'src/app/services/alarm.service';
import { Alarm } from 'src/app/models/alarm';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

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
  modalRef: NgbModalRef<typeof AlarmNewComponent>;

  constructor(
    private alarmService: AlarmService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.getAlarms();
  }

  getAlarms() {
    this.alarmsSearching = true;
    this.alarmService.getAlarms().subscribe(alarms => {
      console.log('Found: ' + alarms);
      this.activeAlarms = [];
      this.scheduledAlarms = [];
      this.oldAlarms = [];
      alarms.forEach(alarm => {
        if (alarm.status === 2) {
          this.oldAlarms.push(alarm);
        } else if (alarm.status === 1) {
          this.activeAlarms.push(alarm);
        } else if (alarm.status === 0) {
          this.scheduledAlarms.push(alarm);
        }
      });
      this.alarms = alarms;
      this.alarmsSearching = false;
    });
  }

  deleteAlarm(alarm: Alarm) {
    this.alarmService.delete(alarm);
  }

  openCreateModal() {
    this.modalRef = this.modalService.open(AlarmNewComponent);
  }

}
