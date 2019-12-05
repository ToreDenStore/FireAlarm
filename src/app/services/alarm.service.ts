import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
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

  setStatus(ref: string, newStatus: number) {
    return this.afs.doc<Alarm>('alarms/' + ref).update({status: newStatus});
  }
}
