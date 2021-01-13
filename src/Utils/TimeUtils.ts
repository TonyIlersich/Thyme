import dayjs from 'dayjs';

export const MsPerMinute = 60 * 1000;
export const MsPerHour = MsPerMinute * 60;
export const MsPerDay = MsPerHour * 24;

export const getMsSinceDayStart = () => {
	const now = dayjs();
	return now.diff(now.startOf('day'));
};

export enum DayOfWeek {
	Sunday = 'Sunday',
	Monday = 'Monday',
	Tuesday = 'Tuesday',
	Wednesday = 'Wednesday',
	Thursday = 'Thursday',
	Friday = 'Friday',
	Saturday = 'Saturday',
};

export const DaysOfWeek = Object.values(DayOfWeek);

export const getDayOfWeek = () => {
	return DaysOfWeek[dayjs().day()];
};

export enum TimeSpanUnit {
	Millisecond = 'ms',
	Second = 's',
	Minute = 'm',
	Hour = 'h',
	Day = 'd',
	Week = 'w',
}

const TimeSpanUnits = Object.values(TimeSpanUnit);

// Note: This assumes 8h in a work day and 5d in a work week.
//       This will not match real-time days and weeks.
const ConversionFactors = {
	ms: 1,
	s: 1000,
	m: 1000 * 60,
	h: 1000 * 60 * 60,
	d: 1000 * 60 * 60 * 8,
	w: 1000 * 60 * 60 * 8 * 5,
};

// const convert = (t: number, fromUnit: TimeUnit, toUnit: TimeUnit) =>
// 	t * (ConversionFactors[fromUnit] / ConversionFactors[toUnit]);

type TimeSpanComponents = {
	[k in TimeSpanUnit]: number;
};

const timeZero: TimeSpanComponents = { ms: 0, s: 0, m: 0, h: 0, d: 0, w: 0 };

const msToComponents = (ms: number): TimeSpanComponents => {
	return {
		ms: Math.floor(ms % ConversionFactors.s / ConversionFactors.ms),
		s:  Math.floor(ms % ConversionFactors.m / ConversionFactors.s),
		m:  Math.floor(ms % ConversionFactors.h / ConversionFactors.m),
		h:  Math.floor(ms % ConversionFactors.d / ConversionFactors.h),
		d:  Math.floor(ms % ConversionFactors.w / ConversionFactors.d),
		w:  Math.floor(ms                       / ConversionFactors.w),
	};
};

const componentsToMs = (tc: TimeSpanComponents) => {
	return TimeSpanUnits.reduce((prev, u) => prev + tc[u] * ConversionFactors[u], 0);
};

export const formatAsTimeSpan = (ms: number, roundTo: TimeSpanUnit = TimeSpanUnit.Minute): string => {
	const roundedMs = Math.round(ms / ConversionFactors[roundTo]) * ConversionFactors[roundTo];
	const components = msToComponents(roundedMs);
	return TimeSpanUnits.filter(u => components[u]).map(u => `${components[u]}${u}`).reverse().join(' ') || `0${roundTo}`;
};

const parseTimeSpanAsComponents = (formatted: string): TimeSpanComponents => {
	const components = { ...timeZero };
	TimeSpanUnits.forEach(u => {
		const [comp] = formatted.match(new RegExp(`(\\d*.)?\\d+${u}\\b`, 'ig')) || [];
		if (comp) {
			const [value] = comp.match(/(\d*.)?\d+/g) || [];
			components[u] = Number.parseFloat(value);
		}
	});
	return components;
};

export const parseTimeSpanAsMs = (formatted: string): number => {
	return componentsToMs(parseTimeSpanAsComponents(formatted));
};

export const formatAsTimeOfDay = (ms: number) => {
	return `${Math.floor(ms / MsPerHour) % 24}:${(Math.floor(ms / MsPerMinute) % 60).toString().padStart(2, '0')}`;
};