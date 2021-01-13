import styled from 'styled-components';
import Colors from 'Styles/Colors';
import { FontFamilies, FontSizes } from 'Styles/Fonts';

type Props = {
	center?: boolean;
	right?: boolean;
};

const TextLine = styled.span<Props>`
	flex-basis: 0px;
	flex-grow: 1;
	flex-shrink: 1;
	font-family: ${FontFamilies.Default};
	font-size: ${FontSizes.Default}px;
	font-weight: 600;
	color: ${Colors.TextDark};
	white-space: nowrap;
	text-overflow: ellipsis;
	text-align: ${props => props.center ? 'center' : (props.right ? 'right' : 'unset')};
`;

export default TextLine;