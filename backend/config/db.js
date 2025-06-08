const mongoose = require('mongoose');

async function connectToMongoDB() {
	try {
		await mongoose.connect(process.env.MONGODB_URI);
		console.log('MongoDB Connection Successful');
	} catch (error) {
		console.log('DB Connect Error: \n', error.message);
	}
}

module.exports = connectToMongoDB;
