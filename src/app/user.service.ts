import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { User } from './models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  usersCollection: AngularFirestoreCollection<User>;
  userDocument: AngularFirestoreDocument<User>;

  constructor(private afs: AngularFirestore) {
    this.usersCollection = this.afs.collection<User>('users', ref => {
      return ref.orderBy('name');
    });
  }

  getUsers() {
    return this.usersCollection.valueChanges({ idField: 'id' });
  }

  getUserById(ref: string) {
    return this.afs.doc<User>('users/' + ref).valueChanges();
  }

  getUsersBySID(sid: string) {
    return this.afs.collection<User>('users', ref => {
      return ref.where('sid', '==', sid);
    }).valueChanges();
  }

  async getTeam(userRef: firebase.firestore.DocumentReference) {
    const r = await userRef.get();
    const managerSID = await r.get('manager');
    console.log('User service found manager ' + managerSID + ' for user ' + r.id);
    return this.getTeamByManagerSID(managerSID);
  }

  getTeamByManagerSID(managerSID: string) {
    return this.afs.collection<User>('users', ref => {
      return ref.where('manager', '==', managerSID);
    }).valueChanges({ idField: 'id' });
  }

}
