import { User } from './../../models/user';
import { UserService } from './../../user.service';
import { AlarmService } from 'src/app/services/alarm.service';
import { AlarmResponseService } from './../../services/alarm-response.service';
import { AlarmResponse } from './../../models/alarmResponse';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Alarm } from 'src/app/models/alarm';
import { Subscription } from 'rxjs';

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
    console.log('Initializing alarmResponse component');
    this.getAlarmResponse();
  }

  ngOnDestroy(): void {
    this.alarmResponseSubscription.unsubscribe();
    this.alarmSubscription.unsubscribe();
  }

  getAlarm() {
    console.log('Looking for alarm id: ' + this.alarmResponse.alarmRef.id);
    this.alarmSubscription = this.alarmService.getAlarmById(this.alarmResponse.alarmRef.id).subscribe(a => {
      console.log('alarm found: ' + a.title);
      this.alarm = a;
    });
  }

  getAlarmResponse() {
    let alarmResponseId = '';
    if (this.id) {
      // For demo view only
      alarmResponseId = this.id;
    } else {
      alarmResponseId = this.route.snapshot.paramMap.get('id');
      this.id = alarmResponseId;
    }
    console.log('alarm response id: ' + alarmResponseId);
    this.alarmResponseSubscription = this.alarmResponseService.getAlarmResponseById(alarmResponseId).subscribe(r => {
      console.log('Alarm Response found for user: ' + r.userRef.id);
      this.alarmResponse = r;
      this.alarmResponse.id = alarmResponseId;
      this.getAlarm();
      this.getTeamResponses();
    });
  }

  getTeamResponses() {
    console.log('Looking for team responses based on user: ' + this.alarmResponse.userRef.id);
    let team: User[] = [];
    this.userService.getTeam(this.alarmResponse.userRef)
    .then(r => {
      const sub = r.subscribe(team2 => {
        team = team2;
        sub.unsubscribe();
        console.log('Team found, team size: ' + team2.length);
        console.log('User 1 of team: ' + team2[0].id);

        console.log('Team size for responses: ' + team.length);
        this.teamResponses = [];
        this.teamResponseSubscriptions = [];
        team.forEach(teamMember => {
          this.teamResponseSubscriptions.push(
            this.alarmResponseService.getAlarmResponseByUserAndAlarm(teamMember.id, this.alarm.id).subscribe(response => {
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
