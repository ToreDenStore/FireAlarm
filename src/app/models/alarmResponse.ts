import { DocumentReference } from '@angular/fire/firestore';

export interface AlarmResponse {
    id?: string;
    alarmRef: DocumentReference;
    date: firebase.firestore.Timestamp;
    status: number;
    userRef: DocumentReference;
}
