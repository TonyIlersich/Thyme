import FlexColumn from 'Components/Containers/FlexColumn';
import TabSelect from 'Components/Containers/TabSelect';
import Project from 'Models/Project';
import Task, { TaskStatus } from 'Models/Task';
import NotImplementedPage from 'Pages/NotImplementedPage';
import OverviewPage from 'Pages/OverviewPage';
import ProjectPage from 'Pages/ProjectPage';
import React from 'react';
import styled from 'styled-components';
import Colors from 'Styles/Colors';

type State = {
	projects: Project[];
};

const AppContainer = styled(FlexColumn)`
	background-color: ${Colors.Light};
	position: fixed;
	top: 0px;
	bottom: 0px;
	left: 0px;
	right: 0px;
	overflow-y: auto;
`;

class App extends React.Component<{}, State> {
	state: State = {
		projects: [{
			name: 'Test Project',
			tasks: [{
				id: 'test',
				name: 'Test Task',
				description: 'desc',
				status: TaskStatus.ToDo,
				accruedDuration: 0,
			}]
		}],
	};

	render () {
		return (
			<AppContainer>
				<TabSelect names={['Overview', 'Projects', 'Settings', 'Help', 'Feedback']}>
					<OverviewPage projects={this.state.projects} />
					<ProjectPage
						projects={this.state.projects}
						onValidateProject={this.onValidateProject}
						onCreateProject={this.onCreateProject}
						onValidateTask={this.onValidateTask}
						onCreateTask={this.onCreateTask}
						onEditTask={this.onEditTask}
					/>
					<NotImplementedPage />
					<NotImplementedPage />
					<NotImplementedPage />
				</TabSelect>
			</AppContainer>
		);
	}

	onValidateProject = (project: Readonly<Project>) => {
		if (!project.name) {
			return 'The project must have a name.';
		}
		if (this.state.projects.some(p => p.name === project.name && p !== project)) {
			return 'There is already a project with that name.';
		}
	};

	onCreateProject = (project: Project) => {
		this.state.projects.push(project);
		this.forceUpdate();
	};

	onValidateTask = (project: Readonly<Project>, task: Readonly<Task>) => {
		if (!task.name) {
			return 'The task must have a name.';
		}
		if (project.tasks.some(t => t.name === task.name && t.id !== task.id)) {
			return 'There is already a task with that name in this project.';
		}
	};

	onCreateTask = (project: Project, task: Readonly<Task>) => {
		project.tasks.push(task);
		this.forceUpdate();
	};

	onEditTask = (project: Project, task: Readonly<Task>) => {
		const i = project.tasks.findIndex(t => t.id === task.id);
		project.tasks[i] = task;
		this.forceUpdate();
	};
}

export default App;
