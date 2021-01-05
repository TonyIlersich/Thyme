export enum TaskStatus {
	ToDo = 'To Do',
	InProgress = 'In Progress',
	Done = 'Done',
};

export type TaskProps = {
	accruedDuration: number;
	description: string;
	estimatedDuration?: number;
	name: string;
	status: TaskStatus;
};

type Task = TaskProps & {
	id: string;
}

export default Task;