import Button from 'Components/Buttons/Button';
import FlexColumn from 'Components/Containers/FlexColumn';
import FlexRow from 'Components/Containers/FlexRow';
import TextLineInput from 'Components/Inputs/TextLineInput';
import TextLine from 'Components/Texts/TextLine';
import Project from 'Models/Project';
import Task, { TaskStatus } from 'Models/Task';
import React from 'react';
import styled from 'styled-components';
import Borders from 'Styles/Borders';
import Colors from 'Styles/Colors';
import { FontSizes } from 'Styles/Fonts';
import Margins from 'Styles/Margins';
import { formatAsTimeSpan, parseTimeSpanAsMs, TimeSpanUnit } from 'Utils/TimeUtils';

type Props = {
	project: Project;
	task: Task;
	isTaskActive: boolean;
	onValidateTask: (project: Project, task: Task) => string | undefined;
	onEditTask: (project: Project, task: Task) => void;
	onActivateTask: (projectId: Project['id'], taskId: Task['id']) => void;
};

type State = {
	edits: {
		estimatedDuration?: string;
	};
	errorMessage: string | undefined;
};

const initialState: State = {
	edits: {},
	errorMessage: undefined,
};

const Container = styled(FlexColumn)`
	flex-grow: .25;
	border-left: ${Borders.Medium}px solid ${Colors.SuperDark};
`;

const StickyContainer = styled(FlexColumn)`
	flex-grow: 0;
	position: sticky;
	top: 0px;
	padding: ${Margins.Small}px ${Margins.Medium}px;
`;

const Form = styled.form`
	display: flex;
	flex-direction: column;
`;

const TaskTitle = styled(TextLine)`
	color: ${Colors.TextLight};
	font-size: ${FontSizes.Title}px;
`;

export default class DetailedTaskView extends React.Component<Props, State> {
	state: State = {
		edits: {},
		errorMessage: undefined,
	};

	render() {
		return (
			<Container>
				<StickyContainer>
					<Form onSubmit={this.onSubmitChanges}>
						<TextLine>{this.props.project.name}</TextLine>
						<TaskTitle>{this.props.task.name}</TaskTitle>
						<FlexRow>
							<TextLine>{this.props.task.status}</TextLine>
							{!this.props.isTaskActive && this.props.task.status !== TaskStatus.Done && (
								<Button onClick={() => this.props.onActivateTask(this.props.project.id, this.props.task.id)}>
									{this.props.task.status === TaskStatus.ToDo ? 'Begin' : 'Resume'}
								</Button>
							)}
						</FlexRow>
						<FlexRow>
							<TextLine>{formatAsTimeSpan(this.props.task.accruedDuration)}</TextLine>
							<TextLineInput
								placeholder='estimate...'
								value={this.state.edits.estimatedDuration === undefined
									? (this.props.task.estimatedDuration === undefined
										? ''
										: formatAsTimeSpan(this.props.task.estimatedDuration, TimeSpanUnit.Millisecond)
									) : this.state.edits.estimatedDuration}
								onChange={this.onChangeEstimatedDuration}
							/>
						</FlexRow>
						{/* TODO: create paragraph component to display description */}
					</Form>
				</StickyContainer>
				<FlexColumn />
			</Container>
		);
	}

	onSubmitChanges = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (this.state.edits === {}) {
			return;
		}
		const edittedTask = {
			...this.props.task,
			...(this.state.edits.estimatedDuration !== undefined && {
				estimatedDuration: this.state.edits.estimatedDuration
				? parseTimeSpanAsMs(this.state.edits.estimatedDuration)
				: undefined,
			}),
		};
		const errorMessage = this.props.onValidateTask(this.props.project, edittedTask);
		if (errorMessage) {
			alert(errorMessage);
			this.setState({ errorMessage });
		} else {
			this.props.onEditTask(this.props.project, edittedTask);
			this.setState(initialState);
		}
	};

	onChangeEstimatedDuration = (e: React.ChangeEvent<HTMLInputElement>) => {
		this.setState({
			edits: {
				...this.state.edits,
				estimatedDuration: e.target.value,
			},
		});
	};
};