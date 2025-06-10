import mongoose from "mongoose"

const taskSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		contributors: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'User',
			},
		],
		projectLink: {
			type: String,
			required: true,
		},
		category: { // backlogs, working, review, done
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

const Task = mongoose.model('Task', taskSchema);

export default Task;
