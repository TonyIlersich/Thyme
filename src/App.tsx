import FlexColumn from 'Components/Containers/FlexColumn';
import TabSelect from 'Components/Containers/TabSelect';
import dayjs, { Dayjs } from 'dayjs';
import Project from 'Models/Project';
import Schedule from 'Models/Schedule';
import Task, { TaskStatus } from 'Models/Task';
import NotImplementedPage from 'Pages/NotImplementedPage';
import OverviewPage from 'Pages/OverviewPage';
import ProjectPage from 'Pages/ProjectPage';
import SchedulePage from 'Pages/SchedulePage';
import React from 'react';
import { ReactCookieProps, withCookies } from 'react-cookie';
import styled from 'styled-components';
import Colors from 'Styles/Colors';
import { MsPerMinute } from 'Utils/TimeUtils';

type Props = ReactCookieProps;

type State = {
	projects: Project[];
	schedule: Schedule;
	activeTaskInfo: {
		projectId: Project['id'];
		taskId: Task['id'];
	} | null;
};

const defaultState: State = {
	projects: [],
	schedule: {
		Sunday: [],
		Monday: [],
		Tuesday: [],
		Wednesday: [],
		Thursday: [],
		Friday: [],
		Saturday: [],
	},
	activeTaskInfo: null,
};

const AppContainer = styled(FlexColumn)`
	background-color: ${Colors.Light};
	position: fixed;
	top: 0px;
	bottom: 0px;
	left: 0px;
	right: 0px;
	overflow-y: auto;
	overflow-x: hidden; // TODO: figure out how to let pages scroll on y-axis without scrollbar causing overflow on x-axis
`;

class App extends React.Component<Props, State> {
	tickLength = .5 * MsPerMinute;
	ticker: NodeJS.Timeout | null = null;
	timeOfLastTick: Dayjs | undefined;

	constructor(props: Props) {
		super(props);
		this.state = {
			...defaultState,
			...(this.props.cookies && this.props.cookies.get('state')),
		};
	}

	componentDidMount() {
		this.ticker = setInterval(this.onTick, this.tickLength);
	}

	componentWillUnmount() {
		this.ticker && clearInterval(this.ticker);
	}

	render () {
		return (
			<AppContainer>
				<TabSelect names={['Overview', 'Projects', 'Schedule', 'Calendar', 'Settings', 'Help', 'Feedback']}>
					<OverviewPage projects={this.state.projects} />
					<ProjectPage
						projects={this.state.projects}
						activeTaskInfo={this.state.activeTaskInfo}
						onValidateProject={this.onValidateProject}
						onCreateProject={this.onCreateProject}
						onValidateTask={this.onValidateTask}
						onCreateTask={this.onCreateTask}
						onEditTask={this.onEditTask}
						onActivateTask={this.onActivateTask}
					/>
					<SchedulePage schedule={this.state.schedule} />
					<NotImplementedPage />
					<NotImplementedPage />
					<NotImplementedPage />
					<NotImplementedPage />
				</TabSelect>
			</AppContainer>
		);
	}

	onTick = () => {
		const now = dayjs();
		if (this.timeOfLastTick) {
			const timeSinceLastTick = now.diff(this.timeOfLastTick);
			if (this.state.activeTaskInfo) {
				const info = this.state.activeTaskInfo;
				const activeTask = this.state.projects
					.find(p => p.id === info.projectId)!
					.tasks.find(t => t.id === info.taskId)!;
				activeTask.accruedDuration += timeSinceLastTick;
				this.forceUpdate(this.saveState);
			}
		}
		this.timeOfLastTick = now;
	};

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
		this.forceUpdate(this.saveState);
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
		this.forceUpdate(this.saveState);
	};

	onEditTask = (project: Project, task: Readonly<Task>) => {
		const i = project.tasks.findIndex(t => t.id === task.id);
		project.tasks[i] = task;
		this.forceUpdate(this.saveState);
	};

	onActivateTask = (projectId: Project['id'], taskId: Task['id']) => {
		this.state.projects.find(p => p.id === projectId)!.tasks.find(t => t.id === taskId)!.status = TaskStatus.InProgress;
		this.setState({ activeTaskInfo: { projectId, taskId } }, this.saveState);
	};

	saveState = () => {
		this.props.cookies && this.props.cookies.set('state', this.state);
	};
}

export default withCookies(App);
