import styled from 'styled-components';
import Colors from 'Styles/Colors';
import { FontFamilies, FontSizes } from 'Styles/Fonts';

const TextLine = styled.span`
	font-family: ${FontFamilies.Default};
	font-size: ${FontSizes.Default}px;
	font-weight: 600;
	color: ${Colors.TextDark};
	flex-basis: 0px;
	flex-grow: 1;
	flex-shrink: 1;
	white-space: nowrap;
	text-overflow: ellipsis;
`;

export default TextLine;