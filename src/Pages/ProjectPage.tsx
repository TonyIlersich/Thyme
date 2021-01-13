import FlexColumn from 'Components/Containers/FlexColumn';
import FlexRow from 'Components/Containers/FlexRow';
import CreateProjectForm from 'Components/Projects/CreateProjectForm';
import ProjectView from 'Components/Projects/ProjectView';
import DetailedTaskView from 'Components/Tasks/DetailedTaskView';
import Project from 'Models/Project';
import Task from 'Models/Task';
import React from 'react';
import styled from 'styled-components';
import Margins from 'Styles/Margins';

type Props = {
	projects: Project[];
	activeTaskInfo: {
		projectId: Project['id'];
		taskId: Task['id'];
	} | null;
	onValidateProject: (project: Project) => string | undefined;
	onCreateProject: (project: Project) => void;
	onValidateTask: (project: Project, task: Readonly<Task>) => string | undefined;
	onCreateTask: (project: Project, task: Readonly<Task>) => void;
	onEditTask: (project: Project, task: Readonly<Task>) => void;
	onActivateTask: (projectId: Project['id'], taskId: Task['id']) => void;
};

type State = {
	selection: {
		project: Project;
		taskId: string;
	} | null;
};

const ProjectViewWithMargin = styled(ProjectView)`
	margin: ${Margins.Large}px;
	margin-bottom: 0px;
`;

export default class ProjectPage extends React.Component<Props, State> {
	state: State = {
		selection: null,
	};

	render() {
		const selectedTask = this.state.selection?.project.tasks.find(t => t.id === this.state.selection!.taskId)!;
		return (
			<FlexRow>
				<FlexColumn>
					{this.props.projects.map((p, i) => (
						<ProjectViewWithMargin
							key={i}
							project={p}
							selectedTaskId={this.state.selection?.taskId}
							activeTaskId={this.props.activeTaskInfo?.taskId}
							onValidateTask={this.props.onValidateTask}
							onCreateTask={this.props.onCreateTask}
							onSelect={(project, task) => this.setState({ selection: { project, taskId: task.id } })}
						/>
					))}
					<CreateProjectForm
						onValidate={this.props.onValidateProject}
						onSubmit={this.props.onCreateProject}
					/>
				</FlexColumn>
				{selectedTask && (
					<DetailedTaskView
						project={this.state.selection!.project}
						task={selectedTask}
						isTaskActive={this.props.activeTaskInfo?.taskId === selectedTask.id}
						onValidateTask={this.props.onValidateTask}
						onEditTask={this.props.onEditTask}
						onActivateTask={this.props.onActivateTask}
					/>
				)}
			</FlexRow>
		);
	}
};
