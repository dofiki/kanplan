import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
	{
		projectName: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		users: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'User',
			},
		],
		tasks: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Task',
			},
		],
		lastNotifiedAt: {
			type: Date,
			default: null,
		},
	},
	{ timestamps: true }
);

const Project = mongoose.model('Project', projectSchema);
export default Project;
