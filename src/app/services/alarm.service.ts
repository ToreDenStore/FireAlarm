import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Alarm } from '../model/alarm';

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

  // usersCollection: AngularFirestoreCollection<User>;
  // // users: Observable<User[]>; // Data is decoupled from the reference of the data
  // userDocument: AngularFirestoreDocument<User>;
  // // user: Observable<User>;

  // constructor(private afs: AngularFirestore) {
  //   this.usersCollection = this.afs.collection<User>('users', ref => {
  //     return ref.orderBy('name');
  //   });
  // }

  // getUsers() {
  //   return this.usersCollection.valueChanges({ idField: 'id' });
  // }

  // getUserByRef(ref: string) {
  //   return this.afs.doc<User>('users/' + ref).valueChanges();
  // }

  // getUsersBySID(sid: string) {
  //   return this.afs.collection<User>('users', ref => {
  //     return ref.where('sid', '==', sid);
  //   }).valueChanges();
  // }
}
