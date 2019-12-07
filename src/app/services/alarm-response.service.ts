import { AlarmResponse } from '../models/alarmResponse';
import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AlarmResponseService {

  // alarmResponsesCollection: AngularFirestoreCollection<AlarmResponse>;

  constructor(private afs: AngularFirestore) {
    // this.alarmResponsesCollection = this.afs.collection<AlarmResponse>('alarmReponses');
  }

  getAlarmResponses(userRef: string, alarmRef: string) {
    return this.afs.collection<AlarmResponse>('alarmResponses')
    // , r => {
    //   return r;
        // .where('alarmId', '==', '/alarms/' + alarmRef);
        // .where('userID', '==', '/users/' + userRef);
    // })
    .valueChanges({ idField: 'id' });
  }

  getAlarmResponseByRef(ref: string) {
    return this.afs.doc<AlarmResponse>('alarmResponses/' + ref).valueChanges();
  }

  setStatus(ref: string, newStatus: number) {
    return this.afs.doc<AlarmResponse>('alarmResponses/' + ref).update({status: newStatus});
  }

}
