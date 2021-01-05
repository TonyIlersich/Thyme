import FlexRow from 'Components/Containers/FlexRow';
import TextLineInput from 'Components/Inputs/TextLineInput';
import Project from 'Models/Project';
import React from 'react';
import styled from 'styled-components';
import Colors from 'Styles/Colors';
import Margins from 'Styles/Margins';

type Props = {
	onValidate: (task: Readonly<Project>) => string | undefined;
	onSubmit: (task: Readonly<Project>) => void;
};

type State = {
	projectName: string;
	errorMessage: string | undefined;
};

const initialState: State = {
	projectName: '',
	errorMessage: undefined,
};

const FormContainer = styled(FlexRow)`
	flex-grow: 0;
	background-color: ${Colors.Dark};
	padding: ${Margins.Medium}px;
	margin: ${Margins.Large}px;
`;

const Form = styled.form`
	display: flex;
	flex-grow: 1;
	flex-direction: row;
`;

const StyledTextLineInput = styled(TextLineInput)`
	color: ${Colors.TextLight};
	caret-color: ${Colors.TextLight};
	border-bottom-color: ${Colors.SuperLight};
`;

export default class CreateProjectForm extends React.Component<Props, State> {
	state = initialState;

	render() {
		return (
			<FormContainer>
				<Form onSubmit={this.onSubmit}>
					<StyledTextLineInput
						type='text'
						placeholder='new project...'
						value={this.state.projectName}
						onChange={this.onChange}
					/>
				</Form>
			</FormContainer>
		);
	}

	onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		this.setState({ projectName: e.target.value });
	};

	onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const newProject = {
			name: this.state.projectName,
			tasks: [],
		};
		const errorMessage = this.props.onValidate(newProject);
		if (errorMessage) {
			alert(errorMessage);
			this.setState({ errorMessage });
		} else {
			this.props.onSubmit(newProject);
			this.setState(initialState);
		}
	};
};