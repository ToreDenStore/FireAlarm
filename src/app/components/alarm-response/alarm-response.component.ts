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
  teamResponses: AlarmResponse[];
  alarm: Alarm;
  alarmResponseSubscription: Subscription;
  alarmSubscription: Subscription;
  teamResponseSubscriptions: Subscription[];

  constructor(
    private route: ActivatedRoute,
    private alarmResponseService: AlarmResponseService,
    private alarmService: AlarmService,
    private userService: UserService
  ) { }

  ngOnInit() {
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
    this.teamResponseSubscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }

  getAlarmResponse() {
    console.log('alarm response id: ' + this.id);
    this.alarmResponseSubscription = this.alarmResponseService.getAlarmResponseById(this.id).subscribe(r => {
      console.log('Alarm Response found for user: ' + r.userRef.id);
      if (!this.alarmResponse || this.alarmResponse.alarmRef.id !== r.alarmRef.id) {
        this.getAlarm(r.alarmRef);
      }
      if (!this.alarmResponse || this.alarmResponse.userRef.id !== r.userRef.id || this.alarmResponse.alarmRef.id !== r.alarmRef.id) {
        this.getTeamResponses(r.alarmRef, r.userRef);
      }
      this.alarmResponse = r;
      this.alarmResponse.id = this.id;
    });
  }

  getAlarm(alarmRef: DocumentReference) {
    console.log('Looking for alarm id: ' + alarmRef.id);
    this.alarmSubscription = this.alarmService.getAlarmById(alarmRef.id).subscribe(a => {
      console.log('alarm found: ' + a.title);
      this.alarm = a;
    });
  }

  getTeamResponses(alarmRef: DocumentReference, userRef: DocumentReference) {
    console.log('Looking for team responses based on user: ' + userRef.id);
    this.userService.getTeam(userRef)
    .then(r => {
      const sub = r.subscribe(team2 => {
        const team: User[] = team2;
        sub.unsubscribe();
        console.log('User 1 of team: ' + team[0].id);
        console.log('Team size for responses: ' + team.length);
        this.teamResponses = [];
        this.teamResponseSubscriptions = [];
        team.forEach(teamMember => {
          this.teamResponseSubscriptions.push(
            this.alarmResponseService.getAlarmResponseByUserAndAlarm(teamMember.id, alarmRef.id).subscribe(response => {
              this.teamResponses.push(response[0]);
              console.log('Found team response; ' + response[0]);
            })
          );
        });
      });
    });
    // .finally(() => {
    //   console.log('Team size for responses: ' + team.length);
    //   this.teamResponses = [];
    //   this.teamResponseSubscriptions = [];
    //   team.forEach(teamMember => {
    //     this.teamResponseSubscriptions.push(
    //       this.alarmResponseService.getAlarmResponseByUserAndAlarm(teamMember.id, this.alarm.id).subscribe(response => {
    //         this.teamResponses.push(response[0]);
    //         console.log("Found team response; " + response[0]);
    //       })
    //     );
    //   });
    // });
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
