export type Schedule = {
    id: number;
    name: string;
    description: string;
    isRetired: boolean;
    tasksCount: number;
    startPoint: Date | string;
    endPoint: Date | string;
    dayOfWeek: number;
    dayOfMonth: number;
    startDate: Date | string;
    endDate: Date | string;
    intervalType: string;
    timePeriod: number;
}

export type ScheduleLog = {
    id: number;
    startTime: string;
    endTime: string;
    status: string;
    serverName: string;
    scheduleId: number;
}