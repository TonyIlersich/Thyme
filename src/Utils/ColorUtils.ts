// all components are [0,1]
type RGBColor = {
	r: number;
	g: number;
	b: number;
};

// all components are [0,1]
type HSVColor = {
	h: number;
	s: number;
	v: number;
}

const hex2rgb = (hex: string): RGBColor => {
	if (hex.search(/#\w\w\w\w\w\w/)) {
		throw new Error(`cannot parse color: ${hex}`);
	}
	return {
		r: parseInt(hex.slice(1, 3), 16) / 255,
		g: parseInt(hex.slice(3, 5), 16) / 255,
		b: parseInt(hex.slice(5, 7), 16) / 255,
	};
};

const rgb2hex = ({ r, g, b }: RGBColor): string => `#${[r, g, b].reduce(
	(str, value) => `${str}${Math.floor(value * 0xff).toString(16).padStart(2, '0')}`, ''
)}`;

const clamp01 = (x: number): number => Math.min(1, Math.max(0, x));

const mod1 = (x: number): number => (x % 1 + 1) % 1;

const hsv2rgb = ({ h, s, v }: HSVColor) => ({
	r: (clamp01(Math.abs(mod1(h) * 6 - 3) - 1) * s + (1 - s)) * v,
	g: (clamp01(-Math.abs(mod1(h) * 6 - 2) + 2) * s + (1 - s)) * v,
	b: (clamp01(-Math.abs(mod1(h) * 6 - 4) + 2) * s + (1 - s)) * v,
});

const hsv2hex = (hsv: HSVColor) => rgb2hex(hsv2rgb(hsv));

const getRandomHex = ({ s, v }: Pick<HSVColor, 's' | 'v'>) => {
	return hsv2hex({ h: Math.random(), s, v });
};

export const getNewProjectColor = () => getRandomHex({ s: .4, v: .9 });
