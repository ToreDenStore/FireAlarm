import { AlarmResponse } from './alarmResponse';
export interface User {
    id: string;
    sid: string;
    name: string;
    alarmResponses: AlarmResponse[];
}
