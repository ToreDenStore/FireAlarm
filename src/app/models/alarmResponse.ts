import { DocumentReference } from '@angular/fire/firestore';

export interface AlarmResponse {
    id?: string;
    alarmId: DocumentReference;
    date: Date;
    status: number;
    userId: DocumentReference;
}
