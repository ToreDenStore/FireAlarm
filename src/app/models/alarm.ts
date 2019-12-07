export interface Alarm {
    id?: string;
    startDate?: Date;
    endDate?: Date;
    status: number; // 0 = new, 1 = started, 2 = ended
    title: string;
    text: string;
}
