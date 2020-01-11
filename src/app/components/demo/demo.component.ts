import { Subscription } from 'rxjs';
import { AlarmResponseService } from './../../services/alarm-response.service';
import { Component, OnInit } from '@angular/core';
import { AlarmResponse } from 'src/app/models/alarmResponse';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit {

  responseJonatanUrls: string[];
  responseJonatanUrlSubscription: Subscription;

  constructor(private alarmResponseService: AlarmResponseService) { }

  ngOnInit() {
    //TODO: find all responses given by user id:s for Jonatan and Pavel
    this.getResponses();
  }

  getResponses() {
    this.responseJonatanUrlSubscription = this.alarmResponseService.getAlarmResponses().subscribe(
      r => {
        this.responseJonatanUrls = [];
        r.forEach(response => {
          console.log('Found responses: ' + response.userId.id);
          if (response.userId.id === '1GHCwk3YVa9JJxuH6Bd4') {
            this.responseJonatanUrls.push(response.id);
          }
        });
      }
    );
  }

}
