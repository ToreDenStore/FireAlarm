import { AlarmResponse } from '../models/alarmResponse';
import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import Timestamp = firebase.firestore.Timestamp;

@Injectable({
  providedIn: 'root'
})
export class AlarmResponseService {

  alarmResponsesCollection: AngularFirestoreCollection<AlarmResponse>;
  // alarmResponseDocument: AngularFirestoreDocument<AlarmResponse>;

  constructor(private afs: AngularFirestore) {
    this.alarmResponsesCollection = this.afs.collection<AlarmResponse>('alarmResponses');
  }

  // getAlarmResponses(userRef: string, alarmRef: string) {
  //   return this.afs.collection<AlarmResponse>('alarmResponses')
  //   // , r => {
  //   //   return r;
  //       // .where('alarmId', '==', '/alarms/' + alarmRef);
  //       // .where('userID', '==', '/users/' + userRef);
  //   // })
  //   .valueChanges({ idField: 'id' });
  // }

  getAlarmResponses() {
    return this.alarmResponsesCollection.valueChanges(
      { idField: 'id' }
    );
  }

  // getAlarmResponsesByUser(userRef: string) {
  //   console.log('Looking for ' +  '/users/' + userRef);
  //   return this.afs.collection<AlarmResponse>('alarmResponses',
  //     ref => ref.where('userId', '==', '/users/' + userRef)
  //   ).valueChanges();
  // }

  getAlarmResponseByRef(ref: string) {
    // console.log('Service trying to find alarmResponses/' + ref);
    return this.alarmResponsesCollection.doc<AlarmResponse>(ref).valueChanges();
  }

  setStatus(ref: string, newStatus: number) {
    return this.alarmResponsesCollection.doc<AlarmResponse>(ref).update(
      {
        status: newStatus,
        date: Timestamp.fromDate(new Date())
      }
    );
  }

}
