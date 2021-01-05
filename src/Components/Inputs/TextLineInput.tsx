import styled from 'styled-components';
import Borders from 'Styles/Borders';
import Colors from 'Styles/Colors';
import { FontFamilies, FontSizes } from 'Styles/Fonts';

const TextLineInput = styled.input`
	font-family: ${FontFamilies.Default};
	font-size: ${FontSizes.Default}px;
	font-weight: 600;
	color: ${Colors.TextDark};
	caret-color: ${Colors.TextDark};
	min-width: 0px;
	flex-basis: 0px;
	flex-grow: 1;
	flex-shrink: 1;
	background-color: transparent;
	border: none;
	border-bottom: ${Borders.Thin}px solid ${Colors.SuperDark};
	padding: 0px;

	&::placeholder {
		color: ${Colors.TextPlaceholder};
		flex-basis: 0px;
	}

	&:focus {
		outline: none;
	}
`;

export default TextLineInput;