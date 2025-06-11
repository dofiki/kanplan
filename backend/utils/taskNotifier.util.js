import cron from 'node-cron';
import Project from '../models/projects.model.js';
import resend from './resendClient.util.js';

cron.schedule('*/2 * * * *', async () => {
	console.log('Running Two Minute Notification Check');

	try {
		const projects = await Project.find({}).populate('users').populate('tasks');
		for (const project of projects) {
			const lastNotifiedAt = project.lastNotifiedAt || new Date(0);

			const changedTasks = project.tasks.filter(
				(task) =>
					task.updatedAt > lastNotifiedAt || task.createdAt > lastNotifiedAt
			);

			if (changedTasks.length == 0) continue;

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
				} catch (error) {
					console.log(`Error sending email to ${user.email}\n`, error.message);
				}
			}

			//update lastNotifiedAt
			project.lastNotifiedAt = new Date();
			await project.save();

			console.log('Emails Sent');
		}
	} catch (error) {
		console.error('Error running notification cron:', error.message);
	}
});

export default cron;
