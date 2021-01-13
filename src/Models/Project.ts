import Task from 'Models/Task';

type Project = {
	id: string;
	name: string;
	tasks: Task[];
};

export default Project;