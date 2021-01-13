import { formatAsTimeSpan, parseTimeSpanAsMs, TimeSpanUnit } from 'Utils/TimeUtils';

const msPerSecond = 1000;
const msPerMinute = 60 * msPerSecond;
const msPerHour = 60 * msPerMinute;
const msPerDay = 8 * msPerHour;
const msPerWeek = 5 * msPerDay;

describe('test TimeUtils', () => {
	describe('convert milliseconds to formatted time string', () => {
		it('zero', () => {
			expect(formatAsTimeSpan(0)).toBe('0m');
		});

		it('every component', () => {
			const ms = 1 * msPerWeek + 2 * msPerDay + 3 * msPerHour + 4 * msPerMinute + 5 * msPerSecond + 6;
			expect(formatAsTimeSpan(ms, TimeSpanUnit.Millisecond)).toBe('1w 2d 3h 4m 5s 6ms');
		});

		describe('rounding', () => {
			it('round up', () => {
				expect(formatAsTimeSpan(1.9 * msPerWeek, TimeSpanUnit.Week)).toBe('2w');
				expect(formatAsTimeSpan(1.5 * msPerWeek, TimeSpanUnit.Week)).toBe('2w');
				expect(formatAsTimeSpan(1.5 * msPerDay, TimeSpanUnit.Day)).toBe('2d');
				expect(formatAsTimeSpan(0.5 * msPerHour, TimeSpanUnit.Hour)).toBe('1h');
				expect(formatAsTimeSpan(0.5, TimeSpanUnit.Millisecond)).toBe('1ms');
			});

			it('round down', () => {
				expect(formatAsTimeSpan(2 * msPerWeek, TimeSpanUnit.Week)).toBe('2w');
				expect(formatAsTimeSpan(1.4999999 * msPerWeek, TimeSpanUnit.Week)).toBe('1w');
				expect(formatAsTimeSpan(1.4999999 * msPerDay, TimeSpanUnit.Day)).toBe('1d');
				expect(formatAsTimeSpan(0.4999999 * msPerHour, TimeSpanUnit.Hour)).toBe('0h');
				expect(formatAsTimeSpan(0.4999999, TimeSpanUnit.Millisecond)).toBe('0ms');
			});
		});

		describe('fails when', () => {
			// TODO
		});
	});

	describe('convert formatted string to milliseconds', () => {
		it('empty', () => {
			expect(parseTimeSpanAsMs('')).toBe(0);
		})

		describe('single component', () => {
			it('milliseconds', () => {
				expect(parseTimeSpanAsMs('0ms')).toBe(0);
				expect(parseTimeSpanAsMs('1ms')).toBe(1);
				expect(parseTimeSpanAsMs('12ms')).toBe(12);
				expect(parseTimeSpanAsMs('100ms')).toBe(100);
				expect(parseTimeSpanAsMs('10.123ms')).toBeCloseTo(10.123);
			})

			it('seconds', () => {
				expect(parseTimeSpanAsMs('0s')).toBe(0);
				expect(parseTimeSpanAsMs('1s')).toBe(msPerSecond);
				expect(parseTimeSpanAsMs('12s')).toBe(12 * msPerSecond);
				expect(parseTimeSpanAsMs('100s')).toBe(100 * msPerSecond);
				expect(parseTimeSpanAsMs('10.123s')).toBeCloseTo(10.123 * msPerSecond);
			})

			it('minutes', () => {
				expect(parseTimeSpanAsMs('0m')).toBe(0);
				expect(parseTimeSpanAsMs('1m')).toBe(msPerMinute);
				expect(parseTimeSpanAsMs('12m')).toBe(12 * msPerMinute);
				expect(parseTimeSpanAsMs('100m')).toBe(100 * msPerMinute);
				expect(parseTimeSpanAsMs('10.123m')).toBeCloseTo(10.123 * msPerMinute);
			})

			it('hours', () => {
				expect(parseTimeSpanAsMs('0h')).toBe(0);
				expect(parseTimeSpanAsMs('1h')).toBe(msPerHour);
				expect(parseTimeSpanAsMs('12h')).toBe(12 * msPerHour);
				expect(parseTimeSpanAsMs('100h')).toBe(100 * msPerHour);
				expect(parseTimeSpanAsMs('10.123h')).toBeCloseTo(10.123 * msPerHour);
			})

			it('days', () => {
				expect(parseTimeSpanAsMs('0d')).toBe(0);
				expect(parseTimeSpanAsMs('1d')).toBe(msPerDay);
				expect(parseTimeSpanAsMs('12d')).toBe(12 * msPerDay);
				expect(parseTimeSpanAsMs('100d')).toBe(100 * msPerDay);
				expect(parseTimeSpanAsMs('10.123d')).toBeCloseTo(10.123 * msPerDay);
			})

			it('weeks', () => {
				expect(parseTimeSpanAsMs('0w')).toBe(0);
				expect(parseTimeSpanAsMs('1w')).toBe(msPerWeek);
				expect(parseTimeSpanAsMs('12w')).toBe(12 * msPerWeek);
				expect(parseTimeSpanAsMs('100w')).toBe(100 * msPerWeek);
				expect(parseTimeSpanAsMs('10.123w')).toBeCloseTo(10.123 * msPerWeek);
			})
		});

		describe('multiple components', () => {
			it('multiple zeros', () => {
				expect(parseTimeSpanAsMs('0d 0m 0s')).toBe(0);
			})

			it('all zero', () => {
				expect(parseTimeSpanAsMs('0w 0d 0h 0m 0s 0ms')).toBe(0);
			})

			it('out of order', () => {
				expect(parseTimeSpanAsMs('4m 2d 6ms 1w 3h 5s')).toBe(
					1 * msPerWeek + 2 * msPerDay + 3 * msPerHour + 4 * msPerMinute + 5 * msPerSecond + 6,
				);
			});

			// TODO: test more cases
		});

		describe('fails when', () => {
			it('unrecognized unit', () => {
				// TODO
			});

			it('repeated unit', () => {
				// TODO
			});

			it('missing whitespace', () => {
				// TODO
			});
		});
	});
});