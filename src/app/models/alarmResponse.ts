import { DocumentReference } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';

export interface AlarmResponse {
    id?: string;
    alarmRef: DocumentReference;
    date: firebase.firestore.Timestamp;
    status: number;
    userRef: DocumentReference;
}
