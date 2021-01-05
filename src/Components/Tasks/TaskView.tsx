import FlexRow from 'Components/Containers/FlexRow';
import TextLine from 'Components/Texts/TextLine';
import Task from 'Models/Task';
import React from 'react';
import styled from 'styled-components';
import Colors from 'Styles/Colors';
import Margins from 'Styles/Margins';

type Props = {
	task: Task;
	onSelect: (task: Task) => void;
};

const TaskViewContainer = styled(FlexRow)`
	background-color: ${Colors.Light};
	padding: ${Margins.Medium}px;
`;

const TaskView = (props: Props) => (
	<TaskViewContainer onClick={() => props.onSelect(props.task)}>
		<TextLine>{props.task.name}</TextLine>
	</TaskViewContainer>
);

export default TaskView;