export interface Alarm {
    id: string;
    startDate: Date;
    endDate: Date;
    status: 1; // 0 = new, 1 = started, 2 = ended
    title: string;
    text: string;
}
