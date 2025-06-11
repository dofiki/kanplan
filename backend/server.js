import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectToMongoDB from './config/db.js';
import authenticationRoutes from './routes/auth.routes.js';
import projectRoutes from './routes/project.routes.js';
import taskRoutes from './routes/tasks.routes.js';
import cron from './utils/taskNotifier.util.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(
	cors({
		origin: 'http://localhost:3000', // or your frontend URL
		credentials: true, // allow cookies to be sent
	})
);
app.use(express.json());
app.use(cookieParser());

// Routes
app.get('/', (req, res) => {
	res.send('<h1>BACKEND RUNNING</h1>');
});

app.use('/api/auth', authenticationRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);

// Start server
async function startServer() {
	try {
		await connectToMongoDB();
		app.listen(PORT, () => {
			console.log(`Server is running on http://localhost:${PORT}`);
		});
	} catch (error) {
		console.error('Failed to start server:', error);
		process.exit(1);
	}
}

startServer();
