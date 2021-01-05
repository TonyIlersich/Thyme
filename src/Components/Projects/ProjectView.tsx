import FlexColumn from 'Components/Containers/FlexColumn';
import CreateTaskForm from 'Components/Tasks/CreateTaskForm';
import TaskView from 'Components/Tasks/TaskView';
import TextLine from 'Components/Texts/TextLine';
import Project from 'Models/Project';
import Task from 'Models/Task';
import React from 'react';
import styled from 'styled-components';
import Colors from 'Styles/Colors';
import Margins from 'Styles/Margins';

type Props = {
	className?: string;
	project: Project;
	onValidateTask: (project: Project, task: Task) => string | undefined;
	onCreateTask: (project: Project, task: Task) => void;
	onSelect: (project: Project, task: Task) => void;
};

const ProjectViewContainer = styled(FlexColumn)`
	flex-grow: 0;
	background-color: ${Colors.Dark};
	padding: ${Margins.Medium}px;
`;

const ProjectTitle = styled(TextLine)`
	color: ${Colors.TextLight};
	margin-bottom: ${Margins.Medium}px;
`;

const ProjectView = (props: Props) => (
	<ProjectViewContainer className={props.className}>
		<ProjectTitle>{props.project.name}</ProjectTitle>
		{props.project.tasks.map((t, i) => (
			<TaskView key={i} task={t} onSelect={task => props.onSelect(props.project, task)} />
		))}
		<CreateTaskForm
			onValidate={task => props.onValidateTask(props.project, task)}
			onSubmit={task => props.onCreateTask(props.project, task)}
		/>
	</ProjectViewContainer>
);

export default ProjectView;