import { AlarmResponseService } from './../../services/alarm-response.service';
import { UserService } from '../../services/user.service';
import { Component, OnInit, Input, OnDestroy, SimpleChanges, OnChanges } from '@angular/core';
import { User } from 'src/app/models/user';
import { Subscription } from 'rxjs';
import { AlarmResponse } from 'src/app/models/alarmResponse';
import { IfStmt } from '@angular/compiler';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit, OnDestroy, OnChanges {

  @Input()
  managerSID: string;
  @Input()
  alarmId: string;

  team: User[];
  teamSubscription: Subscription;
  teamResponses: Map<User, AlarmResponse>;
  teamResponseSubscriptions: Subscription[];

  constructor(
    private alarmResponseService: AlarmResponseService,
    private userService: UserService
  ) { }

  ngOnInit() {
    console.log('Initializing team component with manager ' + this.managerSID + ' and alarm ' + this.alarmId);
  }

  ngOnChanges() {
    console.log('Changes detected on team component with manager ' + this.managerSID + ' and alarm ' + this.alarmId);
    this.teamResponses = new Map();
    this.getTeam();
  }

  ngOnDestroy(): void {
    this.teamSubscription.unsubscribe();
    this.teamResponseSubscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }

  getTeam() {
    this.team = [];
    console.log('Looking for team with manager ' + this.managerSID);
    if (this.teamSubscription) {
      this.teamSubscription.unsubscribe();
    }
    this.teamSubscription = this.userService.getTeamByManagerSID(this.managerSID).subscribe(team => {
      console.log('Hello again!');
      console.log('Found team of size ' + team.length + ' with manager ' + this.managerSID);
      this.team = team;
      this.getTeamResponses();
    });
  }

  getTeamResponses() {
    console.log('Creating team response subscriptions');
    this.teamResponses.clear(); // Should not be needed, is a workaround due to a bug
    if (this.teamResponseSubscriptions) {
      this.teamResponseSubscriptions.forEach(sub => {
        sub.unsubscribe();
      });
    }
    this.teamResponseSubscriptions = [];
    this.team.forEach(teamMember => {
      this.teamResponseSubscriptions.push(
        this.alarmResponseService.getAlarmResponseByUserAndAlarm(teamMember.id, this.alarmId).subscribe(responses => {
          const response = responses[0];
          console.log('Found team member response; ' + response.id);
          this.teamResponses.set(teamMember, response);
        })
      );
    });
  }

}
