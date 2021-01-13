import React from 'react';
import styled from 'styled-components';
import FlexRow from 'Components/Containers/FlexRow';
import TabLabel from 'Components/Buttons/TabLabel';
import Colors from 'Styles/Colors';
import FlexColumn from 'Components/Containers/FlexColumn';
import Borders from 'Styles/Borders';

type Props = {
	names: string[];
	children: React.ReactNode;
};

type State = {
	selectedIdx: number;
};

const TabLabelsContainer = styled(FlexRow)`
	border-bottom: ${Borders.Thick}px solid ${Colors.SuperDark};
	flex-grow: 0;
`;

class TabSelect extends React.Component<Props, State> {
	state = {
		selectedIdx: 0,
	};
	
	render() {
		return (
			<FlexColumn>
				<TabLabelsContainer>
					{this.props.names.map((n, i) => (
						<TabLabel
							key={i}
							isSelected={i === this.state.selectedIdx}
							text={n}
							onClick={() => this.setState({ selectedIdx: i })}
						/>
					))}
				</TabLabelsContainer>
				{Array.isArray(this.props.children) && this.props.children[this.state.selectedIdx]}
			</FlexColumn>
		);
	}
}

export default TabSelect;