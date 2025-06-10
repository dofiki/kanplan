const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
const connectToMongoDB = require('./config/db');

const dotenv = require('dotenv'); // init .env file for the backend
dotenv.config();
const PORT = process.env.PORT;

const authenticationRoutes = require('./routes/auth.routes');
const projectRoutes = require('./routes/project.routes');

app.use(cors()); // Allow frontend to access the API
app.use(express.json());
app.use(cookieParser()); //for reading cookies

// Test route
app.get('/', (req, res) => {
	res.send('<h1>BACKEND RUNNING</h1>');
});

app.use('/api/auth', authenticationRoutes);
app.use('/api/project', projectRoutes);

app.listen(PORT, () => {
	connectToMongoDB();
	console.log(`Server is running on http://localhost:${PORT}`);
});
