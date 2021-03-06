import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  usersCollection: AngularFirestoreCollection<User>;

  constructor(private afs: AngularFirestore) {
    this.usersCollection = this.afs.collection<User>('users', ref => {
      return ref.orderBy('name');
    });
  }

  getUsers() {
    return this.usersCollection.valueChanges({ idField: 'id' });
  }

  getUserById(id: string) {
    return this.afs.doc<User>('users/' + id).valueChanges();
  }

  getUsersBySID(sid: string) {
    return this.afs.collection<User>('users', ref => {
      return ref.where('sid', '==', sid);
    }).valueChanges();
  }

  getTeamByManagerSID(managerSID: string) {
    console.log('Service trying to find team with manager ' + managerSID);
    return this.afs.collection<User>('users', ref => {
      return ref.where('manager', '==', managerSID);
    }).valueChanges({ idField: 'id' });
  }

}
