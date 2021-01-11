import FlexRow from 'Components/Containers/FlexRow';
import TextLine from 'Components/Texts/TextLine';
import styled from 'styled-components';
import Colors from 'Styles/Colors';
import Margins from 'Styles/Margins';

type Props = {
	isSelected: boolean;
	text: string;
	onClick: () => void;
};

const TabLabelContainer = styled(FlexRow)<{ isSelected: boolean }>`
	padding: ${Margins.Medium}px ${Margins.Large}px;
	background-color: ${props => props.isSelected ? Colors.SuperDark : Colors.Light};
	flex-grow: 0;
	cursor: pointer;
	transition: background-color .2s;
`;

const TabLabelText = styled(TextLine)<{ isSelected: boolean }>`
	font-weight: 900;
	color: ${props => props.isSelected ? Colors.TextLight : Colors.TextDark};
	pointer-events: none;
	user-select: none;
`;

const TabLabel = (props: Props) => (
	<TabLabelContainer isSelected={props.isSelected} onClick={props.onClick}>
		<TabLabelText isSelected={props.isSelected}>{props.text}</TabLabelText>
	</TabLabelContainer>
);

export default TabLabel;