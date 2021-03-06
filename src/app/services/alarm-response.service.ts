import { User } from './../models/user';
import { AlarmResponse } from './../models/alarmResponse';
import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import Timestamp = firebase.firestore.Timestamp;
import { Alarm } from '../models/alarm';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AlarmResponseService {
  alarmResponsesCollection: AngularFirestoreCollection<AlarmResponse>;

  constructor(private afs: AngularFirestore, private userService: UserService) {
    this.alarmResponsesCollection = this.afs.collection<AlarmResponse>('alarmResponses');
  }

  createAlarmResponse(userId: string, alarmId: string) {
    const newAlarmResponse: AlarmResponse = {
      userRef: this.afs.collection<User>('users').doc<User>(userId).ref,
      alarmRef: this.afs.collection<Alarm>('alarms').doc<Alarm>(alarmId).ref,
      status: 0,
      date: firebase.firestore.Timestamp.fromDate(new Date())
    };
    this.alarmResponsesCollection.add(newAlarmResponse);
  }

  getAlarmResponses() {
    return this.alarmResponsesCollection.valueChanges(
      { idField: 'id' }
    );
  }

  getAlarmResponseByAlarm(alarmId: string) {
    return this.afs.collection<AlarmResponse>('alarmResponses', ref => {
      return ref.where('alarmRef', '==', this.afs.collection<Alarm>('alarms').doc<Alarm>(alarmId).ref);
    }).valueChanges({ idField: 'id' });
  }

  deleteResponse(alarmResponseId: string) {
    this.alarmResponsesCollection.doc(alarmResponseId).delete();
  }

  getAlarmResponseById(ref: string) {
    return this.alarmResponsesCollection.doc<AlarmResponse>(ref).valueChanges();
  }

  getAlarmResponseByUserAndAlarm(userId: string, alarmId: string) {
    console.log('Service trying to get alarm response from user ' + userId + ' and alarm ' + alarmId);
    return this.afs.collection<AlarmResponse>('alarmResponses', ref => {
      return ref
        .where('userRef', '==', this.afs.collection<User>('users').doc<User>(userId).ref)
        .where('alarmRef', '==', this.afs.collection<Alarm>('alarms').doc<Alarm>(alarmId).ref);
    }).valueChanges({ idField: 'id' });
  }

  setStatus(responseId: string, newStatus: number) {
    return this.alarmResponsesCollection.doc<AlarmResponse>(responseId).update(
      {
        status: newStatus,
        date: Timestamp.fromDate(new Date())
      }
    );
  }

}
