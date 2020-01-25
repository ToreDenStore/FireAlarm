import { DocumentReference } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import Timestamp = firebase.firestore.Timestamp;

export interface AlarmResponse {
    id?: string;
    alarmRef: DocumentReference;
    date: Timestamp;
    status: number;
    userRef: DocumentReference;
}
