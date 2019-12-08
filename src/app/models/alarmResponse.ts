import { DocumentReference } from '@angular/fire/firestore';

export interface AlarmResponse {
    id?: string;
    alarmId: DocumentReference;
    date: firebase.firestore.Timestamp;
    status: number;
    userId: DocumentReference;
}
