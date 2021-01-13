import styled from 'styled-components';
import Colors from 'Styles/Colors';
import { FontFamilies, FontSizes } from 'Styles/Fonts';

const Button = styled.button`
	border-radius: 0px;
	border: 0px;
	padding: 0px;
	flex-basis: 0px;
	flex-grow: 1;
	flex-shrink: 1;
	font-family: ${FontFamilies.Default};
	font-size: ${FontSizes.Default}px;
	font-weight: 600;
	color: ${Colors.TextDark};
	white-space: nowrap;
	text-overflow: ellipsis;
	background-color: ${Colors.Dark};
	transition: background-color .2s, color .05s;

	&:focus {
		outline: none;
	}

	&:hover {
		background-color: ${Colors.SuperLight};
		color: ${Colors.TextLight};
	}

	&:active {
		background-color: ${Colors.SuperDark};
		color: ${Colors.TextDark};
		transition: background-color .05s, color .05s;
	}
`;

export default Button;