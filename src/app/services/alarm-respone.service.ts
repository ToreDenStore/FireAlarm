import { AlarmResponse } from './../models/alarmResponse';
import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AlarmResponeService {

  alarmResponsesCollection: AngularFirestoreCollection<AlarmResponse>;

  constructor(private afs: AngularFirestore) {
    this.alarmResponsesCollection = this.afs.collection<AlarmResponse>('alarmReponses');
  }

  getAlarmResponse(userRef: string, alarmRef: string) {
    return this.afs.collection<AlarmResponse>('alarmReponses', r => {
      return r
        .where('alarmId', '==', '/alarms/' + alarmRef)
        .where('userID', '==', '/users/' + userRef);
    }).valueChanges();
  }

  // getUserByRef(ref: string) {
  //   return this.afs.doc<User>('users/' + ref).valueChanges();
  // }

  // getUsersBySID(sid: string) {
  //   return this.afs.collection<User>('users', ref => {
  //     return ref.where('sid', '==', sid);
  //   }).valueChanges();
  // }

}
