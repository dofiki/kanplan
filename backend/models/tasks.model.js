const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		requierd: true,
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
	category: {
		type: String,
		required: true,
	},
});

const task = mongoose.model('Task', taskSchema);
