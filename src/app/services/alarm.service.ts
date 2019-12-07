import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { Alarm } from '../models/alarm';

@Injectable({
  providedIn: 'root'
})
export class AlarmService {

  alarmCollection: AngularFirestoreCollection<Alarm>;

  constructor(private afs: AngularFirestore) {
    this.alarmCollection = this.afs.collection<Alarm>('alarms');
  }

  getAlarms() {
    return this.alarmCollection.valueChanges({ idField: 'id' });
  }

  getAlarmById(id: string) {
    console.log('Service trying to get alarm by path ' + id);
    return this.alarmCollection.doc<Alarm>(id).valueChanges();
  }

  createAlarm(newAlarm: Alarm) {
    this.alarmCollection.add(newAlarm);
  }

  delete(alarm: Alarm) {
    this.alarmCollection.doc(alarm.id).delete();
  }

  setStatus(ref: string, newStatus: number) {
    return this.afs.doc<Alarm>('alarms/' + ref).update({status: newStatus});
  }
}
