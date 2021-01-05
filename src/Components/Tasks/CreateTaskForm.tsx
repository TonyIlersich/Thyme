import FlexRow from 'Components/Containers/FlexRow';
import TextLineInput from 'Components/Inputs/TextLineInput';
import Task, { TaskStatus } from 'Models/Task';
import React from 'react';
import styled from 'styled-components';
import Colors from 'Styles/Colors';
import Margins from 'Styles/Margins';
import { v4 as uuid } from 'uuid';

type Props = {
	onValidate: (task: Readonly<Task>) => string | undefined;
	onSubmit: (task: Readonly<Task>) => void;
};

type State = {
	taskName: string;
	errorMessage: string | undefined;
};

const initialState: State = {
	taskName: '',
	errorMessage: undefined,
};

const FormContainer = styled(FlexRow)`
	background-color: ${Colors.Light};
	padding: ${Margins.Medium}px;
`;

const Form = styled.form`
	display: flex;
	flex-grow: 1;
	flex-direction: row;
`;

export default class CreateTaskForm extends React.Component<Props, State> {
	state = initialState;

	render() {
		return (
			<FormContainer>
				<Form onSubmit={this.onSubmit}>
					<TextLineInput
						type='text'
						placeholder='new task...'
						value={this.state.taskName}
						onChange={this.onChange}
					/>
				</Form>
			</FormContainer>
		);
	}

	onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		this.setState({ taskName: e.target.value });
	};

	onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const newTask = {
			id: uuid(),
			accruedDuration: 0,
			description: '',
			name: this.state.taskName,
			status: TaskStatus.ToDo,
		};
		const errorMessage = this.props.onValidate(newTask);
		if (errorMessage) {
			alert(errorMessage);
			this.setState({ errorMessage });
		} else {
			this.props.onSubmit(newTask);
			this.setState(initialState);
		}
	};
};