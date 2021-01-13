import FlexRow from 'Components/Containers/FlexRow';
import TextLine from 'Components/Texts/TextLine';
import Task from 'Models/Task';
import React from 'react';
import styled from 'styled-components';
import Borders from 'Styles/Borders';
import Colors from 'Styles/Colors';
import Margins from 'Styles/Margins';

type Props = {
	task: Task;
	isSelected: boolean;
	isActive: boolean;
	onSelect: (task: Task) => void;
};

const TaskViewContainer = styled(FlexRow)<{ isSelected: boolean, isActive: boolean }>`
	background-color: ${Colors.Light};
	padding: ${props => props.isSelected ? (Margins.Medium - Borders.Medium) : Margins.Medium}px;
	border: ${props => props.isSelected ? Borders.Medium : 0}px solid ${Colors.SuperLight};
	text-decoration: ${props => props.isActive ? 'underline' : 'none'};
	text-decoration-color: ${Colors.TextDark};
	text-decoration-thickness: ${Borders.Medium}px;
`;

const TaskView = (props: Props) => (
	<TaskViewContainer
		isSelected={props.isSelected}
		isActive={props.isActive}
		onClick={() => props.onSelect(props.task)}
	>
		<TextLine>{props.task.name}</TextLine>
	</TaskViewContainer>
);

export default TaskView;