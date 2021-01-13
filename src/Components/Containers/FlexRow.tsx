import styled from 'styled-components';

type Props = {
	ratio?: number;
};

const FlexRow = styled.div<Props>`
	display: flex;
	flex-direction: row;
	flex-basis: 0px;
	flex-grow: ${props => props.ratio === undefined ? 1 : props.ratio};
	flex-shrink: ${props => props.ratio === undefined ? 1 : props.ratio};
	box-sizing: border-box;
	flex-wrap: nowrap;
`;

export default FlexRow;