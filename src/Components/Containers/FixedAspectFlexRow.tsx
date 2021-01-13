import React from 'react';
import styled from 'styled-components';
import FlexRow from 'Components/Containers/FlexRow';

type Props = {
	className?: string;
	children: React.ReactNode;
	aspect: number;
};

const Outer = styled(FlexRow)<{ ratio: number }>`
	width: 100%;
	height: 0;
	padding-bottom: ${props => 100 / props.ratio}%;
	position: relative;
	flex-grow: 0;
`;

const Inner = styled(FlexRow)`
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
`;

const FixedAspectFlexRow = (props: Props) => (
	<Outer className={props.className} ratio={props.aspect}>
		<Inner>
			{props.children}
		</Inner>
	</Outer>
);

export default FixedAspectFlexRow;