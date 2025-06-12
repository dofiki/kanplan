import cron from 'node-cron';
import Project from '../models/projects.model.js';
import createTransporter from './nodemailerClient.util.js';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

cron.schedule('*/20 * * * *', async () => {
	const transporter = createTransporter();
	console.log('Running Twenty Minute Notification Check');

	try {
		const projects = await Project.find({}).populate('users').populate('tasks');
		for (const project of projects) {
			const lastNotifiedAt = project.lastNotifiedAt || new Date(0);

			const changedTasks = project.tasks.filter(
				(task) =>
					task.updatedAt > lastNotifiedAt || task.createdAt > lastNotifiedAt
			);

			console.log(process.env.GMAIL_USER);

			if (changedTasks.length == 0) continue;

			const message = changedTasks
				.map((task) => `- ${task.name} (${task.category})\n`)
				.join('');

			for (const user of project.users) {
				try {
					await transporter.sendMail({
						from: `Kanplan Team <${process.env.GMAIL_USER}>`,
						to: user.email,
						subject: `Task update in ${project.projectName}`,
						text: `Hello, ${user.fullname}\nThere are recent changes in "${project.projectName}":\n\n${message}\n\nCheers,\nKanPlan Team`,
					});
					console.log(`Email sent to: ${user.email}`);
				} catch (error) {
					console.log(`Error sending to: ${user.email}`, error);
				}

				await delay(5000);
			}

			project.lastNotifiedAt = new Date();
			await project.save();
		}
	} catch (error) {
		console.error('Error running notification cron:', error.message);
	}
});

export default cron;
