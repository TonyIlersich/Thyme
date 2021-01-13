import { DayOfWeek } from 'Utils/TimeUtils';

export type TimeSlot = {
	name: string;
	start: number;
	end: number;
};

type Schedule = {
	[k in DayOfWeek]: TimeSlot[];
};

export default Schedule;