import { Subscription } from 'rxjs';
import { AlarmResponseService } from './../../services/alarm-response.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit, OnDestroy {

  responseUrlSubscription: Subscription;
  responseJonatanUrls: string[];
  responsePavelUrls: string[];

  constructor(private alarmResponseService: AlarmResponseService) { }

  ngOnInit() {
    this.getResponses();
  }

  getResponses() {
    if (this.responseUrlSubscription) {
      this.responseUrlSubscription.unsubscribe();
    }
    this.responseUrlSubscription = this.alarmResponseService.getAlarmResponses().subscribe(
      r => {
        this.responseJonatanUrls = [];
        this.responsePavelUrls = [];
        r.forEach(response => {
          console.log('-Demo- Found responses: ' + response.userRef.id);
          if (response.userRef.id === '1GHCwk3YVa9JJxuH6Bd4') {
            this.responseJonatanUrls.push(response.id);
          } else if (response.userRef.id === 'eXTiHSbQGBZHituQ7l6D') {
            this.responsePavelUrls.push(response.id);
          }
        });
      }
    );
  }

  ngOnDestroy(): void {
    this.responseUrlSubscription.unsubscribe();
  }

}
