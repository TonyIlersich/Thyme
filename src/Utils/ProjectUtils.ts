import Project from 'Models/Project';

export const getProjectAccruedDuration = (project: Project) => project.tasks.reduce((sum, task) => sum + task.accruedDuration, 0);

export const getProjectEstimatedDuration = (project: Project) => project.tasks.reduce((sum, task) => sum + (task.estimatedDuration || 0), 0);

export const doesProjectHaveUnestimatedTasks = (project: Project) => project.tasks.reduce(
	(hasUnestimatedTask, task) => hasUnestimatedTask || task.estimatedDuration === undefined,
	false,
);