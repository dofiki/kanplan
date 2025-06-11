import cron from 'node-cron';
import Project from '../models/projects.model.js';
import Task from '../models/tasks.model.js';
import User from '../models/users.model.js';
import resend from './resendClient.util.js';

cron.schedule('*/20 * * * *', async () => {
	console.log('Running Twenty Minute Notification Check');

	try {
		const twentyMinsAgo = new Date(Date.now() - 20 * 60 * 1000);

		const projects = await Project.find({}).populate('users').populate('tasks');

		for (const project of projects) {
			const changedTasks = project.tasks.filter(
				(task) =>
					task.updatedAt > twentyMinsAgo || task.createdAt > twentyMinsAgo
			);

			if (changedTasks.length === 0) continue;

			const message = changedTasks
				.map((task) => `- ${task.name} (${task.category})\n`)
				.join('');

			for (const user of project.users) {
				try {
					await resend.emails.send({
						from: 'onboarding@resend.dev',
						to: user.email,
						subject: `Task Update In ${project.projectName}`,
						text: `Hello, ${user.fullname}\nThere are recent changes in "${project.projectName}":\n\n${message}\n\nCheers,\nKanPlan Team`,
					});
				} catch (emailError) {
					console.error(
						`Failed to send email to ${user.email}:`,
						emailError.message
					);
				}
			}
		}
	} catch (error) {
		console.error('Error running notification cron:', error.message);
	}
});

export default cron;
