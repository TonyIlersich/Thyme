import dayjs from 'dayjs';

export const MsPerDay = 24 * 60 * 60 * 1000;

export const getMsSinceDayStart = () => {
	const now = dayjs();
	return now.diff(now.startOf('day'));
};

export enum TimeUnit {
	Millisecond = 'ms',
	Second = 's',
	Minute = 'm',
	Hour = 'h',
	Day = 'd',
	Week = 'w',
}

const TimeUnits = Object.values(TimeUnit);

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

type TimeComponents = {
	[k in TimeUnit]: number;
};

const timeZero: TimeComponents = { ms: 0, s: 0, m: 0, h: 0, d: 0, w: 0 };

const msToComponents = (ms: number): TimeComponents => {
	return {
		ms: Math.floor(ms % ConversionFactors.s / ConversionFactors.ms),
		s:  Math.floor(ms % ConversionFactors.m / ConversionFactors.s),
		m:  Math.floor(ms % ConversionFactors.h / ConversionFactors.m),
		h:  Math.floor(ms % ConversionFactors.d / ConversionFactors.h),
		d:  Math.floor(ms % ConversionFactors.w / ConversionFactors.d),
		w:  Math.floor(ms                       / ConversionFactors.w),
	};
};

const componentsToMs = (tc: TimeComponents) => {
	return TimeUnits.reduce((prev, u) => prev + tc[u] * ConversionFactors[u], 0);
};

export const formatTime = (ms: number, roundTo: TimeUnit = TimeUnit.Minute): string => {
	const roundedMs = Math.round(ms / ConversionFactors[roundTo]) * ConversionFactors[roundTo];
	const components = msToComponents(roundedMs);
	return TimeUnits.filter(u => components[u]).map(u => `${components[u]}${u}`).reverse().join(' ') || `0${roundTo}`;
};

const parseTimeAsComponents = (formatted: string): TimeComponents => {
	const components = { ...timeZero };
	TimeUnits.forEach(u => {
		const [comp] = formatted.match(new RegExp(`(\\d*.)?\\d+${u}\\b`, 'ig')) || [];
		if (comp) {
			const [value] = comp.match(/(\d*.)?\d+/g) || [];
			components[u] = Number.parseFloat(value);
		}
	});
	return components;
};

export const parseTimeAsMs = (formatted: string): number => {
	return componentsToMs(parseTimeAsComponents(formatted));
};