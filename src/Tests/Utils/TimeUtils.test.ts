import { formatTime, parseTimeAsMs, TimeUnit } from 'Utils/TimeUtils';

const msPerSecond = 1000;
const msPerMinute = 60 * msPerSecond;
const msPerHour = 60 * msPerMinute;
const msPerDay = 8 * msPerHour;
const msPerWeek = 5 * msPerDay;

describe('test TimeUtils', () => {
	describe('convert milliseconds to formatted time string', () => {
		it('zero', () => {
			expect(formatTime(0)).toBe('0m');
		});

		it('every component', () => {
			const ms = 1 * msPerWeek + 2 * msPerDay + 3 * msPerHour + 4 * msPerMinute + 5 * msPerSecond + 6;
			expect(formatTime(ms, TimeUnit.Millisecond)).toBe('1w 2d 3h 4m 5s 6ms');
		});

		describe('rounding', () => {
			it('round up', () => {
				expect(formatTime(1.9 * msPerWeek, TimeUnit.Week)).toBe('2w');
				expect(formatTime(1.5 * msPerWeek, TimeUnit.Week)).toBe('2w');
				expect(formatTime(1.5 * msPerDay, TimeUnit.Day)).toBe('2d');
				expect(formatTime(0.5 * msPerHour, TimeUnit.Hour)).toBe('1h');
				expect(formatTime(0.5, TimeUnit.Millisecond)).toBe('1ms');
			});

			it('round down', () => {
				expect(formatTime(2 * msPerWeek, TimeUnit.Week)).toBe('2w');
				expect(formatTime(1.4999999 * msPerWeek, TimeUnit.Week)).toBe('1w');
				expect(formatTime(1.4999999 * msPerDay, TimeUnit.Day)).toBe('1d');
				expect(formatTime(0.4999999 * msPerHour, TimeUnit.Hour)).toBe('0h');
				expect(formatTime(0.4999999, TimeUnit.Millisecond)).toBe('0ms');
			});
		});

		describe('fails when', () => {
			// TODO
		});
	});

	describe('convert formatted string to milliseconds', () => {
		it('empty', () => {
			expect(parseTimeAsMs('')).toBe(0);
		})

		describe('single component', () => {
			it('milliseconds', () => {
				expect(parseTimeAsMs('0ms')).toBe(0);
				expect(parseTimeAsMs('1ms')).toBe(1);
				expect(parseTimeAsMs('12ms')).toBe(12);
				expect(parseTimeAsMs('100ms')).toBe(100);
				expect(parseTimeAsMs('10.123ms')).toBeCloseTo(10.123);
			})

			it('seconds', () => {
				expect(parseTimeAsMs('0s')).toBe(0);
				expect(parseTimeAsMs('1s')).toBe(msPerSecond);
				expect(parseTimeAsMs('12s')).toBe(12 * msPerSecond);
				expect(parseTimeAsMs('100s')).toBe(100 * msPerSecond);
				expect(parseTimeAsMs('10.123s')).toBeCloseTo(10.123 * msPerSecond);
			})

			it('minutes', () => {
				expect(parseTimeAsMs('0m')).toBe(0);
				expect(parseTimeAsMs('1m')).toBe(msPerMinute);
				expect(parseTimeAsMs('12m')).toBe(12 * msPerMinute);
				expect(parseTimeAsMs('100m')).toBe(100 * msPerMinute);
				expect(parseTimeAsMs('10.123m')).toBeCloseTo(10.123 * msPerMinute);
			})

			it('hours', () => {
				expect(parseTimeAsMs('0h')).toBe(0);
				expect(parseTimeAsMs('1h')).toBe(msPerHour);
				expect(parseTimeAsMs('12h')).toBe(12 * msPerHour);
				expect(parseTimeAsMs('100h')).toBe(100 * msPerHour);
				expect(parseTimeAsMs('10.123h')).toBeCloseTo(10.123 * msPerHour);
			})

			it('days', () => {
				expect(parseTimeAsMs('0d')).toBe(0);
				expect(parseTimeAsMs('1d')).toBe(msPerDay);
				expect(parseTimeAsMs('12d')).toBe(12 * msPerDay);
				expect(parseTimeAsMs('100d')).toBe(100 * msPerDay);
				expect(parseTimeAsMs('10.123d')).toBeCloseTo(10.123 * msPerDay);
			})

			it('weeks', () => {
				expect(parseTimeAsMs('0w')).toBe(0);
				expect(parseTimeAsMs('1w')).toBe(msPerWeek);
				expect(parseTimeAsMs('12w')).toBe(12 * msPerWeek);
				expect(parseTimeAsMs('100w')).toBe(100 * msPerWeek);
				expect(parseTimeAsMs('10.123w')).toBeCloseTo(10.123 * msPerWeek);
			})
		});

		describe('multiple components', () => {
			it('multiple zeros', () => {
				expect(parseTimeAsMs('0d 0m 0s')).toBe(0);
			})

			it('all zero', () => {
				expect(parseTimeAsMs('0w 0d 0h 0m 0s 0ms')).toBe(0);
			})

			it('out of order', () => {
				expect(parseTimeAsMs('4m 2d 6ms 1w 3h 5s')).toBe(
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